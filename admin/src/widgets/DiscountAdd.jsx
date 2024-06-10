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
import { useEffect } from "react";

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
    discount_uses_count: 0,
    discount_users_used: [],
    discount_max_person_uses: 0,
    discount_max_user_uses: 0,
    discount_min_order_value: 0,
    discount_is_active: true,
    discount_applies_to: { label: "Tất cả sản phẩm", value: "all" },
    discount_product_ids: [],
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

  const startDate = watch("discount_start_date");
  const endDate = watch("discount_end_date");
  const applyTo = watch("discount_applies_to");
  //watch if product_ids has some changes
  // eslint-disable-next-line no-unused-vars
  const product_ids = watch("discount_product_ids");

  useEffect(() => {
    const onChangeApplyTo = () => {
      if (applyTo.value === "all") {
        setValue("discount_product_ids", []);
      }
    };
    onChangeApplyTo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyTo]);

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
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
                  Loại mã giảm giá
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
                      placeholder="Chọn loại giảm giá"
                      options={[
                        { label: "Percentage", value: "percentage" },
                        { label: "Fixed amount", value: "fixed_amount" },
                      ]}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="discount_max_value">
                  Giá giảm
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.discount_max_value,
                  })}
                  id="discount_max_value"
                  defaultValue={defaultValues.discount_max_value}
                  placeholder="Enter title name"
                  {...register("discount_max_value", { required: true })}
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
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_max_uses">
              Số lượng mã giảm giá
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.discount_max_uses,
              })}
              id="discount_max_uses"
              defaultValue={defaultValues.discount_max_uses}
              placeholder="Nhập số lượng mã giảm giá"
              {...register("discount_max_uses", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_max_user_uses">
              Số lần sử dụng mã giảm giá / người dùng
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.discount_max_user_uses,
              })}
              id="discount_max_user_uses"
              defaultValue={defaultValues.discount_max_user_uses}
              placeholder="Nhập số lần sử dụng mã giảm giá này trên mỗi người dùng"
              {...register("discount_max_user_uses", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="discount_min_order_value">
              Giá trị đơn hàng tối thiểu
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.discount_min_order_value,
              })}
              id="discount_min_order_value"
              defaultValue={defaultValues.discount_min_order_value}
              placeholder="Giá trị đơn hàng tối thiểu mà mã giảm giá có thể sử dụng"
              {...register("discount_min_order_value", { required: true })}
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
                    { label: "Một vài sản phẩm nhất định", value: "specified" },
                  ]}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          <Spring
            className={`card flex-1 xl:py-10 ${
              applyTo.value !== "all" ? "" : "hidden"
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
                    options={[
                      { label: "All", value: "all" },
                      { label: "Specified Products", value: "specified" },
                      { label: "Specified Products", value: "specified1" },
                    ]}
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
