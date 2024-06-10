// components

import PageHeader from "@layout/PageHeader";
import SliderEdit from "@widgets/SliderEdit";
import { useLocation } from "react-router-dom";

const NewSlider = () => {
  const location = useLocation();

  return (
    <>
      <PageHeader title="Cập nhật slider" />
      <SliderEdit item={location.state ? location.state.record : ""} />
    </>
  );
};

export default NewSlider;
