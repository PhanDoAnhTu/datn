import useSubmenu from "@hooks/useSubmenu";
import Submenu from "@ui/Submenu";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import { useNavigate } from "react-router-dom";

const Actions = ({ record, table }) => {
  const navigate = useNavigate();
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();

  return (
    <>
      <SubmenuTrigger onClick={handleClick} />
      <Submenu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <div className="flex flex-col items-start gap-5 p-5">
          <button
            onClick={() =>
              navigate(`/${table}-detail/${record.id}`, {
                state: { record },
              })
            }
            className="menu-btn subheading-2"
          >
            <span className="icon-wrapper">
              <i className="icon icon-eye-regular" />
            </span>
            Chi tiết
          </button>
          {record.status === "publish" ? (
            ""
          ) : (
            <button
              className="menu-btn subheading-2"
              onClick={() =>
                alert(`category with id ${record.id} will move to publish`)
              }
            >
              <span className="icon-wrapper">
                <i className="icon icon-chevron-right-regular" />
              </span>
              Xuất bản
            </button>
          )}
          {record.status === "draft" ? (
            ""
          ) : (
            <button
              className="menu-btn subheading-2"
              onClick={() =>
                alert(`category with id ${record.id} will move to draft`)
              }
            >
              <span className="icon-wrapper">
                <i className="icon icon-chevron-right-regular" />
              </span>
              Chuyển thành bản nháp
            </button>
          )}
          {record.status === "trash" ? (
            ""
          ) : (
            <button
              className="menu-btn subheading-2"
              onClick={() =>
                alert(`category with id ${record.id} will move to trash`)
              }
            >
              <span className="icon-wrapper">
                <i className="icon icon-chevron-right-regular" />
              </span>
              Chuyển vào thùng rác
            </button>
          )}
        </div>
      </Submenu>
    </>
  );
};
export default Actions;
