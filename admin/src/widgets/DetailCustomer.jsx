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

  const email = watch("email");
  const phone = watch("phone");
  const date_of_birth = watch("date_of_birth");
  const gender = watch("gender");
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
    setValue("email", customer && customer?.customer_email);
    setValue("name", customer && customer?.customer_name);
    setValue(
      "avatar",
      customer
        ? customer?.customer_avatar
          ? customer?.customer_avatar
          : "https://www.glopol.org/wp-content/uploads/2021/01/user-empty-avatar.png"
        : "https://www.glopol.org/wp-content/uploads/2021/01/user-empty-avatar.png"
    );
    setValue(
      "phone",
      customer
        ? customer?.customer_phone
          ? customer?.customer_phone
          : "Chưa đặt"
        : "Chưa đặt"
    );
    setValue(
      "date_of_birth",
      customer
        ? customer?.customer_date_of_birth
          ? dayjs(customer?.customer_date_of_birth).format("DD/MM/YYYY")
          : "Chưa đặt"
        : "Chưa đặt"
    );
    setValue(
      "gender",
      customer
        ? customer?.customer_sex
          ? customer?.customer_sex
          : "Chưa đặt"
        : "Chưa đặt"
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
          render: "Gỡ bỏ cấm người dùng thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        navigate("/customers");
      }
    } catch (error) {
      toast.update(id, {
        render: "Gỡ bỏ cấm người dùng không thành công",
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
          render: "Cấm người dùng thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        navigate("/customers");
      }
    } catch (error) {
      toast.update(id, {
        render: "Cấm người dùng không thành công",
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
                alt={customer && customer?.customer_name}
              />
            </div>
            <h4>{customer && customer?.customer_name}</h4>
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
                  <label className="field-label" htmlFor="date_of_birth">
                    Ngày sinh
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.date_of_birth,
                    })}
                    id="date_of_birth"
                    value={date_of_birth}
                    defaultValue={defaultValues.date_of_birth}
                    disabled
                    {...register("date_of_birth", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="gender">
                    Giới tính
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.gender,
                    })}
                    id="gender"
                    value={gender}
                    defaultValue={defaultValues.gender}
                    disabled
                    {...register("gender", { required: true })}
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
                  {customer && customer?.customer_status === "active" ? (
                    <button
                      className="btn btn--outline red"
                      onClick={() => setIsDelete(true)}
                    >
                      Cấm người dùng
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  {customer && customer?.customer_status === "active" ? (
                    <>
                      {" "}
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
                  ) : (
                    ""
                  )}
                </>
              )}
              {!isDelete ? (
                <>
                  {customer && customer?.customer_status === "block" ? (
                    <button
                      className="btn btn--outline red"
                      onClick={() => setIsDelete(true)}
                    >
                      Gỡ bỏ cấm người dùng
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  {customer && customer?.customer_status === "block" ? (
                    <>
                      <button
                        className="btn btn--outline green"
                        onClick={() => setIsDelete(false)}
                      >
                        Hủy bỏ
                      </button>
                      <button
                        className="btn btn--outline red"
                        onClick={handleConfirm}
                      >
                        Xác nhận gỡ bỏ cấm người dùng này
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="flex-1 py-10">
        <h5 className="mb-[14px]">Lịch sử đặt hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <OrdersTable
            data={orders?.sort((a, b) =>
              dayjs(a.createdOn).isAfter(dayjs(b.createdOn)) ? -1 : 1
            )}
          />
        </div>
      </Spring>
    </>
  );
};

export default DetailCustomer;
