// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

import emailjs from "@emailjs/browser";
// utils
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  findOneContact,
  updateOneContact,
} from "../store/actions/contact-actions";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@contexts/themeContext";

const ContactResponsing = ({ id }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { theme } = useTheme();
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
    control,
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

  const content = watch("content");

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
                <Editor
                  key={theme}
                  apiKey="b6ic198ke2qcqbou4w6gx76a7tz5fx69qmclac76acprbgt4"
                  value={contact_content}
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                    toolbar: false,
                    menubar: false,
                    statusbar: false,
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
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

                <Controller
                  name="content"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={defaultValues.content}
                  render={({ field }) => (
                    <Editor
                      key={theme}
                      apiKey="b6ic198ke2qcqbou4w6gx76a7tz5fx69qmclac76acprbgt4"
                      value={content}
                      ref={editorRef}
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
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
