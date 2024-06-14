// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import ProductManagementTable from "@widgets/ProductManagementTable";
import { useNavigate } from "react-router-dom";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const ProductsManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Products Management" />
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

          <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search wrapperClass="lg:w-[326px]" placeholder="Search Product" />
      </div>
      <ProductManagementTable />
    </>
  );
};

export default ProductsManagement;