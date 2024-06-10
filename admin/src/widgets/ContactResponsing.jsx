// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";

const ContactResponsing = ({ item }) => {
  const defaultValues = {
    content: item ? item.content : "",
    contactName: item ? item.label : "",
    isSolved: item ? item.isSolved : "",
    email: item ? item.email : "",
    fullName: item ? item.fullName : "",
  };
  const defaultResponses = {
    content: "",
    title: "",
    isSolved: true,
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultResponses: defaultResponses,
  });

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  return (
    <>
      <Spring className="card flex-1 xl:py-10 mb-10">
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 xl:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="fullName">
                  Người gửi
                </label>
                <input
                  className={"field-input"}
                  id="fullName"
                  defaultValue={defaultValues.fullName}
                  placeholder="Enter full name"
                  disabled
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="email">
                  Email
                </label>
                <input
                  className={"field-input"}
                  id="email"
                  defaultValue={defaultValues.email}
                  placeholder="Enter email"
                  disabled
                />
              </div>
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="contactName">
                Tiêu đề
              </label>
              <input
                className={"field-input"}
                id="contactName"
                defaultValue={defaultValues.contactName}
                placeholder="Enter content name"
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="content">
                  Nội dung
                </label>
                <textarea
                  className={`field-input !h-[160px] !py-[15px] !overflow-y-auto`}
                  id="content"
                  defaultValue={defaultValues.content}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="card flex-1 xl:py-10">
        <h5 className="mb-[15px]">Phản hồi</h5>
        <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="email">
                Đến
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.email,
                })}
                type="email"
                id="email"
                defaultValue={defaultResponses.email}
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="title">
                Tiêu đề
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.title,
                })}
                id="title"
                defaultValue={defaultResponses.title}
                placeholder="Enter content name"
                {...register("title", { required: true })}
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
                  defaultValue={defaultResponses.content}
                  {...register("content", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
              <button
                className="btn btn--primary"
                onClick={handleSubmit(handlePublish)}
              >
                Gửi
              </button>
            </div>
          </div>
        </form>
      </Spring>
    </>
  );
};

export default ContactResponsing;
