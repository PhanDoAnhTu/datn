// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";

// hooks
import { useForm, Controller } from "react-hook-form";

// utils
import classNames from "classnames";
import categories_management from "@db/categories_management";
import { useNavigate } from "react-router-dom";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

const CategoryInfo = ({ item }) => {
  const navigate = useNavigate();
  const categories = categories_management.filter(
    (category) => category.status !== "trash"
  );
  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;

  const defaultValues = {
    image1: item ? item.image : undefined,
    description: item ? item.description : productDescription,
    categoryName: item ? item.label : "",
    category: item
      ? categories[
          categories.findIndex(
            (category) => category.label === item.parentCategory
          )
        ]
      : categories[0],
    dateAdded: item ? item.dateAdded : "",
    dateModified: item ? item.dateModified : "",
  };
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start xl:grid-cols-3 xl:gap-10">
        <div>
          <div className="mb-2.5">
            <span className="block field-label mb-2.5">Category Image</span>
            <div className="field-wrapper">
              <Controller
                name="image1"
                control={control}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass={`media-dropzone pointer-events-none col-span-full aspect-w-1 aspect-h-1`}
                    onChange={(files) => field.onChange(files)}
                    defaultValue={item.image}
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
              Category Name
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
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Parent Category
              </label>
              <Controller
                name="category"
                control={control}
                defaultValue={defaultValues.category}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.category}
                    id="category"
                    placeholder="Select category"
                    options={categories}
                    value={field.value}
                    isDisabled={true}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
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
                  disabled={true}
                  id="description"
                  defaultValue={defaultValues.description}
                  {...register("description", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--secondary"
              onClick={() =>
                navigate(`/category-editor`, {
                  state: { record: item, title: `Category Edit` },
                })
              }
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default CategoryInfo;
