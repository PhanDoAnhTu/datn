// components
import Collapse from "@mui/material/Collapse";
import { NavLink, useNavigate } from "react-router-dom";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import { Checkbox } from "antd";

// utils
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Actions from "./Actions";

const PageManagementCollapseItem = ({
  page,
  activeCollapse,
  handleCollapse,
}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox />
          <div className="flex items-center gap-2.5">
            <h6 className="text-sm max-w-[150px] truncate">{page.label}</h6>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse === page.id ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(page.id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
          <button
            onClick={() => navigate(`/page-editor/${page._id}`)}
            aria-label="Edit"
          >
            <i className="icon icon-pen-to-square-regular" />
          </button>
          <Actions record={page} table={"page"} />
        </div>
      </div>
      <Collapse in={activeCollapse === page.id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="flex gap-2.5">
                  <h6 className="text-sm max-w-[155px]">{page.label}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>ID: {page.id}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                Date added:{" "}
                {page.dateAdded &&
                dayjs(page.dateAdded).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(page.dateAdded), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(page.dateAdded),
                        "minute"
                      )} Minutes ago`
                    : dayjs().diff(dayjs(page.dateAdded), "hour") < 24
                    ? `${dayjs().diff(dayjs(page.dateAdded), "hour")} Hours ago`
                    : dayjs(page.dateAdded).format("hh:mmA DD/MM/YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                Date modified:{" "}
                {page.dateModified &&
                dayjs(page.dateModified).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(page.dateModified), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(page.dateModified),
                        "minute"
                      )} Minutes ago`
                    : dayjs().diff(dayjs(page.dateModified), "hour") < 24
                    ? `${dayjs().diff(
                        dayjs(page.dateModified),
                        "hour"
                      )} Hours ago`
                    : dayjs(page.dateModified).format("hh:mmA DD/MM/YYYY")
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

PageManagementCollapseItem.propTypes = {
  page: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default PageManagementCollapseItem;
