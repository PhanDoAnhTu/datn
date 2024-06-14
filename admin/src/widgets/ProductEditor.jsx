// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import DropFiles from "@components/DropFiles";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import {
  createSpu,
  upLoadImageArray,
  upLoadProductImageList,
  findAllCategory,
  findAllAttribute,
  findAllBrand,
} from "../store/actions";
// hooks
import { useForm, Controller } from "react-hook-form";

// constants
// import { UNITS_OPTIONS } from "@constants/options";

// utils
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Divider, Empty } from "antd";
import StyledTable from "./productEditorStyle";
import { capitalize } from "@mui/material";
import { useDispatch } from "react-redux";
// import categories_management from "@db/categories_management";
import MultipleSelect from "@ui/MultipleSelect";

const ProductEditor = () => {
  const dispact = useDispatch();
  const [attributes_management, setAttributes_management] = useState([]);
  const [categories_management, seCategories_management] = useState([]);
  const [brand_management, setBrand_management] = useState([]);
  const [brand_options, setBrand_options] = useState([]);

  const fetchCategoriesOnloadPage = async () => {
    const repoCat = await dispact(findAllCategory({ isPublished: true }));
    console.log("repoCat", repoCat);
    seCategories_management(repoCat?.payload?.metaData);
  };
  const fetchBrandOnloadPage = async () => {
    const repoBrand = await dispact(findAllBrand({ isPublished: true }));
    console.log("repoBrand", repoBrand);
    setBrand_management(repoBrand?.payload?.metaData);
  };
  const fetchAttributeOnloadPage = async () => {
    const repoAttribute = await dispact(
      findAllAttribute({ isPublished: true })
    );
    console.log("repoAttribute", repoAttribute);
    setAttributes_management(repoAttribute?.payload?.metaData);
  };

  useEffect(() => {
    setBrand_options(
      brand_management.map((brand) => {
        return { label: brand.brand_name, value: brand._id };
      })
    );
  }, [brand_management]);

  console.log("brand_options", brand_management);

  useEffect(() => {
    fetchCategoriesOnloadPage();
    fetchBrandOnloadPage();
    fetchAttributeOnloadPage();
  }, []);

  //-----DECLARE DEFAULT VALUES
  const defaultValues = {
    weight: 0.1,
    description: "",
    productName: "",
    brandName: "",
    product_category: [],
    regularPrice: 0,
    product_quantity: 1,
    unit: "",
    product_attributes: [],
  };
  console.log("defaultValues", defaultValues);
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
      ?.filter((item) => item.parent_id === null)
      .map((item) => ({
        value: item._id,
        label: item.category_name,
      }));

    setCategories(topLevelCategories);
  }, [categories_management]);

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
  const quantity = watch("product_quantity");

  //---------------------------CATEGORIES----------------------------//

  useEffect(() => {
    if (categoriesWatch.length === 0) {
      const updatedCategories = categories_management
        ?.filter((item) => item.parent_id === null)
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
      (category) => category.parent_id === selectedValue
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
          return optionIndex; // Get the ID of the selected option
        });

        newSKUList.push({
          sku_tier_idx,
          sku_price: "",
          sku_stock: "",
          image: null, // Increment product_quantity for demonstration
        });
        newSKUList.sort((a, b) => (a.sku_tier_idx > b.sku_tier_idx ? 1 : -1));
      }
      setSKUList(newSKUList);
      console.log(newSKUList);
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
                    ? variations.find((item1) => item1.id === item.id).options[
                        sku_tier_idx[0]
                      ]?.value
                    : variations.find((item1) => item1.id === item.id).options[
                        sku_tier_idx[1]
                      ]?.value}
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
                    ? variations.find((item1) => item1.id === item.id).options[
                        sku_tier_idx[0]
                      ].value
                    : variations.find((item1) => item1.id === item.id).options[
                        sku_tier_idx[1]
                      ].value}
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
    const changeQty = setStock();
    setValue("product_quantity", changeQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sKUList]);

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  // do something with the data
  console.log(sKUList, "variations");

  const handleSave = async (data) => {
    try {
      console.log("data", data);

      let product_variations = [];
      variations.forEach((variation) => {
        product_variations.push({
          images: [],
          name: variation.variationName,
          options: variation.options.map((option) => option.value),
        });
      });

      console.log("product_variations", product_variations);
      const attributes_input = attributes_management.map((item) => {
        if (Object.hasOwn(data, item.attribute_slug) === true) {
          return {
            attribute_id: data[item.attribute_slug].attribute_id,
            attribute_value: { value: data[item.attribute_slug].value },
          };
        }
      });

      let list_images_product = {
        url_thumb: [],
        convert_sku_list: [],
      };

      if (sKUList.length > 1) {
        const list_image = new FormData();
        sKUList.forEach((item) => {
          if (item.image != null) {
            list_image.append("files", item.image[0]);
            list_image.append("sku_list", item.sku_tier_idx);
          }
        });
        list_image.append("folderName", "outrunner/products");
        const list_url_thumb = await dispact(
          upLoadProductImageList(list_image)
        );
        list_images_product.convert_sku_list =
          list_url_thumb &&
          (await sKUList?.map((sku) => {
            const skuImageFound = list_url_thumb?.payload?.metaData?.find(
              (url_thumb) =>
                sku.sku_tier_idx.toString() === url_thumb.sku_tier_idx
            );
            if (skuImageFound) {
              const { image, ...skuNoImage } = sku;
              return {
                ...skuNoImage,
                thumb_url: skuImageFound?.thumb_url,
                public_id: skuImageFound?.public_id,
              };
            } else {
              const { image, ...skuNoImage } = sku;
              return { ...skuNoImage, thumb_url: null, public_id: null };
            }
          }));
      }

      if (product_images.length > 0) {
        const image_array = new FormData();
        product_images
          .sort((a, b) => a.indexNumber - b.indexNumber)
          .forEach((item) => {
            if (item.file) {
              image_array.append("files", item.file[0]);
            }
          });
        image_array.append("folderName", "outrunner/products");

        const uploadImage = await dispact(upLoadImageArray(image_array));
        list_images_product.url_thumb =
          uploadImage && uploadImage?.payload.metaData;
      }
      console.log(
        "crateSpuuuuuuuuuuuuuuuuuuu",
        attributes_input,
        list_images_product,
        product_variations
      );

      await dispact(
        createSpu({
          product_name: data.productName,
          isPublished: false,
          isDraft: true,
          product_thumb:
            list_images_product?.url_thumb?.length > 0
              ? list_images_product.url_thumb
              : [],
          product_description: data.description,
          product_price: data.regularPrice,
          product_quantity: data.product_quantity,
          product_unit: data.unit,
          product_weight: data.weight,
          product_brand: data.brandName.value,
          product_category: data.product_category.flatMap(
            (category) => category.value
          ),
          product_attributes: attributes_input,
          product_variations: product_variations,
          sku_list: list_images_product?.convert_sku_list
            ? list_images_product?.convert_sku_list
            : [],
        })
      );
      toast.info("Product saved successfully");
    } catch (error) {
      toast.error(error);
    }
  };
  const [product_images, set_product_images] = useState([]);
  const addProductImage = (value, indexNumber) => {
    if (product_images.length === 0) {
      set_product_images([{ file: value, indexNumber: indexNumber }]);
    } else {
      set_product_images((s) => {
        if (s.some((item) => item.indexNumber === indexNumber) === true) {
          return s.map((image) => {
            if (image.indexNumber === indexNumber) {
              image.file = value;
              return image;
            }
            return image;
          });
        }
        return [...s, { file: value, indexNumber: indexNumber }];
      });
    }
  };
  console.log(
    "product_images",
    product_images.sort((a, b) => a.indexNumber - b.indexNumber)
  );
  return (
    <Spring className="card flex-1 xl:py-10">
      <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5 h-80">
            <DropFiles
              wrapperClass="media-dropzone w-full h-full text-center"
              onChange={(e) => addProductImage(e, 1)}
            >
              <MediaDropPlaceholder />
            </DropFiles>
            <DropFiles
              wrapperClass="media-dropzone w-full h-full text-center"
              onChange={(e) => addProductImage(e, 2)}
            >
              <MediaDropPlaceholder />
            </DropFiles>
            <DropFiles
              wrapperClass="media-dropzone w-full h-full text-center"
              onChange={(e) => addProductImage(e, 3)}
            >
              <MediaDropPlaceholder />
            </DropFiles>
            <DropFiles
              wrapperClass="media-dropzone w-full h-full text-center"
              onChange={(e) => addProductImage(e, 4)}
            >
              <MediaDropPlaceholder />
            </DropFiles>
          </div>
          <div className="field-wrapper">
            <label className="field-label " htmlFor="productName">
              Tên sản phẩm
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.productName,
              })}
              id="productName"
              defaultValue={defaultValues.productName}
              placeholder="VD: Iphone 14 pro max, Kanken bag 15',..."
              {...register("productName", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="description">
              Mô tả sản phẩm
            </label>
            <textarea
              className={classNames(
                `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                { "field-input--error": errors.description }
              )}
              id="description"
              placeholder="Nhập mô tả sản phẩm"
              defaultValue={defaultValues.description}
              {...register("description", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="brandName">
                Thương hiệu
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
                    placeholder="Chọn thương hiệu"
                    options={brand_options}
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
                Cân nặng (kg)
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.weight,
                })}
                id="weight"
                defaultValue={defaultValues.weight}
                placeholder="Cân nặng sản phẩm (kg)"
                {...register("weight", {
                  required: true,
                  pattern: /^\d+(\.\d{1,2})?$/,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="weight">
                Đơn vị
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.unit,
                })}
                id="unit"
                defaultValue={defaultValues.unit}
                placeholder="Đơn vị sản phẩm"
                {...register("unit", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="regularPrice">
                Giá thông thường
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.regularPrice,
                })}
                id="regularPrice"
                defaultValue={defaultValues.regularPrice}
                placeholder="100000, 200000,..."
                {...register("regularPrice", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="product_quantity">
                Số lượng nhập
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.product_quantity,
                })}
                id="product_quantity"
                defaultValue={defaultValues.product_quantity}
                disabled={isVariation}
                value={quantity}
                placeholder="nhập số lượng sản phẩm"
                {...register("product_quantity", {
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            {attributes_management.length > 0 &&
              attributes_management.map((attribute, index) => {
                const value_attribute_options = attribute.attribute_value.map(
                  (value_attribute) => {
                    return {
                      label: value_attribute.attribute_value,
                      value: value_attribute._id,
                      attribute_id: value_attribute.attribute_id,
                    };
                  }
                );
                return (
                  <div className="field-wrapper" key={index}>
                    <label
                      className="field-label"
                      htmlFor={attribute.attribute_slug}
                    >
                      {attribute.attribute_name}
                    </label>
                    <Controller
                      name={attribute.attribute_slug}
                      control={control}
                      defaultValue={defaultValues.product_attributes}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          isInvalid={errors.brandName}
                          id={attribute.attribute_slug}
                          placeholder={`Chọn ${attribute.attribute_name}`}
                          options={value_attribute_options}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                  </div>
                );
              })}
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
              Lưu thành bản nháp
            </button>
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Xuất bản
            </button>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default ProductEditor;
