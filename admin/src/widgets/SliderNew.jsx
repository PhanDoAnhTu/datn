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
import { upLoadImageSingle } from "../store/actions/upload-actions";
import { createSlider } from "../store/actions/slider-actions";

const SliderNew = () => {
  const dispatch = useDispatch();
  const defaultValues = {
    slider_name: "",
    slider_link: "",
    slider_description: "",
    slider_summary: "",
    slider_position: "",
    slider_image: null,
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
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    let imageSingle = null;
    if (data?.slider_image?.length > 0) {
      const image = new FormData();
      image.append("file", data.slider_image[0]);
      image.append("folderName", "outrunner/images/slider");
      const uploadImageSingle = await dispatch(upLoadImageSingle(image));
      imageSingle =
        uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url;
    }
    const newSlider = await dispatch(
      createSlider({
        slider_name: data.slider_name,
        slider_image: imageSingle,
        slider_description: data.slider_description,
        slider_link: data.slider_link,
        slider_summary: data.slider_summary,
        slider_position: data.slider_position,
        isPublished: true,
      })
    );

    // console.log(newSlider);

    if (newSlider?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Thêm slider thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Thêm slider không thành công",
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
