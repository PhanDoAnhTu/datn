// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";

const BrandEditor = ({ item }) => {
  const defaultValues = {
    label: item ? item.label : "",
    image: item ? item.image : "",
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
  const handleSave = (data) => {
    console.log(data);
    toast.success("Product saved successfully");
  };

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
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
          </div>
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
              placeholder="VD: Fjallraven, Coca,..."
              {...register("label", { required: true })}
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
