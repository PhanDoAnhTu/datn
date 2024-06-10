// components
import PageHeader from "@layout/PageHeader";
import TopicEditor from "@widgets/TopicEditor";
import { useLocation } from "react-router-dom";

const EditCategory = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Tạo chủ đề" />
      <TopicEditor
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default EditCategory;
