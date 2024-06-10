// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import CategoryManagementTable from "@widgets/CategoriesManagementTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const CategoriesManagement = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Quản lý danh mục" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/category-editor", { state: { title: "New Category" } })
            }
            className="btn btn--primary"
          >
            Tạo danh mục <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink className="btn btn--outline blue !h-[44px]" data={csvData}>
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          query={query}
          setQuery={setQuery}
          placeholder="Search Category"
        />
      </div>
      <CategoryManagementTable searchQuery={query} />
    </>
  );
};

export default CategoriesManagement;
