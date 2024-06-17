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
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <h6 className="text-sm max-w-[150px] truncate">
              {product.product_name}
            </h6>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className={`collapse-btn ${
              activeCollapse === product._id ? "active" : ""
            }`}
            aria-label="Toggle view"
            onClick={() => handleCollapse(product._id)}
          >
            <i className="icon icon-caret-down-solid" />
          </button>
          <button
            onClick={() => navigate(`/product-editor/${product._id}`)}
            aria-label="Edit"
          >
            <i className="icon icon-pen-to-square-regular" />
          </button>
          <Actions record={product} table={"product"} />
        </div>
      </div>
      <Collapse in={activeCollapse === product._id}>
        <table className="basic-table">
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="flex gap-2.5">
                  <h6 className="text-sm max-w-[155px]">
                    {product.product_name}
                  </h6>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>ID: {product._id}</td>
            </tr>
            <tr>
              <td colSpan={2}>Số lượng kho: {product.product_quantity}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                Ngày tạo:{" "}
                {product.createdAt &&
                dayjs(product.createdAt).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(product.createdAt), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(product.createdAt),
                        "minute"
                      )} Minutes ago`
                    : dayjs().diff(dayjs(product.createdAt), "hour") < 24
                    ? `${dayjs().diff(
                        dayjs(product.createdAt),
                        "hour"
                      )} Hours ago`
                    : dayjs(product.createdAt).format("hh:mmA DD/MM/YYYY")
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                Ngày chỉnh sửa:{" "}
                {product.updatedAt &&
                dayjs(product.updatedAt).format("hh:mm DD/MM/YYYY")
                  ? dayjs().diff(dayjs(product.updatedAt), "minute") < 60
                    ? `${dayjs().diff(
                        dayjs(product.updatedAt),
                        "minute"
                      )} phút trước`
                    : dayjs().diff(dayjs(product.updatedAt), "hour") < 24
                    ? `${dayjs().diff(
                        dayjs(product.updatedAt),
                        "hour"
                      )} giờ trước`
                    : dayjs(product.updatedAt).format("hh:mmA DD/MM/YYYY")
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
