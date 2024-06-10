// components
import PageHeader from "@layout/PageHeader";
import BrandEditor from "@widgets/BrandEditor";
import { useLocation } from "react-router-dom";

const EditBrand = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo hãng" />
      <BrandEditor item={location.state ? location.state.record : ""} />
    </>
  );
};

export default EditBrand;
