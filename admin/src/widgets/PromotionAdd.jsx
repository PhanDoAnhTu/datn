// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";
import img4 from "@assets/products/services/1.webp";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import RangeDatePicker from "@ui/RangeDatePicker";
import MultipleSelect from "@ui/MultipleSelect";
import DropFiles from "@components/DropFiles";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import { useEffect, useState } from "react";
import skus_manangement from "@db/skus_manangement";
import products_management from "@db/products_management";
import { Switch } from "antd";
import { capitalize } from "@mui/material";

const PromotionAdd = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const firstLoadProducts = products_management.map((item) => ({
      value: item._id,
      label: item.product_name,
    }));
    setProducts(firstLoadProducts);
  }, []);
  const defaultValues = {
    special_offer_name: "",
    special_offer_description: "",
    special_offer_image: "",
    special_offer_start_date: "",
    special_offer_end_date: "",
    special_offer_is_active: false,
    special_offer_spu_list: [],
    selected_products: [],
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: defaultValues,
  });

  const startDate = watch("special_offer_start_date");
  const endDate = watch("special_offer_end_date");
  //watch if product_ids has some changes
  const selected_products = watch("selected_products");
  const product_ids = watch("special_offer_spu_list");

  useEffect(() => {
    const fetchSKU = selected_products.map((item) => {
      const productInfo = products_management.find(
        (product) => product._id === item.value
      );

      const updatedSKU = skus_manangement
        .filter((sku) => sku.product_id === item.value)
        .map((foundSKU) => {
          const option1 =
            productInfo.product_variations[0].options[foundSKU.sku_tier_idx[0]];
          const option2 =
            productInfo.product_variations[1].options[foundSKU.sku_tier_idx[1]];

          return {
            sku_id: foundSKU._id,
            sku_name: capitalize(option1) + ", " + capitalize(option2),
            sku_tier_idx: foundSKU.sku_tier_idx,
            original_price: foundSKU.sku_price,
            sku_stock: foundSKU.sku_stock,
            price_sale: foundSKU.sku_price,
            percentage: 0,
            quantity: 0,
            quantity_sold: 0,
            is_active: false,
          };
        });

      return {
        product_id: productInfo._id,
        product_name: productInfo.product_name,
        product_image: productInfo.product_thumb,
        sku_list: updatedSKU,
      };
    });

    setValue("special_offer_spu_list", fetchSKU);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_products]);

  const removeProductFromList = (e, index) => {
    e.preventDefault();
    setValue(
      "selected_products",
      selected_products.length === 1 ? [] : selected_products.splice(index, 1)
    );
  };

  const handleChangeSpuData = (e, productID, SKU_ID, name) => {
    e.preventDefault();
    const productIndex = product_ids.findIndex(
      (item) => item.product_id === productID
    );
    const skuIndex = product_ids[productIndex].sku_list.findIndex(
      (item) => item.sku_id === SKU_ID
    );
    const updatedProducts = product_ids.slice();

    if (name === "price_sale") {
      updatedProducts[productIndex].sku_list[skuIndex].price_sale = parseInt(
        e.target.value
      )
        ? parseInt(e.target.value)
        : "";
      updatedProducts[productIndex].sku_list[skuIndex].percentage = parseInt(
        e.target.value
      )
        ? ((updatedProducts[productIndex].sku_list[skuIndex].original_price -
            parseInt(e.target.value)) /
            updatedProducts[productIndex].sku_list[skuIndex].original_price) *
          100
        : "";
    }

    if (name === "percentage") {
      updatedProducts[productIndex].sku_list[skuIndex].percentage = parseInt(
        e.target.value
      )
        ? parseInt(e.target.value)
        : "";
      updatedProducts[productIndex].sku_list[skuIndex].price_sale = parseInt(
        e.target.value
      )
        ? updatedProducts[productIndex].sku_list[skuIndex].original_price -
          updatedProducts[productIndex].sku_list[skuIndex].original_price *
            (parseInt(e.target.value) / 100)
        : "";
    }
    if (name === "quantity") {
      updatedProducts[productIndex].sku_list[skuIndex].quantity = parseInt(
        e.target.value
      )
        ? parseInt(e.target.value)
        : "";
      if (
        updatedProducts[productIndex].sku_list[skuIndex].quantity >
        updatedProducts[productIndex].sku_list[skuIndex].sku_stock
      ) {
        updatedProducts[productIndex].sku_list[skuIndex].quantity =
          updatedProducts[productIndex].sku_list[skuIndex].sku_stock;
      }
    }
    if (name === "is_active") {
      updatedProducts[productIndex].sku_list[skuIndex].is_active = e;
    }
    setValue("special_offer_spu_list", updatedProducts);
  };

  const handleToggleActive = (productID, SKU_ID) => {
    const productIndex = product_ids.findIndex(
      (item) => item.product_id === productID
    );
    const skuIndex = product_ids[productIndex].sku_list.findIndex(
      (item) => item.sku_id === SKU_ID
    );
    const updatedProducts = product_ids.slice();

    updatedProducts[productIndex].sku_list[skuIndex].is_active =
      !updatedProducts[productIndex].sku_list[skuIndex].is_active;
    setValue("special_offer_spu_list", updatedProducts);
  };

  useEffect(() => {
    console.log(product_ids);
  }, [product_ids]);

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">Promotion Banner</span>
              <div className="grid grid-cols-1 gap-5">
                <Controller
                  name="special_offer_image"
                  control={control}
                  defaultValue={defaultValues.special_offer_image}
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone 2xl:col-span-2 aspect-w-3 aspect-h-1"
                      onChange={(files) => field.onChange(files)}
                      defaultValue={defaultValues.special_offer_image}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="special_offer_name">
                Tên chương trình
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.special_offer_name,
                })}
                id="special_offer_name"
                defaultValue={defaultValues.special_offer_name}
                placeholder="VD: ct1, ct2, tenct,..."
                {...register("special_offer_name", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="special_offer_start_date">
                Ngày bắt đầu - Ngày kết thúc
              </label>
              <Controller
                name="special_offer_start_date"
                control={control}
                rules={{ required: true }}
                defaultValue={[
                  defaultValues.special_offer_start_date,
                  defaultValues.special_offer_end_date,
                ]}
                render={({ field }) => (
                  <RangeDatePicker
                    id="special_offer_start_date"
                    innerRef={field.ref}
                    disableFuture={false}
                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                    value={[startDate, endDate]}
                    onChange={(value) => {
                      setValue("special_offer_start_date", value[0]);
                      setValue("special_offer_end_date", value[1]);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="special_offer_description">
              Mô tả mã giảm giá
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.special_offer_description,
              })}
              id="special_offer_description"
              defaultValue={defaultValues.special_offer_description}
              placeholder="VD: Giảm 30%, Giảm 10K cho đơn hàng từ XXK,..."
              {...register("special_offer_description", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="selected_products">
              Sản phẩm áp dụng
            </label>
            <Controller
              name="selected_products"
              control={control}
              defaultValue={defaultValues.selected_products}
              render={({ field }) => (
                <MultipleSelect
                  isInvalid={errors.selected_products}
                  isSearchable={true}
                  value={field.value}
                  options={products}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          {product_ids.map((item, index) => (
            <Spring key={index} className="card flex-1 xl:py-10">
              <div className="grid grid-cols-1 gap-y-4 gap-x-2">
                <div className="flex max-sm:flex-col relative overflow-hidden max-sm:justify-center sm:items-center sm:space-x-5">
                  <div className="img-wrapper w-12 h-12 overflow-hidden max-md:hidden">
                    <img
                      src={item.product_thumb ? item.product_thumb : img4}
                      alt="test"
                      className="object-center object-contain w-full h-full"
                    />
                  </div>
                  <h6 className="sm:truncate text-ellipsis max-sm:!text-xs max-sm:text-center">
                    {item.product_name}
                  </h6>
                </div>
                {item.sku_list.map((subitem, subindex) => (
                  <Spring
                    key={subindex}
                    className="grid border-b-2 border-blue-600 grid-cols-1 py-4 gap-y-4 gap-x-2"
                  >
                    <div className="flex sm:space-x-3 max-sm:flex-col sm:items-center">
                      <div className="max-sm:!text-xs inline-block h6">
                        Phân loại: {subitem.sku_name}
                      </div>
                      <div className="max-sm:!text-xs inline-block h6 max-sm:hidden">
                        |
                      </div>
                      <div className="max-sm:!text-xs inline-block h6">
                        Giá gốc: {subitem.original_price}đ
                      </div>
                      <div className="max-sm:!text-xs inline-block h6 max-sm:hidden">
                        |
                      </div>
                      <div className="max-sm:!text-xs inline-block h6">
                        Kho hàng: {subitem.sku_stock}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-11 gap-y-4 gap-x-2">
                      <div className="field-wrapper sm:col-span-5">
                        <label
                          className="field-label"
                          htmlFor={`price-sale-${subitem.sku_id}`}
                        >
                          Giá sau giảm (đ)
                        </label>
                        <input
                          className={"field-input"}
                          id={`price-sale-${subitem.sku_id}`}
                          value={subitem.price_sale}
                          onChange={(e) =>
                            handleChangeSpuData(
                              e,
                              item.product_id,
                              subitem.sku_id,
                              "price_sale"
                            )
                          }
                          placeholder="VD: 100000, 200000, 300000,..."
                        />
                      </div>
                      <div className="sm:col-span-1 flex sm:flex-col justify-center sm:justify-end items-center sm:space-y-2 max-sm:space-x-3">
                        <i className="icon icon-chevron-down-regular text-[20px] sm:hidden" />
                        <i className="icon icon-chevron-up-regular text-[20px] sm:hidden" />
                        <i className="icon icon-chevron-left-regular text-[20px] max-sm:hidden" />
                        <i className="icon icon-chevron-right-regular text-[20px] max-sm:hidden" />
                      </div>
                      <div className="field-wrapper sm:col-span-5">
                        <label
                          className="field-label"
                          htmlFor={`percentage-${subitem.sku_id}`}
                        >
                          Giá giảm (%)
                        </label>
                        <input
                          className={"field-input"}
                          id={`percentage-${subitem.sku_id}`}
                          value={subitem.percentage}
                          onChange={(e) =>
                            handleChangeSpuData(
                              e,
                              item.product_id,
                              subitem.sku_id,
                              "percentage"
                            )
                          }
                          placeholder="VD: 5%, 10%, 15%,..."
                        />
                      </div>
                    </div>
                    <div className="field-wrapper">
                      <label
                        className="field-label"
                        htmlFor={`quantity-${subitem.sku_id}`}
                      >
                        Sô lượng khuyến mãi
                      </label>
                      <input
                        className={"field-input"}
                        id={`quantity-${subitem.sku_id}`}
                        value={subitem.quantity}
                        onChange={(e) =>
                          handleChangeSpuData(
                            e,
                            item.product_id,
                            subitem.sku_id,
                            "quantity"
                          )
                        }
                        placeholder="VD: 0 = không giới hạn, 5, 10, 20 , 30,..."
                      />
                    </div>
                    <div className="flex justify-end items-center space-x-3">
                      <label
                        className="field-label"
                        htmlFor={`is-active-${subitem.sku_id}`}
                      >
                        Bật/Tắt
                      </label>
                      <Switch
                        checkedChildren={"ON"}
                        unCheckedChildren={"OFF"}
                        id={`is-active-${subitem.sku_id}`}
                        onClick={(e) =>
                          handleToggleActive(item.product_id, subitem.sku_id)
                        }
                        loading={false}
                        checked={subitem.is_active}
                      />
                    </div>
                  </Spring>
                ))}
                <button
                  onClick={(e) => removeProductFromList(e, index)}
                  className="group btn btn--social red"
                >
                  <i className="icon icon-trash-regular text-lg" />
                </button>
              </div>
            </Spring>
          ))}
        </div>

        <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
          <button
            className="btn btn--primary"
            onClick={handleSubmit(handlePublish)}
          >
            Tạo chương trình
          </button>
        </div>
      </form>
    </Spring>
  );
};

export default PromotionAdd;
