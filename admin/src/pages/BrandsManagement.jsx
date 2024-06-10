// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandManagementTable from "@widgets/BrandsManagementTable";
import brands_managements from "@db/brands_managements";

const BrandsManagement = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Quản lý hãng" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/brand-editor", { state: { title: "New Brand" } })
            }
            className="btn btn--primary"
          >
            Tạo hãng <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={brands_managements}
          >
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          query={query}
          setQuery={setQuery}
          placeholder="Search Brand"
        />
      </div>
      <BrandManagementTable searchQuery={query} />
    </>
  );
};

export default BrandsManagement;
