import React from "react";
import { useNavigate } from "react-router-dom";

export default function EditBtn({ link, record, title }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate(link, {
          state: { record: record, title: title },
        })
      }
      aria-label="Edit"
      className="menu-btn subheading-2"
    >
      <i className="icon icon-pen-to-square-regular text-lg leading-none" />
      Sửa
    </button>
  );
}
