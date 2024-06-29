// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// constants

// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findAllCategory } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@contexts/themeContext";

const DetailProduct = ({ item }) => {
  const { theme } = useTheme();

  const defaultValues = {
    image1: item ? item.product_thumb : undefined,
    description: item ? item.product_description : "",
    categoryName: item ? item.product_name : "",
    category: "",
  };
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start xl:grid-cols-3 xl:gap-10">
        <div>
          <div className="mb-2.5">
            <span className="block field-label mb-2.5">Ảnh sản phảm</span>
            <div className="field-wrapper">
              <Controller
                name="image1"
                control={control}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass={`media-dropzone pointer-events-none col-span-full aspect-w-1 aspect-h-1`}
                    onChange={(files) => field.onChange(files)}
                    defaultValue={item?.product_thumb}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 col-span-2 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="categoryName">
              Tên sản phẩm
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.categoryName,
              })}
              id="categoryName"
              disabled={true}
              defaultValue={defaultValues.categoryName}
              placeholder="Enter category name"
              {...register("categoryName", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="categoryName">
              Giá tiền
            </label>
            <input
              className="field-input"
              id="categoryName"
              disabled={true}
              value={item.product_price}
            />
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="description">
                  Mô tả sản phẩm
                </label>
                <Editor
                  key={theme}
                  apiKey="b6ic198ke2qcqbou4w6gx76a7tz5fx69qmclac76acprbgt4"
                  value={item.product_description}
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
      </form>
    </Spring>
  );
};

export default DetailProduct;
