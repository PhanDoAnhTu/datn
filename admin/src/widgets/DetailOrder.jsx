// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import topics_management from "@db/topics_management";
import { Empty } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ORDERDETAIL_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import orders_managements from "@db/orders_managements";
import StyledTable from "./OrdersTable/styles";

const DetailOrder = ({ item }) => {
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      content: item ? item.content : "",
      postTitle: item ? item.label : "",
      image: item ? item.image : "",
      dateAdded: item ? dayjs(item.dateAdded).format("hh:mm DD/MM/YYYY") : "",
      dateModified: item
        ? dayjs(item.dateModified).format("hh:mm DD/MM/YYYY")
        : "",
      lastModifiedBy: item ? item.lastModifiedBy : "",
      addedBy: item ? item.addedBy : "",
      topic: item
        ? topics_management.slice().find((item) => item.id === item.topicID)
        : topics_management[0],
    });
  }, [item]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // do something with the data
  const handleSave = (data) => {
    console.log(data);
    toast.success("Product saved successfully");
  };

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };
  console.log(defaultValues.image);

  return (
    <>
      <Spring className="card flex-1 xl:py-10">
        <h5 className="mb-[14px]">Thông tin giao hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="dateAdded">
                    Tên người nhận
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.dateAdded,
                    })}
                    id="dateAdded"
                    defaultValue={defaultValues.dateAdded}
                    disabled
                    {...register("dateAdded", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="dateModified">
                    Số điện thoại
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.dateModified,
                    })}
                    id="dateModified"
                    defaultValue={defaultValues.dateModified}
                    disabled
                    {...register("dateModified", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="dateAdded">
                    Email
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.addedBy,
                    })}
                    id="addedBy"
                    defaultValue={defaultValues.addedBy}
                    disabled
                    {...register("addedBy", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="dateAdded">
                    Địa chỉ
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.addedBy,
                    })}
                    id="addedBy"
                    defaultValue={defaultValues.addedBy}
                    disabled
                    {...register("addedBy", { required: true })}
                  />
                </div>
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="lastModifiedBy">
                  Ghi chú
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.lastModifiedBy,
                  })}
                  id="lastModifiedBy"
                  defaultValue={defaultValues.lastModifiedBy}
                  disabled
                  {...register("lastModifiedBy", { required: true })}
                />
              </div>
            </div>
            <div className="grid gap-2 mt-5 sm:mt-10 md:mt-11">
              <button
                className="btn btn--primary"
                onClick={handleSubmit(handlePublish)}
              >
                Xác nhận đơn hàng
              </button>
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="flex-1 xl:py-10">
        <h5 className="mb-[14px]">Thông tin đơn hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
            <StyledTable
              columns={ORDERDETAIL_MANAGEMENT_COLUMN_DEFS}
              dataSource={orders_managements[0].order_products.item_products}
              rowKey={(record) => record._id}
              locale={{
                emptyText: <Empty text="No products found" />,
              }}
              pagination={false}
            />
          </div>
        </div>
        <Spring className="card flex-1 xl:py-10">
          <div className="grid grid-cols-4 items-start gap-5 xl:gap-10">
            <div className="col-span-3"></div>
            <div className="space-y-3">
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Tạm tính:</div>
                <div className="inline-block h6">500.000VND</div>
              </div>
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Mã giảm giá:</div>
                <div className="inline-block h6">0VND</div>
              </div>
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Tổng:</div>
                <div className="inline-block h6">500.000VND</div>
              </div>
            </div>
          </div>
        </Spring>
      </Spring>
    </>
  );
};

export default DetailOrder;
