// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { createMenu } from "../store/actions/menu-actions";

const MenuNew = () => {
  const dispatch = useDispatch();
  const defaultValues = {
    description: "",
    pageName: "",
    path: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handlePublish = async (data) => {
    await dispatch(
      createMenu({
        menu_label: data.pageName,
        menu_description: data.description,
        menu_path: data.path,
      })
    );
    toast.success("Tạo thành công");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Mô tả
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
            <label className="field-label" htmlFor="pageName">
              Tên
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.pageName,
              })}
              id="pageName"
              defaultValue={defaultValues.pageName}
              {...register("pageName", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="path">
              Đường dẫn
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.path,
              })}
              id="path"
              defaultValue={defaultValues.path}
              {...register("path", { required: true })}
            />
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
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

export default MenuNew;
