// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";

// hooks
import { useForm, Controller } from "react-hook-form";

// utils
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findAllCategory } from "../store/actions/category-action";

const CategoryInfo = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const defaultValues = {
    image1: item ? item.category_image : undefined,
    description: item ? item.category_description : "",
    categoryName: item ? item.category_name : "",
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(findAllCategory());
      if (result) {
        setCategories(
          result.payload.metaData.map((item) => {
            return { label: item.category_name, value: item._id };
          })
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue(
      "category",
      categories
        ? categories?.find((subitem) => subitem.value === item.parent_id) !=
          undefined
          ? categories?.find((subitem) => subitem.value === item.parent_id)
          : { value: null, label: "Không có" }
        : { value: null, label: "Không có" }
    );
  }, [categories]);

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
              Tên danh mục
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
                  Mô tả danh mục
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
                navigate(`/category-editor/${item._id}`, {
                  state: { record: item },
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
