// components
import PageHeader from "@layout/PageHeader";
import DetailMenu from "@widgets/DetailMenu";
import { useLocation } from "react-router-dom";

const NewMenu = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chỉnh sửa menu" />
      <DetailMenu
        item={location.state ? location.state.record : ""}
        title={location.state ? location.state.title : ""}
      />
    </>
  );
};

export default NewMenu;
