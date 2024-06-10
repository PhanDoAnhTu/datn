// components

import PageHeader from "@layout/PageHeader";
import SliderDetail from "@widgets/SliderDetail";
import { useLocation } from "react-router-dom";

const DetailSlider = () => {
  const location = useLocation();

  return (
    <>
      <PageHeader title="Chi tiết slider" />
      <SliderDetail item={location.state ? location.state.record : ""} />
    </>
  );
};

export default DetailSlider;
