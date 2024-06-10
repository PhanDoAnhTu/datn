// components
import Spring from "@components/Spring";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { capitalize } from "@mui/material";

const TopicInfo = ({ item }) => {
  const navigate = useNavigate();
  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;

  const defaultValues = {
    description: item ? item.description : productDescription,
    topicName: item ? item.label : "",
    dateAdded:
      item && dayjs(item.dateAdded).format("hh:mm DD/MM/YYYY")
        ? dayjs().diff(dayjs(item.dateAdded), "minute") < 60
          ? `${dayjs().diff(dayjs(item.dateAdded), "minute")} Minutes ago`
          : dayjs().diff(dayjs(item.dateAdded), "hour") < 24
          ? `${dayjs().diff(dayjs(item.dateAdded), "hour")} Hours ago`
          : dayjs(item.dateAdded).format("hh:mmA DD/MM/YYYY")
        : "",
    dateModified:
      item && dayjs(item.dateModified).format("hh:mm DD/MM/YYYY")
        ? dayjs(item.dateModified).format("hh:mmA DD/MM/YYYY")
        : "",
    modifiedBy: item ? item.modifiedBy : "",
    addedBy: item ? item.addedBy : "",
    status: item ? capitalize(item.status) : "",
  };
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Mô tả chủ đề
              </label>
              <textarea
                className={classNames(
                  `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                  { "field-input--error": errors.description }
                )}
                disabled={true}
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
              disabled={true}
              defaultValue={defaultValues.topicName}
              placeholder="Enter category name"
              {...register("topicName", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="dateAdded">
                Ngày tạo
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.dateAdded,
                })}
                id="dateAdded"
                disabled
                defaultValue={defaultValues.dateAdded}
                placeholder="hh:mm DD/MM/YYYY"
                {...register("dateAdded", {
                  required: true,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="addedBy">
                Tạo bởi
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.addedBy,
                })}
                id="addedBy"
                defaultValue={defaultValues.addedBy}
                placeholder="Eg. test"
                disabled
                {...register("addedBy", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="dateModified">
                Ngày chỉnh sửa
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.dateModified,
                })}
                id="dateModified"
                disabled
                defaultValue={defaultValues.dateModified}
                placeholder="hh:mm DD/MM/YYYY"
                {...register("dateModified", {
                  required: true,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="modifiedBy">
                Chỉnh sửa bởi
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.modifiedBy,
                })}
                id="modifiedBy"
                defaultValue={defaultValues.modifiedBy}
                placeholder="Eg. test"
                disabled
                {...register("modifiedBy", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="status">
              Status
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.status,
              })}
              id="status"
              disabled={true}
              defaultValue={defaultValues.status}
              placeholder="Enter category name"
              {...register("status", { required: true })}
            />
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--secondary"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/topic-editor`, {
                  state: { record: item, title: `Topic Edit` },
                });
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default TopicInfo;
