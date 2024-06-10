import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavigateBtn({ link, title, className, state }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(link, state)}
      className={`btn  ${className}`}
    >
      {title}
    </button>
  );
}
