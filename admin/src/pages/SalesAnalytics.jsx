// components
import PageHeader from "@layout/PageHeader";
import MainProfileInfo from "@widgets/MainProfileInfo";
import SalesStats from "@widgets/SalesStats";
import TotalReport from "@widgets/TotalReport";
import TotalBalance from "@components/Banners/TotalBalance";

// hooks
import { useWindowSize } from "react-use";
import CustomerRetentionRate from "@widgets/CustomerRetentionRate";
import DemographicSegmentation from "@widgets/DemographicSegmentation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../store/actions/user-actions";
import { getAllOrder } from "../store/actions/order-actions";

const SalesAnalytics = () => {
  const { width } = useWindowSize();

  const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllCustomers());
      if (result) {
        setCustomers(result.payload.metaData);
      }
    };
    fetchData();
  }, []);
  const [order, setOrder] = useState([]);
  const fetchData = async () => {
    const result = await dispatch(getAllOrder({}));
    if (result) {
      setOrder(result.payload.metaData);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="Biểu đồ" />
      <div
        className={`${
          width > 768 ? "widgets-grid" : ""
        } grid-cols-1  xl:grid-cols-6`}
      >
        <div className="xl:col-span-6">
          <SalesStats order={order} />
        </div>
        <div className="xl:col-span-4">
          <CustomerRetentionRate customers={customers} order={order} />
        </div>
        <div className="xl:col-span-2">
          <DemographicSegmentation customers={customers} />
        </div>
      </div>
    </>
  );
};

export default SalesAnalytics;
