// components
import PageHeader from "@layout/PageHeader";
import CustomersInfobox from "@components/CustomersInfobox";
import CustomersTable from "@widgets/CustomersTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { allProducts } from "../store/actions/product-actions";
import FilterItem from "@ui/FilterItem";
import { getAllCustomers } from "../store/actions/user-actions";
import { getAllOrder } from "../store/actions/order-actions";

const Customers = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [og_data, setOGData] = useState([]);
  const [orders, setOrders] = useState([]);
  const { all_products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    if (!all_products) {
      dispatch(allProducts());
    }
  }, [all_products]);

  const fetchData = async () => {
    const result = await dispatch(getAllCustomers());
    if (result) {
      setData(result.payload.metaData);
      setOGData(result.payload.metaData);
    }
    const result1 = await dispatch(getAllOrder());
    if (result1) {
      setOrders(result1.payload.metaData);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCategory("all");
    setData(og_data);
  }, [og_data]);

  const [category, setCategory] = useState("all");

  const getQty = (category) => {
    if (category === "all") return og_data.length;
    if (category === "active")
      return og_data?.filter(
        (customer) => customer.customer_status === "active"
      ).length;
    if (category === "pending")
      return og_data?.filter(
        (customer) => customer.customer_status === "pending"
      ).length;
    if (category === "block")
      return og_data?.filter((customer) => customer.customer_status === "block")
        .length;
  };
  useEffect(() => {
    if (category === "all") setData(og_data);
    if (category === "active")
      setData(
        og_data?.filter((customer) => customer.customer_status === "active")
      );
    if (category === "pending")
      setData(
        og_data?.filter((customer) => customer.customer_status === "pending")
      );
    if (category === "block")
      setData(
        og_data?.filter((customer) => customer.customer_status === "block")
      );
  }, [category]);
  return (
    <>
      <PageHeader title="Khách hàng" />
      <div className="grid-cols-1">
        <div className="widgets-grid grid-cols-1 mb-5 md:grid-cols-3 xl:col-span-3">
          <CustomersInfobox
            count={og_data?.slice().length}
            color="green"
            label="Tổng khách hàng"
          />
          <CustomersInfobox
            label="Khách hàng mới trong 30 ngày"
            count={
              og_data
                ?.slice()
                .filter(
                  (item) =>
                    dayjs(item.createdAt).isBefore(dayjs()) &&
                    dayjs(item.createdAt).isAfter(dayjs().subtract(1, "month"))
                ).length
            }
            iconClass="user-plus-solid"
          />
          <CustomersInfobox
            label="Khách hàng có đơn hàng trong 30 ngày"
            count={
              og_data?.slice().filter((customer) =>
                orders
                  ?.slice()
                  .filter(
                    (item) =>
                      dayjs(item.createdOn).isBefore(dayjs()) &&
                      dayjs(item.createdOn).isAfter(
                        dayjs().subtract(1, "month")
                      )
                  )
                  .map((item) => {
                    return item.order_userId;
                  })
                  .includes(customer._id)
              )?.length
            }
            color="red"
            iconClass="user-group-crown-solid"
          />
        </div>
        <div className="flex flex-wrap gap-2 ">
          <span className="text-header">Đơn hàng:</span>
          <div>
            {[
              { value: "all", label: "Tất cả" },
              { value: "active", label: "Đang hoạt động" },
              { value: "pending", label: "Chờ xác nhận" },
              { value: "block", label: "Không hoạt động" },
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
        <CustomersTable data={data} category={category} />
      </div>
    </>
  );
};

export default Customers;
