// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";
import { Switch } from "antd";

const SliderNew = () => {
  const defaultValues = {
    slider_name: "",
    slider_link: "",
    slider_description: "",
    slider_summary: "",
    slider_position: "",
    slider_image: null,
    slider_is_active: false,
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const is_active = watch("slider_is_active");

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
            <div>
              <span className="block field-label mb-2.5">Hình ảnh slider</span>
              <div className="grid grid-cols-1 gap-5">
                <Controller
                  name="slider_image"
                  control={control}
                  defaultValue={defaultValues.slider_image}
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-4 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                      defaultValue={defaultValues.slider_image}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="slider_name">
              Tên slider
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.slider_name,
              })}
              id="slider_name"
              defaultValue={defaultValues.slider_name}
              placeholder="Nhập tên slider"
              {...register("slider_name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="slider_link">
                Đường dẫn
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.slider_link,
                })}
                id="slider_link"
                defaultValue={defaultValues.slider_link}
                placeholder="Nhập đường dẫn slider"
                {...register("slider_link", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="slider_position">
                Vị trí slider
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.slider_position,
                })}
                id="slider_position"
                defaultValue={defaultValues.slider_position}
                placeholder="VD: Header, Footer,..."
                {...register("slider_position", { required: true })}
              />
            </div>
          </div>

          <div className="field-wrapper">
            <label className="field-label" htmlFor="slider_description">
              Mô tả slider
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.slider_description,
              })}
              id="slider_description"
              defaultValue={defaultValues.slider_description}
              placeholder="Nhập mô tả của slider"
              {...register("slider_description", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="slider_summary">
              Tóm tắt
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.slider_summary,
              })}
              id="slider_summary"
              defaultValue={defaultValues.slider_summary}
              placeholder="Nhập tóm tắt của slider"
              {...register("slider_summary", { required: true })}
            />
          </div>
          <div className="flex justify-end items-center space-x-3">
            <label className="field-label" htmlFor={`is-active-`}>
              Hiện cho người dùng?
            </label>
            <Switch
              checkedChildren={"ON"}
              unCheckedChildren={"OFF"}
              onClick={(e) => setValue("slider_is_active", !is_active)}
              loading={false}
              checked={is_active}
            />
          </div>
        </div>
        <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
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

export default SliderNew;
