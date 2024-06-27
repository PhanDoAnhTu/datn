// components
import RangeDatePicker from "@ui/RangeDatePicker";

// utils
import PropTypes from "prop-types";

const CalendarSelector = ({
  wrapperClass,
  label = "Thời gian",
  id,
  onChange,
  value,
}) => {
  return (
    <div className={`${wrapperClass || ""} flex flex-col gap-2.5 w-full`}>
      <label className="h5 w-fit" htmlFor={id}>
        {label}:
      </label>
      <RangeDatePicker id={id} onChange={onChange} value={value} />
    </div>
  );
};

CalendarSelector.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
};

export default CalendarSelector;
