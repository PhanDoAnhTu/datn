// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import Select from "@ui/Select";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import DropFiles from "@components/DropFiles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, getListTopic } from "../store/actions/blog-actions";
import { upLoadImageSingle } from "../store/actions/upload-actions";

const PostEditor = () => {
  const dispatch = useDispatch();
  const [topics_management, setTopicsManagement] = useState([]);
  const defaultValues = {
    content: "",
    postTitle: "",
    summary: "",
    image: "",
    topic: null,
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getListTopic());
      if (result) {
        setTopicsManagement(
          result.payload.metaData?.map((item) => {
            return { label: item.topic_name, value: item._id };
          })
        );
      }
    };
    fetchData();
  }, []);

  // do something with the data
  const handleSave = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    let imageSingle = null;
    if (data?.image?.length > 0) {
      const image = new FormData();
      image.append("file", data.image[0]);
      image.append("folderName", "outrunner/images/post");
      const uploadImageSingle = await dispatch(upLoadImageSingle(image));
      imageSingle =
        uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url;
    }
    const newPost = await dispatch(
      createPost({
        post_name: data.postTitle,
        post_title: data.postTitle,
        post_content: data.content,
        post_short_description: data.summary,
        topic_id: data.topic?.value,
        post_image: imageSingle,
        isDraft: true,
      })
    );

    // console.log(newPost);

    if (newPost?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Tao chủ đề thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Tao chủ đề không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  // do something with the data
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    let imageSingle = null;
    if (data?.image?.length > 0) {
      const image = new FormData();
      image.append("file", data.brand_image[0]);
      image.append("folderName", "outrunner/images/post");
      const uploadImageSingle = await dispatch(upLoadImageSingle(image));
      imageSingle =
        uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url;
    }
    const newPost = await dispatch(
      createPost({
        post_name: data.postTitle,
        post_title: data.postTitle,
        post_content: data.content,
        post_short_description: data.summary,
        topic_id: data.topic?.value,
        post_image: imageSingle,
        isPublished: true,
      })
    );

    // console.log(newPost);

    if (newPost?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Tao bài viết thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Tao bài viết không thành công",
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
            <label className="field-label" htmlFor="summary">
              Tóm tắt bài viết
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.summary,
              })}
              id="summary"
              defaultValue={defaultValues.summary}
              placeholder="Nhập tóm tắt bài viết"
              {...register("summary", { required: true })}
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
