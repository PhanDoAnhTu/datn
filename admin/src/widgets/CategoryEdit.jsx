// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// utils
import classNames from "classnames";
import categories_management from "@db/categories_management";

const CategoryEdit = ({ item }) => {
  const categories = categories_management.map((item) => ({
    value: item._id,
    label: item.category_name,
  }));
  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;

  const defaultValues = {
    image1: item ? item.category_image : undefined,
    description: item ? item.category_description : productDescription,
    categoryName: item ? item.category_name : "",
    category: item
      ? categories[
          categories_management.findIndex(
            (category) => category._id === item.category_parent_id
          )
        ]
      : { value: null, label: "Không có" },
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const image = watch("image1");

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
      <form className="grid grid-cols-1 items-start xl:grid-cols-3 xl:gap-10">
        <div>
          <div className="mb-2.5">
            <span className="block field-label mb-2.5">Ảnh danh mục</span>
            <div className="field-wrapper">
              <Controller
                name="image1"
                control={control}
                render={({ field }) => (
                  <DropFiles
                    wrapperClass={`media-dropzone col-span-full aspect-w-1 aspect-h-1`}
                    defaultValue={image}
                    onChange={(files) => field.onChange(files)}
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
              Tên danh mục
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.categoryName,
              })}
              id="categoryName"
              defaultValue={defaultValues.categoryName}
              placeholder="VD: Túi xách, quần áo,..."
              {...register("categoryName", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Danh mục cha
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
                    placeholder="Chọn danh mục"
                    options={[
                      { value: null, label: "Không có" },
                      ...categories,
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="description">
                  Mô tả danh mục
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
          <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Sửa
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default CategoryEdit;
