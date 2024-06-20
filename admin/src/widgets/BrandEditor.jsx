// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";
import { useDispatch } from "react-redux";
import { createBrand, upLoadImageSingle } from "../store/actions";

const BrandEditor = ({ item }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    brand_name: item ? item.brand_name : "",
    brand_image: item ? item.brand_image : "",
    brand_description: item ? item.brand_description : ""

  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handleSave = async (data) => {
    const id = toast.loading("Vui lòng chờ...")
    let imageSingle = null
    if (data?.brand_image?.length>0) {
      const image = new FormData()
      image.append("file", data.brand_image[0])
      image.append("folderName", "outrunner/images/brand")
      const uploadImageSingle = await dispatch(upLoadImageSingle(image))
      imageSingle = uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url
    }
    const newBrand = await dispatch(createBrand({
      brand_name: data.brand_name,
      brand_image: imageSingle,
      brand_description: data.brand_description,
      isPublished: false
    }))

    // console.log(newBrand);

    if (newBrand?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: "Thêm thương hiệu thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Thêm thương hiệu không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  // do something with the data
  const handlePublish = async (data) => {
    const id = toast.loading("Vui lòng chờ...")
    let imageSingle = null
    if (data?.brand_image?.length>0) {
      const image = new FormData()
      image.append("file", data.brand_image[0])
      image.append("folderName", "outrunner/images/brand")
      const uploadImageSingle = await dispatch(upLoadImageSingle(image))
      imageSingle = uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url
    }
    const newBrand = await dispatch(createBrand({
      brand_name: data.brand_name,
      brand_image: imageSingle,
      brand_description: data.brand_description,
      isPublished: true
    }))

    // console.log(newBrand);

    if (newBrand?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: "Thêm thương hiệu thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Thêm thương hiệu không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }

  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">Edit</h5>
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">Hình ảnh hãng</span>
              <div className="grid grid-cols-1 gap-5">
                <Controller
                  name="brand_image"
                  control={control}
                  defaultValue={defaultValues.brand_image}
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-4 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                      defaultValue={defaultValues.brand_image}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="brand_name">
              Tên hãng
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.brand_name,
              })}
              id="brand_name"
              defaultValue={defaultValues.brand_name}
              placeholder="VD: Fjallraven, Coca,..."
              {...register("brand_name", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="brand_description">
              Mô tả chi tiết
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.brand_description,
              })}
              id="brand_description"
              defaultValue={defaultValues.brand_description}
              placeholder="VD:  Giới thiệu sơ lược về thương hiệu,..."
              {...register("brand_description", { required: true })}
            />
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
            Xuất bản
          </button>
        </div>
      </form>
    </Spring>
  );
};

export default BrandEditor;
