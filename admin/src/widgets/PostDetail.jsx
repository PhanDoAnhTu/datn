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
import { Divider } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const PostDetail = ({ item }) => {
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      content: item ? item.content : "",
      postTitle: item ? item.label : "",
      image: item ? item.image : "",
      dateAdded: item ? dayjs(item.dateAdded).format("hh:mm DD/MM/YYYY") : "",
      dateModified: item
        ? dayjs(item.dateModified).format("hh:mm DD/MM/YYYY")
        : "",
      lastModifiedBy: item ? item.lastModifiedBy : "",
      addedBy: item ? item.addedBy : "",
      topic: item
        ? topics_management.slice().find((item) => item.id === item.topicID)
        : topics_management[0],
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
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10 sm:grid-cols-8">
        <div className="grid grid-cols-1 sm:col-span-5 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">
                Hình ảnh bài viết
              </span>
              <div className="grid grid-cols-1 gap-5">
                <Controller
                  name="image"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone 2xl:col-span-2 pointer-events-none aspect-w-4 aspect-h-1"
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
              placeholder="Enter title name"
              disabled
              {...register("postTitle", { required: true })}
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
                disabled
                {...register("content", { required: true })}
              />
            </div>
          </div>
        </div>
        <Divider className="sm:hidden" />
        <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="category">
              Chủ đề
            </label>
            <Controller
              name="topic"
              control={control}
              disabled
              defaultValue={defaultValues.topic}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isInvalid={errors.topic}
                  id="topic"
                  placeholder="Select topic"
                  options={topics_management}
                  value={field.value}
                  isDisabled={true}
                  onChange={(value) => field.onChange(value)}
                />
              )}
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
              <label className="field-label" htmlFor="lastModifiedBy">
                Chỉnh sửa bởi
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.lastModifiedBy,
                })}
                id="lastModifiedBy"
                defaultValue={defaultValues.lastModifiedBy}
                placeholder="Enter title name"
                disabled
                {...register("lastModifiedBy", { required: true })}
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

export default PostDetail;
