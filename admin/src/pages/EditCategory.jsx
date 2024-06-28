// components
import PageHeader from "@layout/PageHeader";
import CategoryEdit from "@widgets/CategoryEdit";
import { useLocation } from "react-router-dom";

const EditCategory = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Sửa danh mục" />
      <CategoryEdit item={location.state ? location.state.record._id : ""} />
    </>
  );
};

export default EditCategory;
