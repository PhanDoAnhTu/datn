// components
import PageHeader from "@layout/PageHeader";
import PageInfo from "@widgets/PageInfo";
import { useLocation } from "react-router-dom";

const CategoryDetail = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Page Detail" />
      <PageInfo item={location.state ? location.state.record : ""} />
    </>
  );
};

export default CategoryDetail;
