// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuManagementTable from "@widgets/MenusManagementTable";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const MenusManagement = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Quản lý menu" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() => navigate("/menu-editor")}
            className="btn btn--primary"
          >
            Thêm menu <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
      </div>
      <MenuManagementTable searchQuery={query} />
    </>
  );
};

export default MenusManagement;
