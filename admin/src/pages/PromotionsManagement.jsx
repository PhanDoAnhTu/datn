// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import PromotionMangementTable from "@widgets/PromotionManagementTable";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const PromotionsManagement = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Quản lý chương trình khuyến mãi" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/promotion-editor", {
                state: { title: "New Discount" },
              })
            }
            className="btn btn--primary"
          >
            Tạo chương trình khuyến mãi{" "}
            <i className="icon-circle-plus-regular" />
          </button>
        </div>
      </div>
      <PromotionMangementTable />
    </>
  );
};

export default PromotionsManagement;
