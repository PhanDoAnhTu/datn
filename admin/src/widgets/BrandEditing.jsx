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
import {
  createBrand,
  findBrandById,
  upLoadImageSingle,
  updateOneBrand,
} from "../store/actions";
import { useEffect, useState } from "react";

const BrandEditing = ({ id }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const defaultValues = {
    brand_name: "",
    brand_image: "",
    brand_description: "",
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(findBrandById({ brand_id: id }));
      if (result) {
        setData(result.payload.metaData);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setValue("brand_name", data.brand_name);
    setValue("brand_description", data.brand_description);
  }, [data]);

  const brand_name = watch("brand_name");
  const brand_description = watch("brand_description");

  // do something with the data
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    let imageSingle = null;
    if (data?.brand_image?.length > 0) {
      const image = new FormData();
      image.append("file", data.brand_image[0]);
      image.append("folderName", "outrunner/images/brand");
      const uploadImageSingle = await dispatch(upLoadImageSingle(image));
      imageSingle =
        uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url;
    }
    const updatedBrand = await dispatch(
      updateOneBrand({
        brand_id: id,
        brand_name: data.brand_name,
        brand_image: imageSingle ? imageSingle : "",
        brand_description: data.brand_description,
      })
    );

    // console.log(updatedBrand);

    if (updatedBrand?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Cập nhật thương hiệu thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Cập nhật thương hiệu không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <Spring className="card flex-1 xl:py-10">
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
              value={brand_name}
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
              value={brand_description}
              defaultValue={defaultValues.brand_description}
              placeholder="VD:  Giới thiệu sơ lược về thương hiệu,..."
              {...register("brand_description", { required: true })}
            />
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
      </form>
    </Spring>
  );
};

export default BrandEditing;
