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
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getListTopic,
  getOnePost,
  updateOnePost,
} from "../store/actions/blog-actions";
import { upLoadImageSingle } from "../store/actions/upload-actions";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@contexts/themeContext";

const PostEdit = ({ id }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [data, setData] = useState({});
  const [topics_management, setTopicsManagement] = useState([]);
  const editorRef = useRef(null);
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
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const post_title = watch("postTitle");
  const post_content = watch("content");
  const post_short_description = watch("summary");

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
      const result2 = await dispatch(getOnePost({ post_id: id }));
      if (result2) {
        setData(result2.payload.metaData);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setValue("postTitle", data && data.post_title);
    setValue("content", data && data.post_content);
    setValue("summary", data && data.post_short_description);
    setValue(
      "topic",
      data &&
        topics_management?.slice().find((item) => item.value === data.topic_id)
    );
  }, [data]);

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
    const updatedPost = await dispatch(
      updateOnePost({
        post_id: id,
        post_name: data.postTitle,
        post_title: data.postTitle,
        post_content: data.content,
        post_short_description: data.summary,
        topic_id: data.topic?.value,
        post_image: imageSingle,
        isPublished: true,
      })
    );

    // console.log(updatedPost);

    if (updatedPost?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Cập nhật bài viết thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Cập nhật bài viết không thành công",
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
              value={post_title}
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
              value={post_short_description}
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
              <Controller
                name="content"
                control={control}
                rules={{ required: true }}
                defaultValue={defaultValues.content}
                render={({ field }) => (
                  <Editor
                    key={theme}
                    apiKey="b6ic198ke2qcqbou4w6gx76a7tz5fx69qmclac76acprbgt4"
                    value={post_content}
                    ref={editorRef}
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                      tinycomments_mode: "embedded",
                      tinycomments_author: "Author name",
                      extended_valid_elements:
                        "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
                      mergetags_list: [
                        {
                          value: "First.Name",
                          title: "First Name",
                        },
                        { value: "Email", title: "Email" },
                      ],
                      content_css: theme === "dark" ? "dark" : "default",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      icons: "material",
                      language: "vi",
                    }}
                    onEditorChange={field.onChange}
                  />
                )}
              />
            </div>
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

export default PostEdit;
