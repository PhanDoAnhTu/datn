// styled components
import StyledRangePicker from "./styles";

// hooks
import { useState, useEffect } from "react";

// utils
import PropTypes from "prop-types";
import dayjs from "dayjs";

const RangeDatePicker = ({
  id,
  value,
  onChange,
  innerRef,
  placeholder,
  disableFuture = true,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => setOpen(false));

    return () => window.removeEventListener("resize", () => setOpen(false));
  }, []);

  return (
    <StyledRangePicker
      className="field-input"
      id={id}
      allowClear={false}
      suffixIcon={<i className="icon icon-calendar-days-regular" />}
      separator={<i className="icon icon-caret-right-solid" />}
      format="DD/MM/YYYY"
      placeholder={placeholder}
      disabledDate={
        disableFuture
          ? (current) => current && current > dayjs().endOf("day")
          : null
      }
      defaultValue={[dayjs().startOf("year"), dayjs()]}
      value={value}
      onChange={onChange}
      onOpenChange={setOpen}
      ref={innerRef}
      open={open}
      renderExtraFooter={() => (
        <button
          className="btn btn--secondary w-full md:w-[252px] md:ml-auto"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      )}
    />
  );
};

RangeDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func,
  innerRef: PropTypes.any,
  placeholder: PropTypes.array,
  disableFuture: PropTypes.bool,
};

export default RangeDatePicker;
