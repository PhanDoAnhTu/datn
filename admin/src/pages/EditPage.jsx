// components
import PageHeader from "@layout/PageHeader";
import PageEditor from "@widgets/PageEditor";
import { useLocation } from "react-router-dom";

const EditPage = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Page Editor" />
      <PageEditor
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default EditPage;
