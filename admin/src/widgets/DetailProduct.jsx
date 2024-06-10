// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";

// constants
import { PRODUCT_CATEGORIES, UNITS_OPTIONS } from "@constants/options";

// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Divider, Empty } from "antd";
import StyledTable from "./productEditorStyle";
import { capitalize } from "@mui/material";

const DetailProduct = ({ item }) => {
  const categories = PRODUCT_CATEGORIES.filter(
    (category) => category.value !== "all"
  );

  const [isVariation, setIsVariation] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    weight: 0.1,
    description: "",
    productName: "",
    brandName: "Pineapple",
    category: categories[0],
    regularPrice: 0,
    stock: 0,
    unit: UNITS_OPTIONS[0],
  });

  const defaultVariationTables = [
    {
      id: -1,
      title: (
        <div className="flex items-center justify-center">
          <i className="icon-image-regular text-[26px]" />
        </div>
      ),
      dataIndex: "image",
      width: 50,
      render: (image, record) => (
        <div className="md:w-full xl:h-[140px] md:h-[80px] h-[50px] w-[50px] flex items-center justify-center pr-2">
          <DropFiles
            wrapperClass="media-dropzone w-full h-full text-center"
            onChange={(e) => handleImageChange(record.sku_tier_idx, e)}
          >
            <MediaDropPlaceholder />
          </DropFiles>
        </div>
      ),
    },
    {
      id: 20,
      title: "Price",
      dataIndex: "sku_price",
      width: 150,
      render: (sku_price, record) => {
        return (
          <div className="flex flex-col">
            <div className="field-wrapper">
              <input
                className={classNames(
                  "field-input focus:text-left text-center"
                )}
                type="text"
                onChange={(e) =>
                  handleSKUPriceChange(record.sku_tier_idx, e.target.value)
                }
                value={sku_price}
                placeholder=""
              />
            </div>
          </div>
        );
      },
    },
    {
      id: 30,
      title: "Stock",
      dataIndex: "sku_stock",
      width: 150,
      render: (sku_stock, record) => (
        <div className="flex flex-col">
          <div className="field-wrapper">
            <input
              className={classNames("field-input focus:text-left text-center")}
              type="text"
              value={sku_stock}
              onChange={(e) =>
                handleSKUStockChange(record.sku_tier_idx, e.target.value)
              }
              placeholder=""
            />
          </div>
        </div>
      ),
    },
  ];
  const defaultVariation = [
    {
      id: 1,
      type: "text",
      variationName: "",
      options: [
        {
          id: 1,
          type: "text",
          value: "",
        },
      ],
    },
  ];

  const [variationTables, setVariationTables] = useState(
    defaultVariationTables
  );

  const [variations, setVariations] = useState(defaultVariation);
  const [sKUList, setSKUList] = useState([]);
  //Handle Remove/Add variation

  const addInput = () => {
    setVariations((prevState) => [
      ...prevState,
      {
        id: variations.length + 1,
        type: "text",
        variationName: "",
        options: [
          {
            id: 1,
            type: "text",
            value: "",
          },
        ],
      },
    ]);
  };

  const removeInput = (variantID) => {
    setVariations((s) => {
      const newArr = s.slice().filter((item) => item.id !== variantID);

      const renumberedArr = newArr.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      return renumberedArr;
    });
    setVariationTables((s) => {
      const newArr = s.slice().filter((item) => item.id !== variantID);
      return newArr;
    });

    console.log(variations);
  };

  const handleChange = (e, variationName, variationID) => {
    e.preventDefault();

    setVariations((s) => {
      const index = s.slice().findIndex((item) => item.id === variationID);
      const newArr = s.slice();

      newArr[index].variationName = variationName;

      return newArr;
    });
  };

  //Handle remove/add Option
  const addOptionInput = (variantID) => {
    setVariations((s) => {
      const index = s.slice().findIndex((item) => item.id === variantID);
      const newArr = s.slice();

      newArr[index].options.push({
        id: newArr[index].options.length + 1,
        type: "text",
        value: "",
      });

      return newArr;
    });
  };

  const handleRemoveOption = (optionID, variantID) => {
    setVariations((s) => {
      const index = s.slice().findIndex((item) => item.id === variantID);
      const newArr = s.slice();
      const filteredOptions = newArr[index].options
        .slice()
        .filter((item) => item.id !== optionID);
      const renumberedArr = filteredOptions.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      newArr[index].options = renumberedArr;

      return newArr;
    });
  };

  const handleOptionChange = (e, optionID, optionValue, variantID) => {
    e.preventDefault();
    setVariations((s) => {
      const index = s.slice().findIndex((item) => item.id === variantID);
      const newArr = s.slice();
      const optionIndex = newArr[index].options
        .slice()
        .findIndex((item) => item.id === optionID);

      newArr[index].options[optionIndex].value = optionValue;

      return newArr;
    });
    console.log(variations);
  };

  //Update SKUList base on variation
  useEffect(() => {
    const updateSKUList = () => {
      const variationCounts = variations.map((item) => item.options.length); // Get the number of options for each variation
      const totalLength = variationCounts.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        1
      ); // Calculate the total number of combinations

      const newSKUList = [];
      for (let i = 0; i < totalLength; i++) {
        let temp = i;
        const sku_tier_idx = variations.map((variation, index) => {
          const options = variation.options;
          const optionIndex = temp % options.length; // Get the index of the option for the current variation
          temp = Math.floor(temp / options.length); // Update temp for the next iteration
          return options[optionIndex].id; // Get the ID of the selected option
        });

        newSKUList.push({
          sku_tier_idx,
          sku_price: "",
          sku_stock: "",
          public_id: "",
          image: null, // Increment stock for demonstration
        });
        newSKUList.sort((a, b) =>
          a.sku_tier_idx[0] > b.sku_tier_idx[0] ? 1 : -1
        );
      }
      setSKUList(newSKUList);
    };

    updateSKUList();
  }, [variations]);

  //SKU_stock, SKU_price, image handle if a user put something in input
  const handleSKUPriceChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      const index = s.findIndex(
        (item) =>
          JSON.stringify(item.sku_tier_idx) === JSON.stringify(sku_tier_idx)
      );
      const newSKU = s.slice();
      newSKU[index].sku_price = value;

      return newSKU;
    });
  };
  const handleSKUStockChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      const index = s.findIndex(
        (item) =>
          JSON.stringify(item.sku_tier_idx) === JSON.stringify(sku_tier_idx)
      );
      const newSKU = s.slice();
      newSKU[index].sku_stock = value;
      return newSKU;
    });
  };
  const handleImageChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      const index = s.findIndex(
        (item) =>
          JSON.stringify(item.sku_tier_idx) === JSON.stringify(sku_tier_idx)
      );
      const newSKU = s.slice();
      newSKU[index].image = value;
      console.log(newSKU);
      return newSKU;
    });
  };

  //This will update table header when variation (variations) change
  useEffect(() => {
    const updatedVariationTables = () => {
      setVariationTables(() => {
        const s = defaultVariationTables?.slice();
        variations.forEach((item) => {
          const sLocated = s.findIndex((item1) => item1.id === item.id);
          if (sLocated === -1) {
            s?.push({
              id: item.id,
              title: capitalize(item.variationName),
              dataIndex: "sku_tier_idx",
              width: 200,
              render: (sku_tier_idx) => (
                <div className="flex flex-col text-center">
                  {item.id === 1
                    ? variations
                        .find((item1) => item1.id === item.id)
                        .options.find((item2) => item2.id === sku_tier_idx[0])
                        ?.value
                    : variations
                        .find((item1) => item1.id === item.id)
                        .options.find((item2) => item2.id === sku_tier_idx[1])
                        ?.value}
                </div>
              ),
            });
            s?.sort((a, b) => (a.id > b.id ? 1 : -1));
          } else {
            s[sLocated] = {
              id: item.id,
              title: capitalize(item.variationName),
              dataIndex: "sku_tier_idx",
              width: 200,
              render: (sku_tier_idx) => (
                <div className="flex flex-col text-center">
                  {item.id === 1
                    ? variations
                        .find((item1) => item1.id === item.id)
                        .options.find((item2) => item2.id === sku_tier_idx[0])
                        .value
                    : variations
                        .find((item1) => item1.id === item.id)
                        .options.find((item2) => item2.id === sku_tier_idx[1])
                        .value}
                </div>
              ),
            };
          }
        });
        return s;
      });
    };
    updatedVariationTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variations]);

  const {
    register,
    handleSubmit,
    control,
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
      <h5 className="mb-[15px]">Edit a product</h5>
      <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div>
          <div>
            <span className="block field-label mb-2.5">Product Images</span>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-8">
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
              <Controller
                name="image3"
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
                name="image4"
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
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="brandName">
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
              <label className="field-label" htmlFor="weight">
                Weight, kg
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.weight,
                })}
                id="weight"
                defaultValue={defaultValues.weight}
                placeholder="Product weight"
                {...register("weight", {
                  required: true,
                  pattern: /^\d+(\.\d{1,2})?$/,
                })}
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
              <label className="field-label" htmlFor="stock">
                Stock
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.stock,
                })}
                id="stock"
                defaultValue={defaultValues.stock}
                disabled={isVariation}
                placeholder="0"
                {...register("salePrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <label className="field-label" htmlFor="variationBtn">
              Variations
            </label>
            <button
              onClick={() => setIsVariation(true)}
              id="variationBtn"
              className={` ${
                isVariation === false ? "btn--social btn block" : "hidden"
              }`}
            >
              <i className={`icon icon-circle-plus-regular`} />
              <span>Enable Variations</span>
            </button>
            <div
              className={`${
                isVariation ? "" : "hidden"
              } grid grid-cols-1 gap-y-4 gap-x-2`}
            >
              {variations.map((item, index) => {
                return (
                  <Spring
                    key={index}
                    className={`card relative flex-1 xl:py-5`}
                  >
                    <div className="flex py-5">
                      <h5>Variation {item.id}</h5>
                      {index !== 0 ? (
                        <button
                          onClick={() => removeInput(item.id)}
                          className="absolute right-4 top-3 text-red font-extrabold"
                        >
                          X
                        </button>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                      <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                        <div className="field-wrapper">
                          <span className="field-label">Variation Name</span>
                          <input
                            className={classNames("field-input", {
                              "field-input--error": errors.regularPrice,
                            })}
                            onChange={(e) =>
                              handleChange(e, e.target.value, item.id)
                            }
                            type={item.type}
                            value={item.variationName}
                            placeholder="Eg. Size, Color, etc."
                          />
                        </div>
                        <div className="field-wrapper">
                          <span className="field-label">Options</span>
                          {item.options.map((subitem, index) => {
                            return (
                              <div className="flex space-x-3 items-center">
                                <input
                                  className={classNames("field-input", {
                                    "field-input--error": errors.salePrice,
                                  })}
                                  key={index}
                                  onChange={(e) =>
                                    handleOptionChange(
                                      e,
                                      subitem.id,
                                      e.target.value,
                                      item.id
                                    )
                                  }
                                  value={subitem.value}
                                  placeholder="Eg. SM, Red, etc."
                                />
                                {index !== 0 ? (
                                  <button
                                    onClick={() =>
                                      handleRemoveOption(subitem.id, item.id)
                                    }
                                    className="btn btn--outline red"
                                  >
                                    X
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        onClick={() => addOptionInput(item.id)}
                        className={`btn--social btn`}
                      >
                        <i className={`icon icon-circle-plus-regular`} />
                        <span>Add Option</span>
                      </button>
                    </div>
                  </Spring>
                );
              })}
              {variations.length < 2 ? (
                <button onClick={addInput} className={`btn--social btn`}>
                  <i className={`icon icon-circle-plus-regular`} />
                  <span>Add Variation {variations.length + 1}</span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {isVariation ? (
            <>
              <Divider />
              <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                <StyledTable
                  columns={variationTables}
                  dataSource={sKUList}
                  locale={{
                    emptyText: <Empty text="No variations found" />,
                  }}
                  pagination={false}
                />
              </div>
            </>
          ) : (
            ""
          )}

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

export default DetailProduct;
