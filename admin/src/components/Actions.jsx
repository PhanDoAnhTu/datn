import useSubmenu from "@hooks/useSubmenu";
import Submenu from "@ui/Submenu";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import { useNavigate } from "react-router-dom";
import EditBtn from "./EditBtn";

const Actions = ({ record, table, handleTrash, handleDraft }) => {
  const navigate = useNavigate();
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();

  return (
    <>
      <SubmenuTrigger onClick={handleClick} />
      <Submenu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <div className="flex flex-col items-start gap-5 p-5">
          <button
            onClick={() =>
              navigate(`/${table}-detail/${record._id}`, {
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
          {record.isDeleted === false
            && <EditBtn link={`/${table}-editor/${record._id}`} record={record} title={`${table} Edit`} />
          }
          {record.isDeleted === undefined || record.isDeleted === null ? (
            ""
          ) : (
            record.isDeleted === true
              ? (
                <button
                  className="menu-btn subheading-2"
                  onClick={() =>
                    handleTrash()}
                >
                  <span className="icon-wrapper">
                    <i className="icon icon-chevron-right-regular" />
                  </span>
                  Khôi phục
                </button>
              )
              : (
                <button
                  className="menu-btn subheading-2"
                  onClick={() =>
                    handleTrash()}
                >
                  <span className="icon-wrapper">
                    <i className="icon icon-trash-regular text-lg group-hover:text-red" />
                  </span>
                  Chuyển vào thùng rác
                </button>
              )
          )}
          {/* {record.isPublished === false ? (
            <button
              className="menu-btn subheading-2"
              onClick={() =>
                handlePublish()}
            >
              <span className="icon-wrapper">
                <i className="icon icon-chevron-right-regular" />
              </span>
              Bật hoạt động
            </button>
          ) : (
            ""
          )} */}
          {record.isDraft === false ? (
            <button
              className="menu-btn subheading-2"
              onClick={() =>
                handleDraft()}
            >
              <span className="icon-wrapper">
                <i className="icon icon-chevron-right-regular" />
              </span>
              Chuyển thành bản nháp
            </button>
          ) : (
            ""
          )}

        </div>
      </Submenu>
    </>
  );
};
export default Actions;
