// components
import PageHeader from "@layout/PageHeader";
import EditMenu from "@widgets/EditMenu";
import { useLocation } from "react-router-dom";

const NewMenu = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chỉnh sửa menu" />
      <EditMenu item={location.state ? location.state.record._id : ""} />
    </>
  );
};

export default NewMenu;
