// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { useState } from "react";
import ContactManagementTable from "@widgets/ContactManagementTable";

const ContactsManagement = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Hỗ trợ người dùng" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]"></div>
        <Search
          wrapperClass="lg:w-[326px]"
          query={query}
          setQuery={setQuery}
          placeholder="Tìm kiếm liên hệ"
        />
      </div>
      <ContactManagementTable searchQuery={query} />
    </>
  );
};

export default ContactsManagement;
