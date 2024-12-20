// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import { createTopic } from "../store/actions/blog-actions";
import { useDispatch } from "react-redux";

const TopicEditor = () => {
  const defaultValues = {
    description: "",
    topicName: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const dispatch = useDispatch();

  // do something with the data
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    const newTopic = await dispatch(
      createTopic({
        topic_name: data.topicName,
        topic_description: data.description,
        isPublished: true,
      })
    );

    // console.log(newTopic);

    if (newTopic?.payload?.status === (200 || 201)) {
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
  const handleSave = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    const newTopic = await dispatch(
      createTopic({
        topic_name: data.topicName,
        topic_description: data.description,
        isDraft: true,
      })
    );

    // console.log(newTopic);

    if (newTopic?.payload?.status === (200 || 201)) {
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

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Chi tiết chủ đề
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
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="topicName">
              Tên chủ đề
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.topicName,
              })}
              id="topicName"
              defaultValue={defaultValues.topicName}
              placeholder="VD: Thời trang, Chuỗi cung ứng"
              {...register("topicName", { required: true })}
            />
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
        </div>
      </form>
    </Spring>
  );
};

export default TopicEditor;
