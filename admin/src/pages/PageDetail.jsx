// components
import PageHeader from "@layout/PageHeader";
import PageInfo from "@widgets/PageInfo";
import { useLocation } from "react-router-dom";

const CategoryDetail = () => {
  const location = useLocation();
  //lay du lieu o day
  return (
    <>
      <PageHeader title="Chi tiết trang đơn" />
      <PageInfo item={location.state ? location.state.record : ""} />
    </>
  );
};

export default CategoryDetail;
