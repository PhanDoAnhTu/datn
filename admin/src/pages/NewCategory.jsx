// components
import PageHeader from "@layout/PageHeader";
import CategoryEditor from "@widgets/CategoryEditor";
import { useLocation } from "react-router-dom";

const NewCategory = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo danh mục" />
      <CategoryEditor
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default NewCategory;
