// components
import PageHeader from "@layout/PageHeader";
import ProductEditing from "@widgets/ProductEditing";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <PageHeader title="Sửa sản phẩm" />
      <ProductEditing id={params.id} />
    </>
  );
};

export default EditProduct;
