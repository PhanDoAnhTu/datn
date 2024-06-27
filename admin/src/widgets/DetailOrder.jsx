// components
import Spring from "@components/Spring";
import { toast } from "react-toastify";

// hooks
import { useForm } from "react-hook-form";

// utils
import classNames from "classnames";
import { Empty } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import StyledTable from "./OrdersTable/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusOrderByOrderId,
  findOrderByTrackingNumber,
} from "../store/actions/order-actions";
import { allProducts } from "../store/actions/product-actions";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

const DetailOrder = ({ id }) => {
  const ORDERDETAIL_MANAGEMENT_COLUMN_DEFS = [
    {
      title: (
        <div className="flex items-center justify-start">
          <i className="icon-image-regular text-[26px]" />
        </div>
      ),
      dataIndex: "image",
      render: (image) => (
        <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
          <img src={image} alt="product" />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "product_name",
      render: (text) => (
        <span className="inline-block h6 !text-sm ">{text}</span>
      ),
    },
    {
      title: "SKU",
      width: 200,
      dataIndex: "sku",
      render: (sku) => <span className="inline-block h6 !text-sm ">{sku}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (price) => (
        <span className="inline-block h6 !text-sm">
          <NumericFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            decimalScale={0}
            id="price"
            suffix={"đ"}
          />
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "record",
      render: (text, record) => (
        <span className="inline-block h6 !text-sm ">
          {record.quantity + " " + record.product_unit}
        </span>
      ),
    },
    {
      title: "Tổng",
      dataIndex: "record",
      width: 125,
      render: (text, record) => (
        <span className="inline-block h6 !text-sm ">
          <NumericFormat
            value={record.price * record.quantity}
            displayType="text"
            thousandSeparator={true}
            decimalScale={0}
            id="price"
            suffix={"đ"}
          />
        </span>
      ),
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order_products, setOrderProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const { all_products } = useSelector((state) => state.productReducer);

  console.log(all_products);
  const defaultValues = {
    name: "",
    email: "",
    address: "",
    phone: "",
    createdOn: "",
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
  const address = watch("address");
  const phone = watch("phone");
  const createdOn = watch("createdOn");

  useEffect(() => {
    if (!all_products) {
      dispatch(allProducts());
    }
  }, [all_products]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        findOrderByTrackingNumber({ order_trackingNumber: id })
      );
      if (result) {
        setOrder(result.payload.metaData);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (all_products) {
      setOrderProducts(
        order?.order_product.item_products.map((item) => {
          const matchedProduct = all_products
            ?.slice()
            .find((subitem) => subitem._id === item.productId);
          const matchedSKU = all_products
            ?.slice()
            .find((subitem) => subitem._id === item.productId)
            ?.sku_list.slice()
            .find((subitem) => subitem._id === item.sku_id);

          return {
            _id: matchedProduct._id,
            image: matchedProduct.product_thumb,
            sku:
              matchedSKU.sku_tier_idx.length === 2
                ? matchedProduct.product_variations[0].options[
                    matchedSKU.sku_tier_idx[0]
                  ] +
                  ", " +
                  matchedProduct.product_variations[1].options[
                    matchedSKU.sku_tier_idx[1]
                  ]
                : matchedProduct.product_variations[0].options[
                    matchedSKU.sku_tier_idx[0]
                  ],
            product_name: matchedProduct.product_name,
            product_unit: matchedProduct.product_unit,
            price: item.price,
            quantity: item.quantity,
          };
        })
      );
    }
  }, [order, all_products]);

  useEffect(() => {
    setValue("email", order && order?.order_shipping.ship_to.email);
    setValue("name", order && order?.order_shipping.ship_to.name);
    setValue("address", order && order?.order_shipping.ship_to.address);
    setValue("phone", order && order?.order_shipping.ship_to.phone);
    setValue(
      "createdOn",
      order && dayjs(order?.createdOn).format("hh:mmA DD/MM/YYYY")
    );
  }, [order]);

  const handleConfirm = async () => {
    const signal = toast.loading("Vui lòng đợi");
    try {
      const result = await dispatch(
        changeStatusOrderByOrderId({
          order_id: order?._id,
          order_status: "confirmed",
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

  const handleShipping = async () => {
    const signal = toast.loading("Vui lòng đợi");
    try {
      const result = await dispatch(
        changeStatusOrderByOrderId({
          order_id: order?._id,
          order_status: "shipping",
        })
      );
      if (result) {
        toast.update(signal, {
          render: "Thay đổi trạng thái đơn hàng thành công",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        navigate("/orders");
      }
    } catch (error) {
      toast.update(id, {
        render: "Thay đổi trạng thái đơn hàng không thành công",
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
        changeStatusOrderByOrderId({
          order_id: order?._id,
          order_status: "cancelled",
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
        <h5 className="mb-[14px]">Thông tin giao hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
            <div className="grid grid-cols-1 gap-y-4 gap-x-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="name">
                    Tên người nhận
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.name,
                    })}
                    id="name"
                    value={name}
                    defaultValue={defaultValues.name}
                    disabled
                    {...register("name", { required: true })}
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
                  <label className="field-label" htmlFor="createdOn">
                    Ngày đặt
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
              <div className="field-wrapper">
                <label className="field-label" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.address,
                  })}
                  id="address"
                  value={address}
                  defaultValue={defaultValues.address}
                  disabled
                  {...register("address", { required: true })}
                />
              </div>
            </div>
            <div
              className={`grid gap-2 mt-5 ${
                order?.order_status !== "shipping" &&
                order?.order_status !== "review" &&
                order?.order_status !== "successful"
                  ? "sm:grid-cols-2"
                  : ""
              } sm:mt-10 md:mt-11 items-center`}
            >
              {!isDelete ? (
                <>
                  {order &&
                  order?.order_status !== "shipping" &&
                  order?.order_status !== "review" &&
                  order?.order_status !== "successful" &&
                  order?.order_status !== "cancelled" ? (
                    <button
                      className="btn btn--outline red"
                      onClick={() => setIsDelete(true)}
                    >
                      Hủy đơn hàng
                    </button>
                  ) : (
                    ""
                  )}
                  {order && order?.order_status === "pending" ? (
                    <button
                      className="btn btn--primary"
                      onClick={handleConfirm}
                    >
                      Xác nhận đơn hàng
                    </button>
                  ) : (
                    ""
                  )}
                  {order && order?.order_status === "confirmed" ? (
                    <button
                      className="btn btn--primary "
                      onClick={handleShipping}
                    >
                      Chuyển sang trạng thái đang giao
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
                    Xác nhận hủy đơn hàng
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Spring>
      <Spring className="flex-1 py-10">
        <h5 className="mb-[14px]">Thông tin đơn hàng</h5>
        <div className="grid grid-cols-1 items-start gap-5 xl:gap-10">
          <div className="grid grid-cols-1 sm:col-span-3 gap-y-4 gap-x-2">
            <StyledTable
              columns={ORDERDETAIL_MANAGEMENT_COLUMN_DEFS}
              dataSource={order_products}
              rowKey={(record) => record._id}
              locale={{
                emptyText: <Empty text="Không có sản phẩm" />,
              }}
              pagination={false}
            />
          </div>
        </div>
        <Spring className="flex-1">
          <div className="grid grid-cols-4 items-start gap-5 xl:gap-10">
            <div className="col-span-3"></div>
            <div className="space-y-3 card">
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Tạm tính:</div>
                <div className="inline-block h6">
                  <NumericFormat
                    value={order?.order_checkout.totalPrice}
                    displayType="text"
                    thousandSeparator={true}
                    decimalScale={0}
                    id="price"
                    suffix={"đ"}
                  />
                </div>
              </div>
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Mã giảm giá:</div>
                <div className="inline-block h6">
                  <NumericFormat
                    value={order?.order_checkout.totalDiscount}
                    displayType="text"
                    thousandSeparator={true}
                    decimalScale={0}
                    id="price"
                    suffix={"đ"}
                  />
                </div>
              </div>
              <div className="flex space-x-5 justify-between">
                <div className="inline-block h6">Tổng:</div>
                <div className="inline-block h6">
                  <NumericFormat
                    value={order?.order_checkout.totalCheckout}
                    displayType="text"
                    thousandSeparator={true}
                    decimalScale={0}
                    id="price"
                    suffix={"đ"}
                  />
                </div>
              </div>
            </div>
          </div>
        </Spring>
      </Spring>
    </>
  );
};

export default DetailOrder;
