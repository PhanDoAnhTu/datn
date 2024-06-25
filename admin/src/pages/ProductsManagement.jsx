// components
import PageHeader from "@layout/PageHeader";
import ProductManagementTable from "@widgets/ProductManagementTable";
import { useNavigate } from "react-router-dom";

const ProductsManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Quản lý sản phẩm" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/product-editor")}
            className="btn btn--primary"
          >
            Tạo sản phẩm <i className="icon-circle-plus-regular" />
          </button>
          <button
            onClick={() => navigate("/attribute-editor")}
            className="btn btn--primary"
          >
            Tạo đặc tính sản phẩm <i className="icon-circle-plus-regular" />
          </button>
        </div>
      </div>
      <ProductManagementTable />
    </>
  );
};

export default ProductsManagement;
