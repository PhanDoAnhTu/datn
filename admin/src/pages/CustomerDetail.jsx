// components

import PageHeader from "@layout/PageHeader";
import DetailCustomer from "@widgets/DetailCustomer";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams();

  return (
    <>
      <PageHeader title="Chi tiết khách hàng" />
      <DetailCustomer id={id ? id : ""} />
    </>
  );
};

export default CustomerDetail;
