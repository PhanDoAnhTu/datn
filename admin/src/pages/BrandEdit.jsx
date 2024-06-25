// components
import PageHeader from "@layout/PageHeader";
import BrandEditing from "@widgets/BrandEditing";
import { useLocation } from "react-router-dom";

const BrandEdit = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chỉnh sửa hãng" />
      <BrandEditing id={location.state ? location.state.record : ""} />
    </>
  );
};

export default BrandEdit;
