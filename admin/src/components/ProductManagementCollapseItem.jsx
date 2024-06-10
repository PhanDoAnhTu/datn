// components
import Collapse from "@mui/material/Collapse";
import { NavLink, useNavigate } from "react-router-dom";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import { Checkbox } from "antd";

// utils
import PropTypes from "prop-types";
import dayjs from "dayjs";
import Actions from "./Actions";

const ProductManagementCollapseItem = ({
  product,
  activeCollapse,
  handleCollapse,
}) => {
  const { stock } = product;
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox />
          <div className="flex items-center gap-2.5">
            <h6 className="text-sm max-w-[150px] truncate">{product.label}</h6>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse === product.id ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(product.id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
          <button
            onClick={() =>
              navigate(`/page-editor`, {
                state: { record: product, title: `Page Edit` },
              })
            }
            aria-label="Edit"
          >
            <i className="icon icon-pen-to-square-regular" />
          </button>
          <Actions record={product} table={"page"} />
        </div>
      </div>
      <Collapse in={activeCollapse === product.id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="flex gap-2.5">
                  <h6 className="text-sm max-w-[155px]">{product.label}</h6>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>ID: {product.id}</td>
            </tr>
            <tr>
              <td colSpan={2}>Path to: {product.path}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                Date added:{" "}
                {product.dateAdded &&
                dayjs(product.dateAdded).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(product.dateAdded), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(product.dateAdded),
                        "minute"
                      )} Minutes ago`
                    : dayjs().diff(dayjs(product.dateAdded), "hour") < 24
                    ? `${dayjs().diff(
                        dayjs(product.dateAdded),
                        "hour"
                      )} Hours ago`
                    : dayjs(product.dateAdded).format("hh:mmA DD/MM/YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                Date modified:{" "}
                {product.dateModified &&
                dayjs(product.dateModified).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(product.dateModified), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(product.dateModified),
                        "minute"
                      )} Minutes ago`
                    : dayjs().diff(dayjs(product.dateModified), "hour") < 24
                    ? `${dayjs().diff(
                        dayjs(product.dateModified),
                        "hour"
                      )} Hours ago`
                    : dayjs(product.dateModified).format("hh:mmA DD/MM/YYYY")
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </Collapse>
    </div>
  );
};

ProductManagementCollapseItem.propTypes = {
  product: PropTypes.object.isRequired,
  activeCollapse: PropTypes.string.isRequired,
  handleCollapse: PropTypes.func.isRequired,
};

export default ProductManagementCollapseItem;
