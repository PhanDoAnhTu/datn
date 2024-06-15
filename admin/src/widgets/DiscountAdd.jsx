// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { Controller, useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import Select from "@ui/Select";
import RangeDatePicker from "@ui/RangeDatePicker";
import MultipleSelect from "@ui/MultipleSelect";
import { useEffect, useState } from "react";
import { onAddDiscount, onAllProductsOption } from "../store/actions";
import { useDispatch } from "react-redux";

const DiscountAdd = ({ item }) => {


  const defaultValues = {
    discount_name: "",
    discount_description: "",
    discount_type: "",
    discount_max_value: 0,
    discount_code: "",
    discount_start_date: "",
    discount_end_date: "",
    discount_max_uses: 0,
    discount_value: 0,
    discount_min_order_qty: 0,
    discount_max_person_uses: 0,
    discount_max_user_uses: 0,
    discount_min_order_value: 0,
    discount_is_active: { label: "Chỉ tạo mã", value: false },
    discount_applies_to: { label: "Tất cả sản phẩm", value: "all" },
    discount_product_ids: [],
  };
  const dispatch = useDispatch()
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

  const startDate = watch("discount_start_date");
  const endDate = watch("discount_end_date");
  const applyTo = watch("discount_applies_to");

  // const product_ids = watch("discount_product_ids");

  useEffect(() => {
    const onChangeApplyTo = () => {
      if (applyTo.value === "all") {
        setValue("discount_product_ids", []);
      } else {
        fetchProductOptions()
      }
    };
    onChangeApplyTo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyTo]);

  const [productOptions, setProductOptions] = useState([])

  const fetchProductOptions = async () => {
    const reposProd = await dispatch(onAllProductsOption({ isPublished: true }))
    reposProd && setProductOptions(reposProd?.payload?.metaData?.map((prod) => { return { label: prod.product_name, value: prod._id } }))
  }

  // do something with the data
  const handlePublish = async (data) => {

    let discountInputData = {
      discount_name: data.discount_name,
      discount_description: data.discount_description,
      discount_type: data.discount_type?.value,
      discount_max_value: data.discount_max_value,
      discount_code: data.discount_code,
      discount_start_date: `${data.discount_start_date.$y}-${data.discount_start_date.$M}-${data.discount_start_date.$D} 00:00:00`,
      discount_end_date: `${data.discount_end_date.$y}-${data.discount_end_date.$M}-${data.discount_end_date.$D} 00:00:00`,
      discount_max_uses: data.discount_max_uses,
      discount_value: data.discount_value,
      discount_min_order_qty: data.discount_min_order_qty,
      discount_max_person_uses: data.discount_max_person_uses,
      discount_max_user_uses: data.discount_max_user_uses,
      discount_min_order_value: data.discount_max_user_uses,
      discount_is_active: data.discount_is_active?.value,
      discount_applies_to: data.discount_applies_to?.value,
      discount_product_ids: data.discount_product_ids.flatMap((product) => product.value)
    }
    try {
      const addDiscount = await dispatch(onAddDiscount({
        discount_name: discountInputData.discount_name,
        discount_description: discountInputData.discount_description,
        discount_type: discountInputData.discount_type,
        discount_max_value: discountInputData.discount_max_value,
        discount_code: discountInputData.discount_code,
        discount_start_date: discountInputData.discount_start_date,
        discount_end_date: discountInputData.discount_end_date,
        discount_max_uses: discountInputData.discount_max_uses,
        discount_value: discountInputData.discount_value,
        discount_min_order_qty: discountInputData.discount_min_order_qty,
        discount_max_person_uses: discountInputData.discount_max_person_uses,
        discount_max_user_uses: discountInputData.discount_max_user_uses,
        discount_min_order_value: discountInputData.discount_max_user_uses,
        discount_is_active: discountInputData.discount_is_active,
        discount_applies_to: discountInputData.discount_applies_to,
        discount_product_ids: discountInputData.discount_product_ids
      }))
      if (addDiscount.payload.status === (200 || 201)) {
        toast.success(`Thêm mã giảm giá thành công`);
      } else {
        toast.error("Thêm mã giảm giá không thành công");

      }
      console.log("discountInputData", discountInputData)
    } catch (error) {
      toast.error("Thêm mã giảm giá không thành công");

    }

  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <form className="grid grid-cols-1 items-start gap-5 xl:gap-10">
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_name">
              Tên mã giảm giá
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.discount_name,
              })}
              id="discount_name"
              defaultValue={defaultValues.discount_name}
              placeholder="VD: Km1, km2, tenkm,..."
              {...register("discount_name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_type">
                  Chọn loại giảm giá
                </label>
                <Controller
                  name="discount_type"
                  control={control}
                  defaultValue={defaultValues.discount_type}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      isInvalid={errors.discount_type}
                      id="discount_type"
                      placeholder=" Giảm theo"
                      options={[
                        { label: "Phẩn trăm", value: "percentage" },
                        { label: "Giá trị cố định", value: "fixed_amount" },
                      ]}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_value">
                  Giá trị theo loại giảm giá
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_value,
                  })}
                  id="discount_value"
                  defaultValue={defaultValues.discount_value}
                  placeholder="Nhập giá trị theo loại giảm giá"
                  {...register("discount_value", {
                    required: true,
                    pattern: /^[0-9]*$/,

                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_start_date">
                  Ngày bắt đầu - Ngày kết thúc
                </label>
                <Controller
                  name="discount_start_date"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={[
                    defaultValues.discount_start_date,
                    defaultValues.discount_end_date,
                  ]}
                  render={({ field }) => (
                    <RangeDatePicker
                      id="discount_start_date"
                      innerRef={field.ref}
                      disableFuture={false}
                      placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                      value={[startDate, endDate]}
                      onChange={(value) => {
                        setValue("discount_start_date", value[0]);
                        setValue("discount_end_date", value[1]);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_code">
                  Mã giảm giá
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_code,
                  })}
                  id="discount_code"
                  defaultValue={defaultValues.discount_code}
                  placeholder="VD: XXXXX13, SM4V6D, R4K3RVD,..."
                  {...register("discount_code", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_max_value">
                  Giảm giá tối đa
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_max_value,
                  })}
                  id="discount_max_value"
                  type="number"
                  defaultValue={defaultValues.discount_max_value}
                  placeholder="Enter title name"
                  {...register("discount_max_value", {
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                />
              </div>
            </div>

            <div className="field-wrapper">
              <label className="field-label" htmlFor="discount_max_uses">
                Số lượng mã giảm giá
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.discount_max_uses,
                })}
                id="discount_max_uses"
                type="number"
                defaultValue={defaultValues.discount_max_uses}
                placeholder="Nhập số lượng mã giảm giá"
                {...register("discount_max_uses", {
                  required: true,
                  pattern: /^[0-9]*$/
                })}
              />
            </div>
          </div>

          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_description">
              Mô tả mã giảm giá
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.discount_description,
              })}
              id="discount_description"
              defaultValue={defaultValues.discount_description}
              placeholder="VD: Giảm 30%, Giảm 10K cho đơn hàng từ XXK,..."
              {...register("discount_description", { required: true })}
            />
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">

              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_max_user_uses">
                  Số người dùng tối đa
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_max_user_uses,
                  })}
                  id="discount_max_user_uses"
                  type="number"
                  defaultValue={defaultValues.discount_max_user_uses}
                  placeholder="Nhập số lần sử dụng mã giảm giá này trên mỗi người dùng"
                  {...register("discount_max_user_uses", { required: true, pattern: /^[0-9]*$/ })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_max_person_uses">
                  Số lần sử dụng mã giảm giá / người dùng
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_max_person_uses,
                  })}
                  type="number"
                  id="discount_max_person_uses"
                  defaultValue={defaultValues.discount_max_person_uses}
                  placeholder="Nhập số lần sử dụng mã giảm giá này trên mỗi người dùng"
                  {...register("discount_max_person_uses", { required: true, pattern: /^[0-9]*$/ })}
                />
              </div>

            </div>

            <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">

              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_min_order_value">
                  Giá trị đơn hàng tối thiểu
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_min_order_value,
                  })}
                  type="number"
                  id="discount_min_order_value"
                  defaultValue={defaultValues.discount_min_order_value}
                  placeholder="Giá trị đơn hàng tối thiểu mà mã giảm giá có thể sử dụng"
                  {...register("discount_min_order_value", { required: true, pattern: /^[0-9]*$/, })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_min_order_qty">
                  Áp dụng cho khách hàng có số hóa đơn đã mua tối thiểu
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_min_order_qty,
                  })}
                  type="number"
                  id="discount_min_order_qty"
                  defaultValue={defaultValues.discount_min_order_qty}
                  placeholder="Giá trị đơn hàng tối thiểu mà mã giảm giá có thể sử dụng"
                  {...register("discount_min_order_qty", { required: true, pattern: /^[0-9]*$/ })}
                />
              </div>
            </div>
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_is_active">
              Trạng thái sau khi tạo
            </label>
            <Controller
              name="discount_is_active"
              control={control}
              defaultValue={defaultValues.discount_is_active}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isInvalid={errors.discount_is_active}
                  id="discount_is_active"
                  options={[
                    { label: "Áp dụng ngay", value: true },
                    { label: "Chỉ tạo mã", value: false },
                  ]}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_applies_to">
              Áp dụng với
            </label>
            <Controller
              name="discount_applies_to"
              control={control}
              defaultValue={defaultValues.discount_applies_to}
              rules={{ required: true }}

              render={({ field }) => (
                <Select

                  isInvalid={errors.discount_applies_to}
                  id="discount_applies_to"
                  options={[
                    { label: "Tất cả sản phẩm", value: "all" },
                    { label: "Ch sản phẩm nhất định", value: "specific" },
                  ]}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <Spring
            className={`card flex-1 xl:py-10 ${applyTo.value !== "all" ? "" : "hidden"
              }`}
          >
            <div className="field-wrapper">
              <Controller
                name="discount_product_ids"
                control={control}
                defaultValue={defaultValues.discount_product_ids}
                render={({ field }) => (
                  <MultipleSelect
                    isInvalid={errors.discount_product_ids}
                    isSearchable={true}
                    value={field.value}
                    options={productOptions}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>
          </Spring>
        </div>

        <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
          <button
            className="btn btn--primary"
            onClick={handleSubmit(handlePublish)}
          >
            Tạo mã giảm giá
          </button>

        </div>

      </form>
    </Spring>
  );
};

export default DiscountAdd;
