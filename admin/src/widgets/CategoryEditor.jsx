// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { createCategory, findAllCategory, upLoadImageSingle } from "../store/actions";

// hooks
import { useForm, Controller } from "react-hook-form";

// utils
import classNames from "classnames";
// import categories_management from "@db/categories_management";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CategoryEditor = ({ item }) => {
  const dispatch = useDispatch()
  const [categories_management, setCategoriesManagement] = useState([])
  const [categories_options, setCategories_options] = useState([])

  const fetchDataCategory = async () => {
    const allCategory = await dispatch(findAllCategory())
    setCategoriesManagement(allCategory?.payload?.metaData)
  }
  useEffect(() => {
    fetchDataCategory()
  }, [])
  useEffect(() => {
    setCategories_options(categories_management?.map((item) => ({
      value: item._id,
      label: item.category_name,
    })))
  }, [categories_management])

  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;

  const defaultValues = {
    category_image: item ? item.category_image : undefined,
    category_description: item ? item.category_description : productDescription,
    category_name: item ? item.category_name : "",
    parent_id: item
      ? item.parent_id
      : { value: null, label: "Không có" },
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handlePublish = async (data) => {
    const id = toast.loading("Vui lòng chờ...")
    let imageSingle = null
    if (data?.category_image?.length>0) {
      const image = new FormData()
      image.append("file", data.category_image[0])
      image.append("folderName", "outrunner/images/category")
      const uploadImageSingle = await dispatch(upLoadImageSingle(image))
      imageSingle = uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url
    }
    const newCat = await dispatch(createCategory({
      category_name: data.category_name,
      category_image: imageSingle,
      parent_id: data.parent_id?.value,
      category_description: data.category_description,
      isPublished: true
    }))

    // console.log(newCat);

    if (newCat?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: "Thêm danh mục thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Thêm danh mục không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  // do something with the data
  const handleSave =async (data) => {
    const id = toast.loading("Vui lòng chờ...")
    let imageSingle = null
    if (data?.category_image?.length>0) {
      const image = new FormData()
      image.append("file", data.category_image[0])
      image.append("folderName", "outrunner/images/category")
      const uploadImageSingle = await dispatch(upLoadImageSingle(image))
      imageSingle = uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url
    }
    const newCat = await dispatch(createCategory({
      category_name: data.category_name,
      category_image: imageSingle,
      parent_id: data.parent_id?.value,
      category_description: data.category_description,
      isPublished: false
    }))

    // console.log(newCat);

    if (newCat?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: "Thêm danh mục thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Thêm danh mục không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start xl:grid-cols-3 xl:gap-10">
        <div>
          <div className="mb-2.5">
            <span className="block field-label mb-2.5">Ảnh danh mục</span>
            <div className="field-wrapper">
              <Controller
                name="category_image"
                control={control}
                defaultValue={defaultValues.category_image}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass={`media-dropzone col-span-full aspect-w-1 aspect-h-1`}
                    onChange={(files) => field.onChange(files)}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-2 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="categoryName">
              Tên danh mục
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.category_name,
              })}
              id="category_name"
              defaultValue={defaultValues.category_name}
              placeholder="VD: Túi xách, quần áo,..."
              {...register("category_name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Danh mục cha
              </label>
              <Controller
                name="parent_id"
                control={control}
                defaultValue={defaultValues.parent_id}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.parent_id}
                    id="parent_id"
                    placeholder="Chọn danh mục"
                    options={[
                      { value: null, label: "Không có" },
                      ...categories_options,
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="category_description">
                  Mô tả danh mục
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.category_description }
                  )}
                  id="category_description"
                  defaultValue={defaultValues.description}
                  {...register("category_description", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
            <button
              className="btn btn--secondary"
              onClick={handleSubmit(handleSave)}
            >
              Lưu thành bản nháp
            </button>
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Tạo và xuất bản
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default CategoryEditor;
