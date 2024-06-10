// components
import PageHeader from "@layout/PageHeader";
import ContactResponsing from "@widgets/ContactResponsing";
import { useLocation } from "react-router-dom";

const ContactResponse = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Phản hồi người dùng" />
      <ContactResponsing item={location.state ? location.state.record : ""} />
    </>
  );
};

export default ContactResponse;
