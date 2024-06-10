// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopicManagementTable from "@widgets/TopicsManagementTable";

const csvData = [
  ["firstname", "lastname", "email"],
  ["John", "Doe", "johndoe@domain.com"],
  ["Jane", "Doe", "janedoe@domain.com"],
];

const TopicsManagement = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Quản lý chủ đề" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/topic-editor", { state: { title: "New Topic" } })
            }
            className="btn btn--primary"
          >
            Tạo chủ đề <i className="icon-circle-plus-regular" />
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
      <TopicManagementTable searchQuery={query} />
    </>
  );
};

export default TopicsManagement;
