// components

import PageHeader from "@layout/PageHeader";
import DetailOrder from "@widgets/DetailOrder";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();

  return (
    <>
      <PageHeader title="Chi tiết đơn hàng" />
      <DetailOrder id={id ? id : ""} />
    </>
  );
};

export default OrderDetail;
