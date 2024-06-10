// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const BrandDetail = ({ item }) => {
  const [defaultValues, setDefaultValues] = useState({});
  useEffect(() => {
    setDefaultValues({
      label: item ? item.label : "",
      image: item ? item.image : "",
      dateAdded: item ? dayjs(item.dateAdded).format("hh:mm DD/MM/YYYY") : "",
      dateModified: item
        ? dayjs(item.dateModified).format("hh:mm DD/MM/YYYY")
        : "",
      modifiedBy: item ? item.modifiedBy : "",
      addedBy: item ? item.addedBy : "",
    });
  }, [item]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handleSave = (data) => {
    console.log(data);
    toast.success("Product saved successfully");
  };

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };
  console.log(defaultValues.image);

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10 sm:grid-cols-3">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">Hình ảnh hãng</span>
              <div className="grid grid-cols-1 gap-5">
                <Controller
                  name="image"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone 2xl:col-span-2 pointer-events-none aspect-w-1 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                      defaultValue={defaultValues.image}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:col-span-2 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="label">
              Tên hãng
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.label,
              })}
              id="label"
              defaultValue={defaultValues.label}
              placeholder="Enter title name"
              disabled
              {...register("label", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="dateAdded">
                Ngày tạo
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.dateAdded,
                })}
                id="dateAdded"
                defaultValue={defaultValues.dateAdded}
                placeholder="Enter title name"
                disabled
                {...register("dateAdded", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="dateModified">
                Ngày chỉnh sửa
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.dateModified,
                })}
                id="dateModified"
                defaultValue={defaultValues.dateModified}
                placeholder="Enter title name"
                disabled
                {...register("dateModified", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="dateAdded">
                Tạo bởi
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.addedBy,
                })}
                id="addedBy"
                defaultValue={defaultValues.addedBy}
                placeholder="Enter title name"
                disabled
                {...register("addedBy", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="modifiedBy">
                Chỉnh sửa bởi
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.modifiedBy,
                })}
                id="modifiedBy"
                defaultValue={defaultValues.modifiedBy}
                placeholder="Enter title name"
                disabled
                {...register("modifiedBy", { required: true })}
              />
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default BrandDetail;
