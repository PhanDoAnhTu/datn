// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import {
  findCustomerById,
  updateCustomerStatus,
} from "../store/actions/user-actions";
import { findOrderByUserId } from "../store/actions/order-actions";

const DetailCustomer = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    createdOn: "",
    date_of_birth: "",
    gender: "",
    avatar: "",
  };

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const name = watch("name");
  const email = watch("email");
  const phone = watch("phone");
  const createdOn = watch("createdOn");
  const date_of_birth = watch("date_of_birth");
  const avatar = watch("avatar");

  useEffect(() => {
    const fetchData = async () => {
      const result1 =
        id && (await dispatch(findOrderByUserId({ order_userId: id })));
      if (result1) {
        setOrders(result1.payload.metaData);
      }
      const result = await dispatch(findCustomerById({ customer_id: id }));
      if (result) {
        setCustomer(result.payload.metaData);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setValue("email", customer && customer?.order_shipping.ship_to.email);
    setValue("name", customer && customer?.order_shipping.ship_to.name);
    setValue("address", customer && customer?.order_shipping.ship_to.address);
    setValue("phone", customer && customer?.order_shipping.ship_to.phone);
    setValue(
      "createdOn",
      customer && dayjs(customer?.createdOn).format("hh:mmA DD/MM/YYYY")
    );
  }, [customer]);

  const handleConfirm = async () => {
    const signal = toast.loading("Vui lòng đợi");
    try {
      const result = await dispatch(
        updateCustomerStatus({
          customer_id: id,
          customer_status: "active",
        })
      );
      if (result) {
        toast.update(signal, {
          render: "Thay đổi tình trạng đơn hàng thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        navigate("/orders");
      }
    } catch (error) {
      toast.update(id, {
        render: "Thay đổi tình trạng đơn hàng không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  const handleCancel = async () => {
    const signal = toast.loading("Vui lòng đợi");
    try {
      const result = await dispatch(
        updateCustomerStatus({
          customer_id: id,
          customer_status: "block",
        })
      );
      if (result) {
        toast.update(signal, {
          render: "Hủy đơn hàng thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        navigate("/orders");
      }
    } catch (error) {
      toast.update(id, {
        render: "Hủy đơn hàng không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Spring className="card flex-1 xl:py-10">
        <h5 className="mb-[14px]">Thông tin người dùng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="items-center justify-center flex flex-col">
            <div className="relative mb-3.5  ">
              <img
                className="relative rounded-full w-[110px] h-[110px]"
                src={avatar}
                alt="Maria Smith"
              />
            </div>
            <h4>Anh Tu</h4>
          </div>

          <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.email,
                    })}
                    id="email"
                    value={email}
                    defaultValue={defaultValues.email}
                    disabled
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.phone,
                    })}
                    id="phone"
                    value={phone}
                    defaultValue={defaultValues.phone}
                    disabled
                    {...register("phone", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="createdOn">
                    Ngày sinh
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.createdOn,
                    })}
                    id="createdOn"
                    value={createdOn}
                    defaultValue={defaultValues.createdOn}
                    disabled
                    {...register("createdOn", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="createdOn">
                    Giới tính
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.createdOn,
                    })}
                    id="createdOn"
                    value={createdOn}
                    defaultValue={defaultValues.createdOn}
                    disabled
                    {...register("createdOn", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div
              className={`grid gap-2 mt-5 ${
                isDelete ? "sm:grid-cols-2" : ""
              } sm:mt-10 md:mt-11 items-center`}
            >
              {!isDelete ? (
                <>
                  {customer && customer?.customer_status !== "active" ? (
                    <button
                      className="btn btn--outline red"
                      onClick={() => setIsDelete(true)}
                    >
                      Cấm người dùng
                    </button>
                  ) : (
                    ""
                  )}
                  {customer && customer?.customer_status === "pending" ? (
                    <button
                      className="btn btn--primary"
                      onClick={handleConfirm}
                    >
                      Xác nhận đơn hàng
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <button
                    className="btn btn--outline green"
                    onClick={() => setIsDelete(false)}
                  >
                    Hủy bỏ
                  </button>
                  <button
                    className="btn btn--outline red"
                    onClick={handleCancel}
                  >
                    Xác nhận cấm người dùng này
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="flex-1 py-10">
        <h5 className="mb-[14px]">Lịch sử đặt hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <OrdersTable data={orders} />
        </div>
      </Spring>
    </>
  );
};

export default DetailCustomer;
