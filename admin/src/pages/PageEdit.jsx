// components
import PageHeader from "@layout/PageHeader";
import PageEditt from "@widgets/PageEditt";
import { useLocation } from "react-router-dom";

const PageEdit = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chỉnh sửa trang đơn" />
      <PageEditt
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default PageEdit;
