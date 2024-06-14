// components
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostManagementTable from "@widgets/PostsManagementTable";
import posts_managements from "@db/posts_manangement";

const PostsManagement = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <>
      <PageHeader title="Posts Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            onClick={() =>
              navigate("/post-editor", { state: { title: "New Post" } })
            }
            className="btn btn--primary"
          >
            Add new post <i className="icon-circle-plus-regular" />
          </button>
          <CSVLink
            className="btn btn--outline blue !h-[44px]"
            data={posts_managements}
          >
            Export CSV <i className="icon-file-export-solid" />
          </CSVLink>
        </div>
        <Search
          wrapperClass="lg:w-[326px]"
          query={query}
          setQuery={setQuery}
          placeholder="Search Category"
        />
      </div>
      <PostManagementTable searchQuery={query} />
    </>
  );
};

export default PostsManagement;