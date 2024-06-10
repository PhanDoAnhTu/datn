// components
import PageHeader from "@layout/PageHeader";
import { useLocation } from "react-router-dom";
import AttributeAdd from "./AttributeAdd";

const NewCategory = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo đặc tính sản phẩm" />
      <AttributeAdd
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default NewCategory;
