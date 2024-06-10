import DropFiles from "@components/DropFiles";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";
import classNames from "classnames";

export const PRODUCTS_EDITOR_COLUMN_DEFS = [
  {
    id: 1,
    title: (
      <div className="flex items-center justify-center">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "image",
    width: 45,
    render: (image) => (
      <div className="md:w-[80px] md:h-[80px] h-[50px] w-[50px] flex items-center justify-center">
        <DropFiles wrapperClass="media-dropzone w-full h-full text-center">
          <MediaDropPlaceholder />
        </DropFiles>
      </div>
    ),
  },
  {
    id: 3,
    title: "Price",
    dataIndex: "sku_price",
    width: 200,
    render: (sku_price) => (
      <div className="flex flex-col">
        <div className="field-wrapper">
          <input
            className={classNames("field-input focus:text-left text-center")}
            type="text"
            value={sku_price}
            placeholder=""
          />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: "Stock",
    dataIndex: "sku_stock",
    width: 200,
    render: (sku_stock) => (
      <div className="flex flex-col">
        <div className="field-wrapper">
          <input
            className={classNames("field-input focus:text-left text-center")}
            type="text"
            value={sku_stock}
            placeholder=""
          />
        </div>
      </div>
    ),
  },
];
