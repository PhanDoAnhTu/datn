// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils

import { getOneTopic, updateOneTopic } from "../store/actions/blog-actions";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const TopicEditing = ({ id }) => {
  const [data, setData] = useState({});
  const defaultValues = {
    description: "",
    topicName: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const topic_name = watch("topicName");
  const topic_description = watch("description");

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getOneTopic({ topic_id: id }));
      if (result) {
        setData(result.payload.metaData);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    setValue("topicName", data && data.topic_name);
    setValue("description", data && data.topic_description);
  }, [data]);

  // do something with the data
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng chờ...");
    const newTopic = await dispatch(
      updateOneTopic({
        topic_id: id,
        topic_name: data.topicName,
        topic_description: data.description,
      })
    );

    // console.log(newTopic);

    if (newTopic?.payload?.status === (200 || 201)) {
      toast.update(signal, {
        render: "Cập nhật chủ đề thành công",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(signal, {
        render: "Cập nhật chủ đề không thành công",
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
                value={topic_description}
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
              value={topic_name}
              defaultValue={defaultValues.topicName}
              placeholder="VD: Thời trang, Chuỗi cung ứng"
              {...register("topicName", { required: true })}
            />
          </div>

          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default TopicEditing;
