// components
import brands_managements from "@db/brands_managements";
import PageHeader from "@layout/PageHeader";
import BrandDetail from "@widgets/BrandDetail";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailBrand = () => {
  const params = useParams();
  const [record, setRecord] = useState([]);
  useEffect(() => {
    const fetchRecord = async () => {
      const fetchedRecord = await brands_managements.find(
        (item) => item.id === params.id
      );
      setRecord(fetchedRecord);
    };
    fetchRecord();
  }, [params]);

  return (
    <>
      <PageHeader title="Chi tiết hãng" />
      <BrandDetail item={record ? record : ""} />
    </>
  );
};

export default DetailBrand;
