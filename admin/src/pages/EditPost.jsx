// components
import PageHeader from "@layout/PageHeader";
import PostEditor from "@widgets/PostEditor";
import { useLocation } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Edit Post" />
      <PostEditor item={location.state ? location.state.record : ""} />
    </>
  );
};

export default EditPost;
