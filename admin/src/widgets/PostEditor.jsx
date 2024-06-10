// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import topics_management from "@db/topics_management";
import Select from "@ui/Select";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";

const PostEditor = ({ item }) => {
  const defaultValues = {
    content: item ? item.content : "",
    postTitle: item ? item.label : "",
    image: item ? item.image : "",
    topic: item
      ? topics_management.slice().find((item) => item.id === item.topicID)
      : topics_management[0],
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
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">Banner bài viết</span>
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
            <label className="field-label" htmlFor="postTitle">
              Tiêu đề
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.postTitle,
              })}
              id="postTitle"
              defaultValue={defaultValues.postTitle}
              placeholder="Nhập tiêu đề bài viết"
              {...register("postTitle", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="category">
              Chủ đề
            </label>
            <Controller
              name="topic"
              control={control}
              defaultValue={defaultValues.topic}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isInvalid={errors.topic}
                  id="topic"
                  placeholder="Chọn chủ đề"
                  options={topics_management}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="content">
                Nội dung
              </label>
              <textarea
                className={classNames(
                  `field-input !h-[180px] !py-[15px] !overflow-y-auto`,
                  { "field-input--error": errors.content }
                )}
                id="content"
                defaultValue={defaultValues.content}
                {...register("content", { required: true })}
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
            Xuất bản
          </button>
        </div>
      </form>
    </Spring>
  );
};

export default PostEditor;
