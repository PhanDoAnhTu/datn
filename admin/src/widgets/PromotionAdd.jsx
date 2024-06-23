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
// import skus_manangement from "@db/skus_manangement";
// import products_management from "@db/products_management";
import { Switch } from "antd";
import { capitalize } from "@mui/material";
import { onCreateSpecialOffer, upLoadImageSingle, onAllProductsOption } from "../store/actions";
import { useDispatch } from "react-redux";
const PromotionAdd = () => {
  const dispatch = useDispatch()
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const firstLoadProducts = products_management.map((item) => ({
  //     value: item._id,
  //     label: item.product_name,
  //   }));
  //   setProducts(firstLoadProducts);
  // }, []);

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

  /////product Options
  useEffect(() => {
    fetchProductOptions()
  }, []);

  const [productOptions, setProductOptions] = useState([])
  const [products_management, setProducts_management] = useState([])

  const fetchProductOptions = async () => {
    const reposProd = await dispatch(onAllProductsOption({ isPublished: true }))
    reposProd && setProductOptions(reposProd?.payload?.metaData?.map((prod) => { return { label: prod.product_name, value: prod._id } }))
    reposProd && setProducts_management(reposProd?.payload?.metaData)
  }
  /////product Options????

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

      const updatedSKU = productInfo?.sku_list
        ?.filter((sku) => sku.product_id === item.value)
        ?.map((foundSKU) => {

          let optionsString = ""
          productInfo.product_variations?.forEach((variation, index) => {
            if (productInfo.product_variations?.length === index + 1) {
              optionsString += `${variation?.options[foundSKU.sku_tier_idx[index]]}`
              return
            }
            optionsString += `${variation?.options[foundSKU.sku_tier_idx[index]]}, `
            return
          })
          // const option1 =
          //   productInfo.product_variations[0]?.options[foundSKU.sku_tier_idx[0]];
          // const option2 =
          //   productInfo.product_variations[1]?.options[foundSKU.sku_tier_idx[1]];

          return {
            sku_id: foundSKU._id,
            sku_name: capitalize(optionsString),
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
        product_thumb: productInfo.product_thumb,
        product_stock: productInfo.product_quantity,
        original_price: productInfo.product_price,
        is_Apply_To_ALl: false,
        price_sale: productInfo.product_price,
        percentage: 0,
        quantity: 0,
        quantity_sold: 0,
        is_active: false,
        sku_list: updatedSKU,
      };
    });

    setValue("special_offer_spu_list", fetchSKU);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_products]);


  const [isDisablePriceApplyToAll, setIsDisablePriceApplyToAll] = useState(true)

  const handleChangeSpuData = (e, productID, SKU_ID, name) => {
    e.preventDefault();

    const productIndex = product_ids?.findIndex(
      (item) => item.product_id === productID
    );
    const updatedProducts = product_ids?.slice();

    if (SKU_ID) {
      const skuIndex = product_ids[productIndex]?.sku_list?.findIndex(
        (item) => item.sku_id === SKU_ID
      );

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
    }
    if (!SKU_ID) {
      if (name === "price_sale") {

        const priceToAll = parseInt(
          e.target.value
        )
          ? parseInt(e.target.value)
          : ""
        const percentageToAll = parseInt(
          e.target.value
        )
          ? ((updatedProducts[productIndex].original_price -
            parseInt(e.target.value)) /
            updatedProducts[productIndex].original_price) *
          100
          : ""
        updatedProducts[productIndex].price_sale = priceToAll
        updatedProducts[productIndex].percentage = percentageToAll
        const sku_list = updatedProducts[productIndex]?.sku_list
        if (sku_list.length > 0) {
          for (let i = 0; i < sku_list?.length; i++) {
            updatedProducts[productIndex].sku_list[i].price_sale = priceToAll
            updatedProducts[productIndex].sku_list[i].percentage = percentageToAll
          }
        }
      }

      if (name === "percentage") {
        const priceToAll = parseInt(
          e.target.value
        )
          ? updatedProducts[productIndex].original_price -
          updatedProducts[productIndex].original_price *
          (parseInt(e.target.value) / 100)
          : ""
        const percentageToAll = parseInt(
          e.target.value
        )
          ? parseInt(e.target.value)
          : ""

        updatedProducts[productIndex].price_sale = priceToAll
        updatedProducts[productIndex].percentage = percentageToAll
        const sku_list = updatedProducts[productIndex]?.sku_list
        if (sku_list.length > 0) {
          for (let i = 0; i < sku_list?.length; i++) {
            updatedProducts[productIndex].sku_list[i].price_sale = priceToAll
            updatedProducts[productIndex].sku_list[i].percentage = percentageToAll
          }
        }
      }
      if (name === "quantity") {
        const quantityApplyToAll = parseInt(
          e.target.value
        )
          ? parseInt(e.target.value)
          : "";

        updatedProducts[productIndex].quantity = quantityApplyToAll
        if (
          updatedProducts[productIndex].quantity >
          updatedProducts[productIndex].product_stock
        ) {
          updatedProducts[productIndex].quantity =
            updatedProducts[productIndex].product_stock;

          const sku_list = updatedProducts[productIndex]?.sku_list
          if (sku_list.length > 0) {
            for (let i = 0; i < sku_list?.length; i++) {
              updatedProducts[productIndex].sku_list[i].quantity = updatedProducts[productIndex].product_stock
            }
          }
        } else {
          const sku_list = updatedProducts[productIndex]?.sku_list
          if (sku_list.length > 0) {
            for (let i = 0; i < sku_list?.length; i++) {
              updatedProducts[productIndex].sku_list[i].quantity = quantityApplyToAll
            }
          }
        }
      }
    }
    setValue("special_offer_spu_list", updatedProducts);
  };

  const handleToggleActive = (change, checked_value, productID, SKU_ID) => {
    const productIndex = product_ids?.findIndex(
      (item) => item.product_id === productID
    );
    const updatedProducts = product_ids?.slice();
    if (change === "all") {
      const sku_list = product_ids[productIndex]?.sku_list
      updatedProducts[productIndex].is_active = checked_value
      for (let i = 0; i < sku_list?.length; i++) {
        updatedProducts[productIndex].sku_list[i].is_active = checked_value
      }
    }
    if (change === "one") {
      const skuIndex = product_ids[productIndex]?.sku_list?.findIndex(
        (item) => item.sku_id === SKU_ID
      );
      updatedProducts[productIndex].sku_list[skuIndex].is_active = checked_value
    }
    if (change === "priceToAll") {
      updatedProducts[productIndex].is_Apply_To_ALl = checked_value
      setIsDisablePriceApplyToAll(!checked_value)
    }
    setValue("special_offer_spu_list", updatedProducts);
  };

  useEffect(() => {
    console.log(product_ids);
  }, [product_ids]);

  const removeProductFromList = async (e, index) => {
    e.preventDefault();
    const removeProductByIndex = await selected_products.filter((selectedProd, indexSelected) => indexSelected !== index)
    setValue("selected_products", removeProductByIndex);
  };
  // do something with the data
  const handlePublish = async (data) => {
    // console.log(data)
    const id = toast.loading("Vui lòng đợi...");
    const promotionInputData = {
      special_offer_name: data.special_offer_name,
      special_offer_description: data.special_offer_description,
      special_offer_image: "",
      special_offer_start_date: `${data.special_offer_start_date.$y}-${data.special_offer_start_date.$M + 1}-${data.special_offer_start_date.$D} 00:00:01`,
      special_offer_end_date: `${data.special_offer_end_date.$y}-${data.special_offer_end_date.$M + 1}-${data.special_offer_end_date.$D} 00:00:01`,
      special_offer_is_active: false,
      special_offer_spu_list: data.special_offer_spu_list,
    }
    console.log(promotionInputData)

    try {
      const image = new FormData()
      image.append("file", data.special_offer_image[0])
      image.append("folderName", "outrunner/images/promotion")


      const uploadImageSingle = await dispatch(upLoadImageSingle(image))
      promotionInputData.special_offer_image = uploadImageSingle && uploadImageSingle?.payload?.metaData?.thumb_url

      const createPromotion = await dispatch(onCreateSpecialOffer({
        special_offer_name: promotionInputData.special_offer_name,
        special_offer_description: promotionInputData.special_offer_description,
        special_offer_image: promotionInputData.special_offer_image,
        special_offer_start_date: promotionInputData.special_offer_start_date,
        special_offer_end_date: promotionInputData.special_offer_end_date,
        special_offer_is_active: promotionInputData.special_offer_is_active,
        special_offer_spu_list: promotionInputData.special_offer_spu_list,
      }))

      if (createPromotion.payload.status === (200 || 201)) {
        toast.update(id, {
          render: "Thêm chương trình giảm giá thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });

      } else {
        toast.update(id, {
          render: "Thêm chương trình giảm giá không thành công",
          type: "error",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(id, {
        render: "Thêm chương trình giảm giá không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      console.log(error)
    }
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div>
            <div>
              <span className="block field-label mb-2.5">Chương trình giảm giá</span>
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
                  options={productOptions}
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
                  <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-5">

                    {/* <div className="max-sm:!text-xs inline-block h6">
                        Giá gốc: {item.original_price}đ
                      </div>
        
                      <div className="max-sm:!text-xs inline-block h6">
                        Kho hàng: {item.product_stock}
                      </div> */}
                    <div className="field-wrapper">
                      <label
                        className="field-label"
                        htmlFor={`quantity-${item.quantity}`}
                      >
                        Sô lượng khuyến mãi
                      </label>
                      <input
                        disabled={isDisablePriceApplyToAll}
                        className={"field-input"}
                        id={`quantity-${item.quantity}`}
                        value={item.quantity}
                        onChange={(e) => {
                          handleChangeSpuData(
                            e,
                            item.product_id,
                            null,
                            "quantity"
                          )
                        }}
                        placeholder="VD: 0 = không giới hạn, 5, 10, 20 , 30,..."
                      />
                    </div>

                    <div className="field-wrapper">
                      <label
                        className="field-label"
                        htmlFor={`percentage-${item.product_id}`}
                      >
                        phần trăm giảm (%)
                      </label>
                      <input
                        disabled={isDisablePriceApplyToAll}
                        className={"field-input"}
                        id={`percentage-${item.product_id}`}
                        value={item.percentage}
                        onChange={(e) =>
                          handleChangeSpuData(
                            e,
                            item.product_id,
                            null,
                            "percentage"
                          )
                        }
                        placeholder="VD: 5%, 10%, 15%,..."
                      />
                    </div>
                    <div className="field-wrapper">
                      <label
                        className="field-label"
                        htmlFor={`price-sale-${item.product_id}`}
                      >
                        Giá sau giảm (đ)
                      </label>
                      <input
                        disabled={isDisablePriceApplyToAll}
                        className={"field-input"}
                        id={`price-sale-${item.product_id}`}
                        value={item.price_sale}
                        onChange={(e) => {
                          handleChangeSpuData(
                            e,
                            item.product_id,
                            null,
                            "price_sale"
                          )
                        }}
                        placeholder="VD: 100000, 200000, 300000,..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <label
                      className="field-label"
                      htmlFor={`is-active-${item.product_id}1`}
                    >
                      Áp dụng chung
                    </label>
                    <Switch
                      checkedChildren={"ON"}
                      unCheckedChildren={"OFF"}
                      id={`is-active-${item.product_id}1`}
                      onChange={(e) =>
                        handleToggleActive("priceToAll", e, item.product_id, null)
                      }
                      loading={false}
                      value={item.is_Apply_To_ALl}
                    />
                  </div>

                  <div className="flex justify-end items-center">
                    <label
                      className="field-label"
                      htmlFor={`is-active-${item.product_id}`}
                    >
                      Bật/Tắt
                    </label>
                    <Switch
                      checkedChildren={"ON"}
                      unCheckedChildren={"OFF"}
                      id={`is-active-${item.product_id}`}
                      onChange={(e) =>
                        handleToggleActive("all", e, item.product_id, null)
                      }
                      loading={false}
                      checked={item.is_active}
                    />
                  </div>

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
                          phần trăm giảm (%)
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
                          handleToggleActive("one", e, item.product_id, subitem.sku_id)
                        }
                        loading={false}
                        checked={subitem.is_active}
                      />
                    </div>
                  </Spring>
                ))
                }
                < button
                  onClick={(e) => removeProductFromList(e, index)}
                  className="group btn btn--social red"
                >
                  <i className="icon icon-trash-regular text-lg" />
                </button>
              </div>
            </Spring>
          ))
          }
        </div >

        <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
          <button
            className="btn btn--primary"
            onClick={handleSubmit(handlePublish)}
          >
            Tạo chương trình
          </button>
        </div>
      </form >
    </Spring >
  );
};

export default PromotionAdd;
