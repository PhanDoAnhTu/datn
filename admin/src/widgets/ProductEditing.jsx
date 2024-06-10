// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { createSpu, upLoadProductImageList } from "../store/actions";
// hooks
import { useForm, Controller } from "react-hook-form";

// constants
import { UNITS_OPTIONS } from "@constants/options";

// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Divider, Empty } from "antd";
import StyledTable from "./productEditorStyle";
import { capitalize } from "@mui/material";
import { useDispatch } from "react-redux";
import categories_management from "@db/categories_management";
import MultipleSelect from "@ui/MultipleSelect";
import products_management from "@db/products_management";

const ProductEditing = ({ id }) => {
  //-----DECLARE DEFAULT VALUES
  const defaultValues = {
    weight: 0.1,
    product_description: "",
    product_name: "",
    product_brand: { value: null, label: "Không rõ" },
    product_category: [],
    product_price: 0,
    product_quantity: 0,
    unit: UNITS_OPTIONS[0],
  };

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
      title: "Giá",
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
      title: "Số lượng",
      dataIndex: "sku_stock",
      width: 150,
      render: (sku_stock, record) => (
        <div className="flex flex-col">
          <div className="field-wrapper">
            <input
              className={"field-input focus:text-left text-center"}
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

  //-----/DECLARE DEFAULT VALUES

  const dispact = useDispatch();
  //------------DECLARE USESTATE FOR INPUTS
  const [categories, setCategories] = useState([]);
  const [isVariation, setIsVariation] = useState(false);

  const [variationTables, setVariationTables] = useState(
    defaultVariationTables
  );
  const [variations, setVariations] = useState([]);
  const [sKUList, setSKUList] = useState([]);
  //-----------/DECLARE USESTATE FOR INPUTS

  //------GET AND SET CATEGORIES IN FIRST LOAD
  useEffect(() => {
    const topLevelCategories = categories_management
      .filter((item) => item.category_parent_id === null)
      .map((item) => ({
        value: item._id,
        label: item.category_name,
      }));

    setCategories(topLevelCategories);
  }, []);

  const handleToggleIsVariation = () => {
    setIsVariation(true);
    setVariations(defaultVariation);
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const categoriesWatch = watch("product_category");
  const productName = watch("product_name");
  const productDescription = watch("product_description");
  const productPrice = watch("product_price");
  const quantity = watch("product_quantity");

  //---------------------------CATEGORIES----------------------------//

  useEffect(() => {
    if (categoriesWatch.length === 0) {
      const updatedCategories = categories_management
        .filter((item) => item.category_parent_id === null)
        .map((item) => ({
          value: item._id,
          label: item.category_name,
        }));

      setCategories(updatedCategories);
    }
  }, [categoriesWatch]);

  const handleCategoriesSelected = (selectedOption) => {
    const selectedValue = selectedOption[selectedOption.length - 1]?.value;

    const filteredOptions = categories_management.filter(
      (category) => category.category_parent_id === selectedValue
    );

    const updatedCategories = filteredOptions.map((item) => ({
      value: item._id,
      label: item.category_name,
    }));

    setCategories(updatedCategories);
  };

  //---------------------------/CATEGORIES----------------------------//

  //---------------------------VARIATION----------------------------//
  //Handle Remove/Add variation
  const addNewVariation = () => {
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

  const removeVariation = (variantID) => {
    setVariations((s) => {
      return s
        .filter((item) => item.id !== variantID)
        .map((item, index) => ({ ...item, id: index + 1 }));
    });
  };

  const handleVariationChange = (e, variationName, variationID) => {
    e.preventDefault();

    setVariations((s) => {
      return s.map((item) => {
        if (item.id === variationID) {
          return { ...item, variationName };
        }
        return item;
      });
    });
  };

  //Handle remove/add Option
  const addVariationOption = (variantID) => {
    setVariations((s) => {
      return s.map((item) => {
        if (item.id === variantID) {
          return {
            ...item,
            options: [
              ...item.options,
              {
                id: item.options.length + 1,
                type: "text",
                value: "",
              },
            ],
          };
        }
        return item;
      });
    });
  };

  const removeVariationOption = (optionID, variantID) => {
    setVariations((s) => {
      return s.map((item) => {
        if (item.id === variantID) {
          return {
            ...item,
            options: item.options
              .filter((opt) => opt.id !== optionID)
              .map((opt, index) => ({ ...opt, id: index + 1 })),
          };
        }
        return item;
      });
    });
  };

  const handleOptionChange = (e, optionID, optionValue, variantID) => {
    e.preventDefault();
    setVariations((s) => {
      return s.map((item) => {
        if (item.id === variantID) {
          return {
            ...item,
            options: item.options.map((optionItem) => {
              if (optionItem.id === optionID) {
                return { ...optionItem, value: optionValue };
              }
              return optionItem;
            }),
          };
        }
        return item;
      });
    });
  };
  //---------------------------/VARIATION----------------------------//

  //---------------------------SKULIST----------------------------//
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
        const sku_tier_idx = variations.map((variation) => {
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
          image: null, // Increment product_quantity for demonstration
        });
        newSKUList.sort((a, b) =>
          a.sku_tier_idx[0] > b.sku_tier_idx[0] ? 1 : -1
        );
      }
      setSKUList(newSKUList);
    };

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

    updateSKUList();
    updatedVariationTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variations]);

  //SKU_stock, SKU_price, image handle if a user put something in input
  const handleSKUPriceChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      return s.map((item) => {
        if (
          item.sku_tier_idx[0] === sku_tier_idx[0] &&
          item.sku_tier_idx[1] === sku_tier_idx[1]
        ) {
          return { ...item, sku_price: value };
        }
        return item;
      });
    });
  };

  const handleSKUStockChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      return s.map((item) => {
        if (
          item.sku_tier_idx[0] === sku_tier_idx[0] &&
          item.sku_tier_idx[1] === sku_tier_idx[1]
        ) {
          return { ...item, sku_stock: value };
        }
        return item;
      });
    });
  };

  const handleImageChange = (sku_tier_idx, value) => {
    setSKUList((s) => {
      return s.map((item) => {
        if (
          item.sku_tier_idx[0] === sku_tier_idx[0] &&
          item.sku_tier_idx[1] === sku_tier_idx[1]
        ) {
          return { ...item, image: value };
        }
        return item;
      });
    });
  };
  //---------------------------/SKULIST----------------------------//

  //This will update table header when variation (variations) change

  useEffect(() => {
    const setStock = () => {
      let totalStock = 0;
      for (const sku of sKUList) {
        if (sku.sku_stock) {
          totalStock += parseInt(sku.sku_stock);
        }
      }
      return totalStock;
    };
    const test = setStock();
    setValue("product_quantity", test);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sKUList]);

  //-------LOAD DATA BASED ON ID-------//
  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = await products_management.find(
        (item) => item._id === id
      );
      setValue("product_name", foundProduct.product_name);
      setValue("product_description", foundProduct.product_description);
      setValue("product_price", foundProduct.product_price);

      //Kiểm tra nếu như product lấy về có variation ko, nếu có thì găn dữ liệu product_variation cho variations
      //Đồng thời gắn sku_list cho sKUList
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // do something with the data

  const handleSave = async (data) => {
    let list_image = new FormData();
    sKUList.forEach((item) => {
      if (item.image != null) {
        list_image.append("files", item.image[0]);
        list_image.append("sku_list", item.sku_tier_idx);
      }
    });
    list_image.append("folderName", "outrunner/products");

    const list_url_thumb = await dispact(upLoadProductImageList(list_image));
    //sau khi upload ảnh thì lưu "thumb_url" và "public_id" vào sku_list sau đó chạy api createSpu()
    const newSpu = await createSpu({
      product_name: "bbb ",
      isPublished: false,
      product_thumb: "{ type: String, required: true }",
      product_description: "String",
      product_price: 10000,
      product_quantity: 15,
      product_brand: "663fc259d1665c7e45e8401c",
      product_category: [
        "663f9d30220d580c7b4cbc9e",
        "663f9e62220d580c7b4cbca8",
        "663f9e9c220d580c7b4cbcaa",
      ],
      product_attributes: [
        {
          attribute_id: "663f6b4a6e6cc6596ecc0161",
          attribute_value: [
            {
              value_id: "663f6b4a6e6cc6596ecc0164",
            },
          ],
        },
        {
          attribute_id: "663f53a1855e11df5b6b0696",
          attribute_value: [
            {
              value_id: "663f53a1855e11df5b6b069a",
            },
          ],
        },
      ],
      product_variations: [
        {
          images: [],
          name: "color",
          options: ["Blue", "Red"],
        },
        {
          images: [],
          name: "size",
          options: ["S", "M", "L"],
        },
      ],
      sku_list: [
        {
          thumb_url: "000",
          public_id: "234",
          sku_tier_idx: [0, 0],
          sku_price: 100000,
          sku_stock: 10,
        },
        {
          thumb_url: "01",
          public_id: "234",
          sku_tier_idx: [0, 1],
          sku_price: 110000,
          sku_stock: 1,
        },
        {
          thumb_url: "02",
          public_id: "234",
          sku_tier_idx: [0, 2],
          sku_price: 120000,
          sku_stock: 2,
        },
        {
          thumb_url: "asd",
          public_id: "234",
          sku_tier_idx: [1, 0],
          sku_price: 100000,
          sku_stock: 10,
        },
        {
          thumb_url: "11",
          public_id: "11",
          sku_tier_idx: [1, 1],
          sku_price: 100000,
          sku_stock: 11,
        },
        {
          thumb_url: "12",
          public_id: "12",
          sku_tier_idx: [1, 2],
          sku_price: 100000,
          sku_stock: 12,
        },
      ],
    });
    console.log(list_url_thumb);
    toast.info("Product saved successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="product_name">
              Tên sản phẩm
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.product_name,
              })}
              id="product_name"
              value={productName}
              defaultValue={defaultValues.product_name}
              placeholder="VD: Iphone 14 pro max, Kanken bag 15',..."
              {...register("product_name", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="product_description">
              Mô tả sản phẩm
            </label>
            <textarea
              className={classNames(
                `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                { "field-input--error": errors.product_description }
              )}
              id="product_description"
              value={productDescription}
              placeholder="Nhập mô tả sản phẩm"
              defaultValue={defaultValues.product_description}
              {...register("product_description", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="product_brand">
                Hãng
              </label>
              <Controller
                name="product_brand"
                control={control}
                defaultValue={defaultValues.product_brand}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.product_brand}
                    id="product_brand"
                    placeholder="Chọn hãng"
                    options={[
                      { value: null, label: "Không rõ" },
                      ...categories,
                    ]}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="product_category">
                Danh mục
              </label>
              <Controller
                name="product_category"
                control={control}
                defaultValue={defaultValues.product_category}
                rules={{ required: true }}
                render={({ field }) => (
                  <MultipleSelect
                    isInvalid={errors.product_category}
                    id="product_category"
                    isSearchable={true}
                    placeholder="Chọn danh mục"
                    options={categories}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      handleCategoriesSelected(value);
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="weight">
                Cân nặng
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
                Đơn vị
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
              <label className="field-label" htmlFor="product_price">
                Giá thông thường
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.product_price,
                })}
                id="product_price"
                defaultValue={defaultValues.product_price}
                value={productPrice}
                placeholder="$99.99"
                {...register("product_price", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="product_quantity">
                Số lượng kho
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.product_quantity,
                })}
                id="product_quantity"
                defaultValue={defaultValues.product_quantity}
                disabled={isVariation}
                value={quantity}
                placeholder="0"
                {...register("salePrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
          </div>
          <Divider />
          <h4 className="text-center">Phân loại sản phẩm</h4>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <button
              onClick={handleToggleIsVariation}
              id="variationBtn"
              className={` ${
                isVariation === false ? "btn--social btn block" : "hidden"
              }`}
            >
              <i className={`icon icon-circle-plus-regular`} />
              <span>Bật phân loại</span>
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
                      <h5>Nhóm phân loại {item.id}</h5>
                      {index !== 0 ? (
                        <button
                          onClick={() => removeVariation(item.id)}
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
                          <span className="field-label">
                            Tên nhóm phân loại
                          </span>
                          <input
                            className={"field-input"}
                            onChange={(e) =>
                              handleVariationChange(e, e.target.value, item.id)
                            }
                            type={item.type}
                            value={item.variationName}
                            placeholder="Eg. Size, Color, etc."
                          />
                        </div>
                        <div className="field-wrapper">
                          <span className="field-label">Phân loại</span>
                          {item.options.map((subitem, index) => {
                            return (
                              <div
                                className="flex space-x-3 items-center"
                                key={index}
                              >
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
                                      removeVariationOption(subitem.id, item.id)
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
                        onClick={() => addVariationOption(item.id)}
                        className={`btn--social btn`}
                      >
                        <i className={`icon icon-circle-plus-regular`} />
                        <span>Thêm phân loại</span>
                      </button>
                    </div>
                  </Spring>
                );
              })}
              {variations.length < 2 ? (
                <button onClick={addNewVariation} className={`btn--social btn`}>
                  <i className={`icon icon-circle-plus-regular`} />
                  <span>Thêm nhóm phân loại {variations.length + 1}</span>
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
                  rowKey={(record) => record.sku_tier_idx}
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
              Lưu lại thay đổi
            </button>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default ProductEditing;
