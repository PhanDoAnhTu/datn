// components
import PageHeader from "@layout/PageHeader";
import CalendarSelector from "@components/CalendarSelector";
import OrdersInfobox from "@components/OrdersInfobox";
import OrdersTable from "@widgets/OrdersTable";

// hooks
import { useEffect, useState } from "react";

// constants
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../store/actions/order-actions";
import FilterItem from "@ui/FilterItem";
import dayjs from "dayjs";
import { allProducts } from "../store/actions/product-actions";

const Orders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [og_data, setOGData] = useState([]);
  const [all_data, setAllData] = useState([]);
  const [range, setRange] = useState([dayjs().subtract(1, "month"), dayjs()]);
  const { all_products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    if (!all_products) {
      dispatch(allProducts());
    }
  }, [all_products]);

  const fetchData = async () => {
    const result = await dispatch(getAllOrder({}));
    if (result) {
      setData(result.payload.metaData);
      setAllData(result.payload.metaData);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setOGData(
      all_data
        ?.slice()
        .filter(
          (item) =>
            dayjs(item.createdOn).isBefore(range[1].$d) &&
            dayjs(item.createdOn).isAfter(range[0].$d)
        )
    );
  }, [range, all_data]);

  useEffect(() => {
    setCategory("all");
    setData(og_data);
  }, [og_data]);

  const [category, setCategory] = useState("all");

  const getQty = (category) => {
    if (category === "all") return og_data.length;
    if (category === "confirmed")
      return og_data?.filter((order) => order.order_status === "confirmed")
        .length;
    if (category === "pending")
      return og_data?.filter((order) => order.order_status === "pending")
        .length;
    if (category === "successful")
      return og_data?.filter(
        (order) =>
          order.order_status === "successful" || order.order_status === "review"
      ).length;
    if (category === "shipping")
      return og_data?.filter((order) => order.order_status === "shipping")
        .length;
    if (category === "cancelled")
      return og_data?.filter((order) => order.order_status === "cancelled")
        .length;
  };

  useEffect(() => {
    if (category === "all") setData(og_data);
    if (category === "confirmed")
      setData(og_data?.filter((order) => order.order_status === "confirmed"));
    if (category === "pending")
      setData(og_data?.filter((order) => order.order_status === "pending"));
    if (category === "successful")
      setData(
        og_data?.filter(
          (order) =>
            order.order_status === "successful" ||
            order.order_status === "review"
        )
      );
    if (category === "shipping")
      setData(og_data?.filter((order) => order.order_status === "shipping"));
    if (category === "cancelled")
      setData(og_data?.filter((order) => order.order_status === "cancelled"));
  }, [category]);

  return (
    <>
      <PageHeader title="Đơn hàng" />
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        <div
          className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] lg:grid-cols-4 lg:items-end
                     xl:grid-cols-6"
        >
          <CalendarSelector
            wrapperClass="lg:max-w-[275px] lg:col-span-2 xl:col-span-4"
            id="ordersPeriodSelector"
            label="Thời gian đặt"
            onChange={setRange}
            value={range}
          />
        </div>
        <div className="w-full widgets-grid grid-cols-1 xl:grid-cols-4">
          <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4">
            <OrdersInfobox
              title="đã hoàn thành"
              count={
                og_data
                  ?.slice()
                  .filter(
                    (item) =>
                      item.order_status === "review" ||
                      item.order_status === "successful"
                  )?.length
              }
              icon={<i className="icon-check-to-slot-solid" />}
            />
            <OrdersInfobox
              title="đã xác nhận"
              count={
                og_data
                  ?.slice()
                  .filter((item) => item.order_status === "confirmed")?.length
              }
              color="green"
              icon={<i className="icon-list-check-solid" />}
            />
            <OrdersInfobox
              title="chờ xác nhận"
              count={
                og_data
                  ?.slice()
                  .filter((item) => item.order_status === "pending")?.length
              }
              color="badge-status-bg"
              icon={<i className="icon-arrows-rotate-regular" />}
            />
            <OrdersInfobox
              title="đã hủy"
              count={
                og_data
                  ?.slice()
                  .filter((item) => item.order_status === "cancelled")?.length
              }
              color="red"
              icon={<i className="icon-ban-solid" />}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 -mb-5">
          <span className="text-header">Đơn hàng:</span>
          <div>
            {[
              { value: "all", label: "Tất cả" },
              { value: "successful", label: "Đã hoàn thành" },
              { value: "confirmed", label: "Đã xác nhận" },
              { value: "pending", label: "Chờ xác nhận" },
              { value: "shipping", label: "Đang giao" },
              { value: "cancelled", label: "Đã hủy" },
            ].map((option, index) => (
              <FilterItem
                key={`filter-${index}`}
                text={option.label}
                value={option.value}
                qty={getQty(option.value)}
                active={category}
                onClick={setCategory}
              />
            ))}
          </div>
        </div>
        <OrdersTable category={category} data={data} />
      </div>
    </>
  );
};

export default Orders;
