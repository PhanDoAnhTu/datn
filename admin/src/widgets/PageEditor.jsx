// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";

const PageEditor = ({ item, title }) => {
  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;

  const defaultValues = {
    description: item ? item.description : productDescription,
    pageName: item ? item.label : "",
    path: item ? item.path : "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  // do something with the data
  const handleSave = (data) => {
    console.log(data);
    toast.info("Product saved successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px] capitalize">{title}</h5>
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Description
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
              Page Name
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.pageName,
              })}
              id="pageName"
              defaultValue={defaultValues.pageName}
              placeholder="Enter page name"
              {...register("pageName", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="path">
              Path to
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.path,
              })}
              id="path"
              defaultValue={defaultValues.path}
              placeholder="Enter path"
              {...register("path", { required: true })}
            />
          </div>
          <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
            <button
              className="btn btn--secondary"
              onClick={handleSubmit(handleSave)}
            >
              Save to Drafts
            </button>
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Publish Page
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default PageEditor;
