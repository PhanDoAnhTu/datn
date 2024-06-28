// components
import PageHeader from "@layout/PageHeader";
import PostEdit from "@widgets/PostEdit";
import { useLocation } from "react-router-dom";

const PostEditing = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chỉnh sửa bài viết" />
      <PostEdit id={location.state ? location.state.record._id : ""} />
    </>
  );
};

export default PostEditing;
