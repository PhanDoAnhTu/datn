// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageManagementTable from "@widgets/PagesManagementTable";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const PagesManagement = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Quản lý trang đơn" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/page-editor", { state: { title: "New Page" } })
            }
            className="btn btn--primary"
          >
            Tạo trang đơn <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
      </div>
      <PageManagementTable />
    </>
  );
};

export default PagesManagement;
