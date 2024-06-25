// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

import emailjs from "@emailjs/browser";
// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  findOneContact,
  updateOneContact,
} from "../store/actions/contact-actions";
import { useNavigate } from "react-router-dom";

const ContactResponsing = ({ id }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const defaultValues = {
    customer_content: "",
    customer_title: "",
    customer_email: "",
    customer_name: "",
  };
  const defaultResponses = {
    content: "",
    title: "",
    email: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultResponses: defaultResponses,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(findOneContact({ contact_id: id }));
      if (result) {
        setData(result.payload.metaData);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setValue("customer_title", data && data.contact_title);
    setValue("customer_content", data && data.contact_content);
    setValue("customer_email", data && data.customer_email);
    setValue("customer_name", data && data.customer_name);
    setValue("email", data && data.customer_email);
  }, [data]);
  const contact_title = watch("customer_title");
  const contact_content = watch("customer_content");
  const contact_email = watch("customer_email");
  const contact_fullname = watch("customer_name");

  // do something with the data
  const handlePublish = async (data) => {
    const signal = toast.loading("Vui lòng đợi...");

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_hvr4eb1";
    const templateId = "template_f0ihsec";
    const publicKey = "OON9A60LuSSfrKrez";

    // Create a new object that contains dynamic template params
    const templateParams = {
      title: data.title,
      to_email: data.email,
      message: data.content,
      to_name: data.customer_name,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(async (response) => {
        toast.update(signal, {
          render: "Phản hồi thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        await dispatch(updateOneContact({ contact_id: id }));
        navigate(-1);
        //thanh cong thi minh them moi vao database
      })
      .catch((error) => {
        toast.update(id, {
          render: "Phản hồi không thành công",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <Spring className="card flex-1 xl:py-10 mb-10">
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 xl:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="customer_name">
                  Người gửi
                </label>
                <input
                  className={"field-input"}
                  value={contact_fullname}
                  id="customer_name"
                  placeholder="Enter full name"
                  disabled
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="customer_email">
                  Email
                </label>
                <input
                  className={"field-input"}
                  id="customer_email"
                  value={contact_email}
                  placeholder="Enter email"
                  disabled
                />
              </div>
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="customer_title">
                Tiêu đề
              </label>
              <input
                className={"field-input"}
                id="customer_title"
                value={contact_title}
                placeholder="Enter content name"
                disabled
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="customer_content">
                  Nội dung
                </label>
                <textarea
                  className={`field-input !h-[160px] !py-[15px] !overflow-y-auto`}
                  id="customer_content"
                  value={contact_content}
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
                disabled
                defaultValue={defaultResponses.email}
                value={contact_email}
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
                placeholder="Nhập tiêu đề"
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
