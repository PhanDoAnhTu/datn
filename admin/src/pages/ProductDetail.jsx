// components
import PageHeader from "@layout/PageHeader";
import DetailProduct from "@widgets/DetailProduct";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chi tiết sản phẩm" />
      <DetailProduct item={location.state ? location.state.record : ""} />
    </>
  );
};

export default ProductDetail;
