// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import DropFiles from "@components/DropFiles";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { useEffect } from "react";

const PageEditt = ({ item }) => {
  const defaultValues = {
    description: "",
    title: "",
    pageName: "",
    name: "",
    image: "",
  };
  useEffect(() => {
    setValue("description", "bien o dayy");
    setValue("title", "bien o dayy");
    setValue("pageName", "bien o dayy");
    setValue("image", "bien o dayy");
    setValue("name", "bien o dayy");
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <span className="block field-label mb-2.5">Hình ảnh trang đơn</span>
            <div className="grid grid-cols-1 gap-5">
              <Controller
                name="image"
                control={control}
                defaultValue={defaultValues.image}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-4 aspect-h-1"
                    onChange={(files) => field.onChange(files)}
                    defaultValue={defaultValues.image}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="name">
              Tên
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.name,
              })}
              id="name"
              defaultValue={defaultValues.name}
              {...register("name", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="pageName">
              Tiêu đề
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.pageName,
              })}
              id="pageName"
              defaultValue={defaultValues.pageName}
              {...register("pageName", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="description">
              Nội dung
            </label>
            <textarea
              className={classNames(
                `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                { "field-input--error": errors.description }
              )}
              id="description"
              defaultValue={defaultValues.description}
              {...register("description", { required: true })}
            />
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Xuất bản
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default PageEditt;
