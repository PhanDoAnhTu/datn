// components
import PageHeader from "@layout/PageHeader";
import TopicEditing from "@widgets/TopicEditing";
import { useLocation } from "react-router-dom";

const TopicEdit = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Cập nhật chủ đề" />
      <TopicEditing id={location.state ? location.state.record._id : ""} />
    </>
  );
};

export default TopicEdit;
