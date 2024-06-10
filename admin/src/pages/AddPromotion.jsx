// components
import PageHeader from "@layout/PageHeader";
import PromotionAdd from "@widgets/PromotionAdd";
import { useLocation } from "react-router-dom";

const AddDiscount = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo chương trình khuyến mãi" />
      <PromotionAdd />
    </>
  );
};

export default AddDiscount;
