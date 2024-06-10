// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import RangeDatePicker from "@ui/RangeDatePicker";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// constants
import {
  PRODUCT_CATEGORIES,
  PRODUCT_TYPE_OPTIONS,
  PROMOTIONAL_OPTIONS,
  STOCK_STATUS_OPTIONS,
  UNITS_OPTIONS,
} from "@constants/options";

// utils
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ColorPicker from "@ui/ColorPicker";
import SizePicker from "@ui/SizePicker";

const ProductEditor = ({ item, title }) => {
  const categories = PRODUCT_CATEGORIES.filter(
    (category) => category.value !== "all"
  );
  const [color, setColor] = useState("#fff");
  const [selectedColor, setSelectedColor] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const productDescription = `Ut tortor ex, pellentesque nec volutpat vel, congue eu nibh. Sed posuere ipsum ut ornare ultrices. Aliquam condimentum ultricies lacinia. Aenean ac dolor mauris. Curabitur cursus mi ac urna vestibulum consectetur. Praesent vulputate eleifend ipsum at ultrices. Proin sed elementum diam, in ullamcorper risus`;
  const defaultValues = {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    productType: PRODUCT_TYPE_OPTIONS[0],
    dimensions: "10 * 10 * 10",
    weight: 0.1,
    description: productDescription,
    productName: "Sport Smart Watch",
    brandName: "Pineapple",
    category: categories[0],
    regularPrice: 1000,
    salePrice: 800,
    productSchedule: [dayjs().startOf("week"), dayjs().endOf("week")],
    promoType: PROMOTIONAL_OPTIONS[0],
    stockStatus: STOCK_STATUS_OPTIONS[0],
    productSKU: "SKU-123456",
    qty: 100,
    unit: UNITS_OPTIONS[0],
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const handleColorAdd = (e) => {
    e.preventDefault();
    if (selectedColor.findIndex((item) => item.color === color) === -1) {
      setSelectedColor((oldState) => [...oldState, { color: color }]);
    } else {
      toast.error("Color existed!");
    }
  };

  const handleSizeAdd = (e) => {
    e.preventDefault();
    setSelectedSizes(
      sizes.slice().sort((a, b) => (a.value < b.value ? -1 : 1))
    );
  };

  useEffect(() => {
    console.log(selectedSizes);
  }, [selectedSizes]);
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
      <h5 className="mb-[15px]">Product Settings</h5>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div>
            <span className="block field-label mb-2.5">Product Images</span>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]">
              <Controller
                name="image1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-1 aspect-h-1"
                    onChange={(files) => field.onChange(files)}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
              <Controller
                name="image2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-1 aspect-h-1"
                    onChange={(files) => field.onChange(files)}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
              <div className="grid grid-cols-2 col-span-2 gap-5 2xl:col-span-1 2xl:grid-cols-1">
                <Controller
                  name="image3"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone aspect-w-1 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
                <Controller
                  name="image4"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone aspect-w-1 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <span className="field-label">Colors</span>
                <div className="flex flex-wrap gap-5">
                  {selectedColor.map((item) => (
                    <button
                      className={`img-wrapper w-[60px] h-10 group`}
                      style={{ backgroundColor: `${item.color}` }}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor.filter(
                            (item1) => item1.color !== item.color
                          )
                        )
                      }
                      aria-label="Add color"
                    >
                      <i className="icon-xmark-regular text-[12px] opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                  <ColorPicker
                    color={color}
                    setColor={setColor}
                    handleColorAdd={handleColorAdd}
                  />
                </div>
              </div>
              <div className="field-wrapper">
                <span className="field-label">Size</span>
                <div className="flex flex-wrap gap-5">
                  {selectedSizes.map((item) => (
                    <button
                      className={`img-wrapper w-[60px] h-10 group !bg-transparent`}
                      disabled
                      aria-label="Add color"
                    >
                      {item.size}
                    </button>
                  ))}
                  <SizePicker
                    sizes={sizes}
                    selectedSizes={selectedSizes}
                    setSizes={setSizes}
                    handleSizeAdd={handleSizeAdd}
                  />
                </div>
              </div>
            </div>

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
            <label className="field-label" htmlFor="productName">
              Product Name
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.productName,
              })}
              id="productName"
              defaultValue={defaultValues.productName}
              placeholder="Enter product name"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Brand
              </label>
              <Controller
                name="brandName"
                control={control}
                defaultValue={defaultValues.brandName}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.brandName}
                    id="brandName"
                    placeholder="Select brand"
                    options={categories}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="category">
                Category
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
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="regularPrice">
                Regular Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.regularPrice,
                })}
                id="regularPrice"
                defaultValue={defaultValues.regularPrice}
                placeholder="$99.99"
                {...register("regularPrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="salePrice">
                Sale Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.salePrice,
                })}
                id="salePrice"
                defaultValue={defaultValues.salePrice}
                placeholder="$99.99"
                {...register("salePrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productSchedule">
                Schedule
              </label>
              <Controller
                name="productSchedule"
                control={control}
                defaultValue={defaultValues.productSchedule}
                render={({ field }) => (
                  <RangeDatePicker
                    id="productSchedule"
                    innerRef={field.ref}
                    disableFuture={false}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="promoType">
                Promotion
              </label>
              <Controller
                name="promoType"
                control={control}
                defaultValue={defaultValues.promoType}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.promoType}
                    id="promoType"
                    placeholder="Select promotion"
                    options={PROMOTIONAL_OPTIONS}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productSKU">
                SKU
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.productSKU,
                })}
                id="productSKU"
                placeholder="SKU"
                defaultValue={defaultValues.productSKU}
                {...register("productSKU", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="unit">
                Unit
              </label>
              <Controller
                name="unit"
                control={control}
                defaultValue={defaultValues.unit}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.unit}
                    id="unit"
                    placeholder="Pieces"
                    options={UNITS_OPTIONS}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div>
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
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default ProductEditor;
