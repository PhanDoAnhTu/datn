import React from "react";
import Submenu from "./Submenu";
import useSubmenu from "@hooks/useSubmenu";
import { Checkbox } from "antd";

export default function SizePicker({
  selectedSizes,
  sizes,
  setSizes,
  handleSizeAdd,
}) {
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
        <div className="!bg-transparent p-4 grid grid-cols-3 justify-between gap-2">
          <div className="flex space-x-2">
            <Checkbox
              value={"XS"}
              checked={
                sizes.findIndex((item) => item.size === "XS") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 0, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>XS</span>
          </div>
          <div className="flex space-x-2">
            <Checkbox
              value={"S"}
              checked={
                sizes.findIndex((item) => item.size === "S") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 1, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>S</span>
          </div>
          <div className="flex space-x-2">
            <Checkbox
              value={"M"}
              checked={
                sizes.findIndex((item) => item.size === "M") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 2, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>M</span>
          </div>
          <div className="flex space-x-2">
            <Checkbox
              value={"L"}
              checked={
                sizes.findIndex((item) => item.size === "L") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 3, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>L</span>
          </div>
          <div className="flex space-x-2">
            <Checkbox
              value={"XL"}
              checked={
                sizes.findIndex((item) => item.size === "XL") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 4, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>XL</span>
          </div>
          <div className="flex space-x-2">
            <Checkbox
              value={"XXL"}
              checked={
                sizes.findIndex((item) => item.size === "XXL") !== -1
                  ? true
                  : false
              }
              onChange={(e) => {
                if (
                  sizes.findIndex((item) => item.size === e.target.value) === -1
                ) {
                  setSizes((prevState) => [
                    ...prevState,
                    { value: 5, size: e.target.value },
                  ]);
                } else {
                  setSizes(
                    sizes.filter((item) => item.size !== e.target.value)
                  );
                }
              }}
            />
            <span>XXL</span>
          </div>
        </div>
        <div className="grid grid-cols-2 !bg-transparent">
          <button
            onClick={(e) => {
              handleSizeAdd(e);
              handleClose();
            }}
            type="button"
            className="btn btn--primary"
          >
            Confirm
          </button>
          <button onClick={handleClose} className="btn btn--secondary">
            Cancel
          </button>
        </div>
      </Submenu>
    </>
  );
}
