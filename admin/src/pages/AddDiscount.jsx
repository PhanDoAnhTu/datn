// components
import PageHeader from "@layout/PageHeader";
import DiscountAdd from "@widgets/DiscountAdd";
import { useLocation } from "react-router-dom";

const AddDiscount = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo mã giảm giá" />
      <DiscountAdd item={location.state ? location.state.record : ""} />
    </>
  );
};

export default AddDiscount;
