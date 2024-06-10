// components
import posts_managements from "@db/posts_manangement";
import PageHeader from "@layout/PageHeader";
import DetailOrder from "@widgets/DetailOrder";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const params = useParams();
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchRecord = async () => {
      const fetchedRecord = await posts_managements.find(
        (item) => item.id === params.id
      );
      setRecord(fetchedRecord);
    };
    fetchRecord();
  }, [params]);

  return (
    <>
      <PageHeader title="Chi tiết đơn hàng" />
      <DetailOrder item={record ? record : ""} />
    </>
  );
};

export default OrderDetail;
