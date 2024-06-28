// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// utils
import classNames from "classnames";
// import categories_management from "@db/categories_management";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  findAllCategory,
  findCategoryById,
  updateOneCategory,
} from "../store/actions/category-action";
import { upLoadImageSingle } from "../store/actions/upload-actions";

const CategoryEdit = ({ item }) => {
  const dispatch = useDispatch();
  const [categories_management, setCategoriesManagement] = useState([]);
  const [categories_options, setCategories_options] = useState([]);
  const [data, setData] = useState(null);

  const fetchDataCategory = async () => {
    const allCategory = await dispatch(findAllCategory());
    setCategoriesManagement(allCategory?.payload?.metaData);
    const category = await dispatch(findCategoryById({ category_id: item }));
    if (category) {
      setData(category.payload.metaData);
    }
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
  useEffect(() => {
    setCategories_options(
      categories_management?.map((item) => ({
        value: item._id,
        label: item.category_name,
      }))
    );
  }, [categories_management]);

  const defaultValues = {
    image1: "",
    description: "",
    categoryName: "",
    category: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setValue("description", data && data.category_description);
    setValue("categoryName", data && data.category_name);
    setValue(
      "category",
      data
        ? categories_options
            ?.slice()
            .find((item) => item.value === data?.parent_id) !== undefined
          ? categories_options
              ?.slice()
              .find((item) => item.value === data?.parent_id)
          : { label: "Không có", value: null }
        : { label: "Không có", value: null }
    );
  }, [data]);

  const image = watch("image1");
  const description = watch("description");
  const categoryName = watch("categoryName");

  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    let imageSingle = null;
    if (data?.image1?.length > 0) {
      const image = new FormData();
      image.append("file", data.image1[0]);
      image.append("folderName", "outrunner/images/category");
      const uploadImageSingle = await dispatch(upLoadImageSingle(image));
      imageSingle =
        uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url;
    }
    const updatedCategory = await dispatch(
      updateOneCategory({
        category_id: item,
        category_name: data.categoryName,
        category_description: data.description,
        category_image: imageSingle,
        parent_id: data.category.value,
      })
    );

    // console.log(updatedCategory);

    if (updatedCategory?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Cập nhật danh mục thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Cập nhật danh mục không thành công",
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
                name="image1"
                control={control}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass={`media-dropzone col-span-full aspect-w-1 aspect-h-1`}
                    defaultValue={image}
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
                "field-input--error": errors.categoryName,
              })}
              value={categoryName}
              id="categoryName"
              defaultValue={defaultValues.categoryName}
              placeholder="VD: Túi xách, quần áo,..."
              {...register("categoryName", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Danh mục cha
              </label>
              <Controller
                name="category"
                control={control}
                defaultValue={defaultValues.category}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.category}
                    id="category"
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
                <label className="field-label" htmlFor="description">
                  Mô tả danh mục
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.description }
                  )}
                  value={description}
                  id="description"
                  defaultValue={defaultValues.description}
                  {...register("description", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default CategoryEdit;
