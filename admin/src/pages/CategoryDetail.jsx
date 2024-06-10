// components
import PageHeader from "@layout/PageHeader";
import CategoryInfo from "@widgets/CategoryInfo";
import { useLocation } from "react-router-dom";

const CategoryDetail = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chi tiết danh mục" />
      <CategoryInfo item={location.state ? location.state.record : ""} />
    </>
  );
};

export default CategoryDetail;
