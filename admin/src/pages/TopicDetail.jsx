// components
import PageHeader from "@layout/PageHeader";
import TopicInfo from "@widgets/TopicInfo";
import { useLocation } from "react-router-dom";

const TopicDetail = () => {
  const location = useLocation();
  return (
    <>
      <PageHeader title="Chi tiết chủ đề" />
      <TopicInfo item={location.state ? location.state.record : ""} />
    </>
  );
};

export default TopicDetail;
