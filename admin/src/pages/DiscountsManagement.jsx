// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import DiscountManagementTable from "@widgets/DiscountManagementTable";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const DiscountsManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Quản Lý Mã Giảm Giá" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/discount-editor", { state: { title: "New Discount" } })
            }
            className="btn btn--primary"
          >
            Tạo mã giảm giá <i className="icon-circle-plus-regular" />
          </button>

          <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search wrapperClass="lg:w-[326px]" placeholder="Search Product" />
      </div>
      <DiscountManagementTable />
    </>
  );
};

export default DiscountsManagement;
