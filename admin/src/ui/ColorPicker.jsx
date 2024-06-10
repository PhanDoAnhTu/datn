import React from "react";
import { ChromePicker } from "react-color";
import Submenu from "./Submenu";
import useSubmenu from "@hooks/useSubmenu";

export default function ColorPicker({ color, setColor, handleColorAdd }) {
  const { anchorEl, open, handleClick, handleClose } = useSubmenu();
  return (
    <>
      <button
        className="img-wrapper !bg-transparent w-[60px] h-10"
        onClick={handleClick}
      >
        <i className="icon-plus-regular text-[12px]" />
      </button>
      <Submenu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <div className="">
          <input type="text" />
          <ChromePicker
            color={color}
            disableAlpha={true}
            onChangeComplete={(e) => setColor(e.hex)}
          />
          <div className="grid grid-cols-2 bg-white">
            <button
              onClick={(e) => {
                handleColorAdd(e);
                handleClose();
              }}
              type="button"
              className="btn hover:bg-slate-500 hover:rounded-none"
            >
              Add
            </button>
            <button
              onClick={handleClose}
              className="btn hover:bg-slate-500 hover:rounded-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </Submenu>
    </>
  );
}
