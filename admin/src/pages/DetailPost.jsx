import PageHeader from "@layout/PageHeader";
import PostDetail from "@widgets/PostDetail";
import { useLocation } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();

  return (
    <>
      <PageHeader title="Chi tiết bài viết" />
      <PostDetail item={location.state ? location.state.record : ""} />
    </>
  );
};

export default EditPost;
