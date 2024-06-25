// components
import RatingStars from "@ui/RatingStars";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import Timestamp from "@ui/Timestamp";
import { Link, NavLink } from "react-router-dom";
import Trend from "@ui/Trend";
import Counter from "@components/Counter";

// utils
import { getCategory, getStatusColor, numFormatter } from "@utils/helpers";
import dayjs from "dayjs";
import Actions from "@components/Actions";
import EditBtn from "@components/EditBtn";
import NavigateBtn from "@components/NavigateBtn";
import { Switch } from "antd";

export const ORDERS_COLUMN_DEFS = [
  {
    title: "# order",
    dataIndex: "order_trackingNumber",
    width: "100px",
    render: (text) => <span className="subheading-2">#{text}</span>,
  },
  {
    title: "Ngày đặt",
    dataIndex: "createdAt",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "payment",
    render: (payment) => (
      <div className="flex flex-col">
        <span className="font-heading font-bold text-header">
          Thanh toán bằng ví MoMo
        </span>
      </div>
    ),
  },
  {
    title: "Tình trạng đơn hàng",
    dataIndex: "order_status",
    render: (status) => (
      <span
        className="badge-status badge-status--lg"
        style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      >
        {status === "pending"
          ? "Đợi xác nhận"
          : status === "confirmed"
          ? "Đã xác nhận"
          : status === "shipped"
          ? "Đã hoàn thành"
          : "Đã hủy"}
      </span>
    ),
  },
  {
    title: "",
    dataIndex: "actions",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <NavLink
          to={`/order-detail/${record._id}`}
          className="btn btn--social"
          aria-label="Edit"
        >
          <i className="icon icon-eye-regular text-lg leading-none" /> Chi tiết
        </NavLink>
      </div>
    ),
  },
];

export const TRANSACTIONS_COLUMN_DEFS = [
  {
    title: "Date & Time",
    dataIndex: "timestamp",
    render: (timestamp) => <Timestamp date={timestamp} />,
  },
  {
    title: "Seller",
    dataIndex: "seller",
    render: (text, record) => {
      return (
        <>
          {record.seller ? (
            <div className="flex items-center gap-[18px]">
              <div className="img-wrapper w-[60px] h-[60px] flex items-center justify-center shrink-0">
                <img
                  className="max-w-[50px]"
                  src={record.seller.logo}
                  alt={record.seller.name}
                />
              </div>
              <span className="hidden truncate lg:inline">
                {record.seller.name}
              </span>
            </div>
          ) : (
            "N/A"
          )}
        </>
      );
    },
  },
  {
    title: "SKU",
    dataIndex: "sku",
    responsive: ["lg"],
  },
  {
    title: "Method",
    dataIndex: "method",
    responsive: ["xxl"],
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (type) => <span className="capitalize">{type}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <span
        className="badge-status"
        style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Country",
    dataIndex: "country",
    responsive: ["xxl"],
  },
  {
    title: "Curr",
    dataIndex: "currency",
    responsive: ["xl"],
  },
  {
    title: "Fee",
    dataIndex: "fee",
    responsive: ["xl"],
  },
  {
    title: "Tax",
    dataIndex: "tax",
    responsive: ["xl"],
  },
  {
    title: "Total",
    dataIndex: "total",
    render: (text, record) => {
      const total = record.fee - (record.fee / 100) * record.tax;

      return (
        <span className="font-heading font-semibold text-header">
          ${total.toFixed(2)}
        </span>
      );
    },
  },
];

export const SELLERS_COLUMN_DEFS = [
  {
    title: "Seller",
    dataIndex: "seller",
    render: (text, record) => (
      <div className="flex gap-[26px]">
        <div className="img-wrapper flex items-center justify-center w-[63px] h-[63px] shrink-0">
          <img className="max-w-[50px]" src={record.logo} alt={record.name} />
        </div>
        <div className="flex flex-col items-start">
          <a
            className="subheading-2"
            href={record.website}
            target="_blank"
            rel="noreferrer"
          >
            www.website.com
          </a>
          <a className="mt-3 mb-2.5" href={`tel:${record.phone}`}>
            {record.phone}
          </a>
          <a href={`mailto:${record.email}`}>{record.email}</a>
        </div>
      </div>
    ),
  },
  {
    title: "Orders value",
    dataIndex: "ordersValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={65874} />
        <span className="label-text mt-0.5 mb-2.5">New orders</span>
        <Trend value={55.96} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Income value",
    dataIndex: "incomeValue",
    render: () => (
      <div className="flex flex-col">
        <Counter className="h3" num={23000} prefix="$" isFormatted />
        <span className="label-text mt-0.5 mb-2.5">Income</span>
        <Trend value={14.56} />
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Review rate",
    dataIndex: "rating",
    render: (rating) => <RatingStars rating={rating} />,
  },
  {
    title: "Sales categories value",
    dataIndex: "salesCategoriesValue",
    render: (text, record) => (
      <div className="flex flex-col gap-2.5 max-w-[220px]">
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Electronics</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.electronics, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Fashion</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.fashion, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Food & Drinks</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.food, 2, "$")}
          </span>
        </div>
        <div className="flex justify-between font-heading font-bold text-sm">
          <span>Services</span>
          <span className="text-header text-right">
            {numFormatter(record.profit.services, 2, "$")}
          </span>
        </div>
      </div>
    ),
    responsive: ["xl"],
  },
  {
    title: "Other",
    dataIndex: "other",
    render: () => (
      <div className="flex items-center justify-end gap-5">
        <button aria-label="Edit">
          <i className="icon icon-pen-to-square-regular text-lg leading-none" />
        </button>
        <SubmenuTrigger />
      </div>
    ),
  },
];

export const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: (
      <div className="flex items-center justify-center">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "product_thumb",
    width: 45,
    render: (image) => (
      <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
        <img src={image} alt="product" />
      </div>
    ),
  },
  {
    title: "Tên",
    dataIndex: "product_name",
    render: (text) => (
      <span className="inline-block h6 !text-sm max-w-[155px]">{text}</span>
    ),
  },
  {
    title: "Kho",
    dataIndex: "product_quantity",
    width: 130,
    render: (stock) => (
      <div className="flex items-center gap-5">
        {stock == null ? (
          "On Demand"
        ) : (
          <span>
            <span className={`${stock !== 0 ? "text-green" : "text-red"}`}>
              {stock !== 0
                ? stock >= 10
                  ? "Còn hàng "
                  : "Hàng còn ít "
                : "Hết hàng "}
            </span>
            ({stock})
          </span>
        )}
      </div>
    ),
  },
  {
    title: "Giá",
    dataIndex: "product_price",
    render: (price) => <span>${price ? price.toFixed(2) : "0.00"}</span>,
  },
  {
    title: "Danh mục",
    dataIndex: "product_category",
    width: 125,
    render: (categories) => (
      <div className="flex flex-wrap gap-x-0.5">
        {categories && categories.length
          ? categories.map((tag, index) => (
              <button className="tag text-accent capitalize" key={tag}>
                {tag}
                {index !== categories.length - 1 && ","}
              </button>
            ))
          : "-"}
      </div>
    ),
    responsive: ["xl"],
  },
  {
    title: "Thuộc tính",
    dataIndex: "product_attributes",
    width: 200,
    render: (categories) => (
      <div className="flex flex-wrap gap-x-0.5">
        {categories && categories.length
          ? categories.map((attribute) => {
              return attribute.attribute_value_list.map((value, subindex) => (
                <button className="tag text-accent capitalize" key={subindex}>
                  {value.attribute_value}
                  {subindex !== attribute.attribute_value_list.length - 1 &&
                    ","}
                </button>
              ));
            })
          : "-"}
      </div>
    ),
    responsive: ["xl"],
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date) => (
      <div className="flex flex-col">
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "updatedAt",
    render: (date) => (
      <div className="flex flex-col">
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "actions",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn link={`/product-editor/${record._id}`} record={record} />
        <Actions record={record} table={"product"} />
      </div>
    ),
  },
];

export const ORDERDETAIL_MANAGEMENT_COLUMN_DEFS = [
  {
    title: (
      <div className="flex items-center justify-start">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "product_thumb",
    render: (image) => (
      <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
        <img src={image} alt="product" />
      </div>
    ),
  },
  {
    title: "Tên",
    dataIndex: "productId",
    render: (text) => <span className="inline-block h6 !text-sm ">{text}</span>,
  },
  {
    title: "SKU",
    width: 200,
    dataIndex: "sku_id",
    render: (sku_id) => (
      <span className="inline-block h6 !text-sm ">{sku_id}</span>
    ),
  },
  {
    title: "Giá",
    dataIndex: "price",
    render: (price) => (
      <span className="inline-block h6 !text-sm">{price}VND</span>
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    render: (qty) => <span className="inline-block h6 !text-sm ">{qty}</span>,
  },
  {
    title: "Tổng",
    dataIndex: "record",
    width: 125,
    render: (text, record) => (
      <span className="inline-block h6 !text-sm">
        {record.price * record.quantity}VND
      </span>
    ),
    responsive: ["xl"],
  },
];

export const CATEGORIES_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên",
    dataIndex: "category_name",
    render: (category_name) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {category_name}
      </span>
    ),
  },

  {
    title: "Danh mục cha",
    dataIndex: "parent_id",
    render: (category_parent_id) => {
      if (category_parent_id) {
        return (
          <button
            className="text-accent capitalize"
            onClick={() => alert("navigate to " + category_parent_id)}
          >
            {category_parent_id}
          </button>
        );
      } else {
        return <span className="capitalize">-</span>;
      }
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (createdAt) => (
      <div>
        <span className="font-bold text-header">
          {createdAt && dayjs(createdAt).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "updatedAt",
    render: (updatedAt) => (
      <div>
        <span className="font-bold text-header">
          {updatedAt && dayjs(updatedAt).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(updatedAt), "minute") < 60
              ? `${dayjs().diff(dayjs(updatedAt), "minute")} giờ trước`
              : dayjs().diff(dayjs(updatedAt), "hour") < 24
              ? `${dayjs().diff(dayjs(updatedAt), "hour")} giờ trước`
              : dayjs(updatedAt).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "category",
    render: (text, record) => {
      return (
        <div className="flex items-center justify-end gap-11">
          <EditBtn link={`/category-editor/${record._id}`} record={record} />
          <Actions record={record} table={"category"} />
        </div>
      );
    },
  },
];

export const TOPICS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên",
    dataIndex: "label",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "dateModified",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Actions",
    dataIndex: "topic",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn link={"/topic-editor"} record={record} title={"Topic Edit"} />
        <Actions record={record} table={"topic"} />
      </div>
    ),
  },
];

export const POSTS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên",
    dataIndex: "label",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Chủ đề",
    dataIndex: "topicID",
    render: (topicID) => {
      if (topicID) {
        return (
          <button
            className="text-accent capitalize"
            onClick={() => alert("navigate to " + topicID)}
          >
            {topicID}
          </button>
        );
      } else {
        return <span className="capitalize">-</span>;
      }
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "dateModified",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "post",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn link={"/post-editor"} record={record} title={"Post Edit"} />
        <Actions record={record} table={"post"} />
      </div>
    ),
  },
];

export const BRANDS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: (
      <div className="flex items-center justify-center">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "brand_image",
    width: 45,
    render: (image) => (
      <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
        <img src={image} alt="product" />
      </div>
    ),
  },
  {
    title: "Tên thương hiệu",
    dataIndex: "brand_name",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "updatedAt",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "brand",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn link={"/brand-editor"} record={record} title={"Brand Edit"} />
        <Actions record={record} table={"brand"} />
      </div>
    ),
  },
];

export const SLIDERS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: (
      <div className="flex items-center justify-center">
        <i className="icon-image-regular text-[26px]" />
      </div>
    ),
    dataIndex: "slider_image",
    width: 90,
    render: (slider_image) => (
      <div className="img-wrapper w-[90px] h-[45px] flex items-center justify-center">
        <img src={slider_image} alt="product" />
      </div>
    ),
  },
  {
    title: "Tên",
    dataIndex: "slider_name",
    render: (slider_name) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {slider_name}
      </span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "updatedAt",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "slider",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn
          link={`/slider-editor/${record._id}`}
          record={record}
          title={"Brand Edit"}
        />
        <Actions record={record} table={"slider"} />
      </div>
    ),
  },
];

export const CONTACTS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tiêu đề",
    dataIndex: "contact_title",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdOn",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["sm"],
  },
  {
    title: "Ngày phản hồi",
    dataIndex: "modifiedOn",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} phút trước`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} giờ trước`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["sm"],
  },
  {
    title: "Đã phản hồi",
    dataIndex: "isReply",
    render: (reply_id) => (
      <div>
        <span className="font-bold text-header">
          {reply_id === false ? "CHƯA" : "CÓ"}
        </span>
      </div>
    ),
    responsive: ["sm"],
  },
  {
    width: 150,
    dataIndex: "topic",
    render: (text, record) => (
      <div className="flex items-center justify-end">
        {record.isReply === false ? (
          <NavigateBtn
            className={"btn--outline blue"}
            title={"Trả lời"}
            state={{
              state: { _id: record._id },
            }}
            link={`/support/res`}
          />
        ) : (
          <span className="font-bold text-header">
            Trả lời bởi: {record.reply_by}
          </span>
        )}
      </div>
    ),
  },
];

export const PAGES_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tiêu đề",
    dataIndex: "label",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "dateModified",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} Minutes ago`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} Hours ago`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "page",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn
          link={`/page-editor/${record._id}`}
          record={record}
          title={"Page Edit"}
        />
        <Actions record={record} table={"page"} />
      </div>
    ),
  },
];

export const MENUS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên",
    dataIndex: "label",
    render: (label) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
    ),
  },
  {
    title: "Đường dẫn",
    dataIndex: "path",
    render: (path) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">{path}</span>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("DD/MM/YYYY")}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày chỉnh sửa",
    dataIndex: "dateModified",
    render: (date) => (
      <div>
        <span className="font-bold text-header">
          {date && dayjs(date).format("hh:mm DD/MM/YYYY")
            ? dayjs().diff(dayjs(date), "minute") < 60
              ? `${dayjs().diff(dayjs(date), "minute")} Minutes ago`
              : dayjs().diff(dayjs(date), "hour") < 24
              ? `${dayjs().diff(dayjs(date), "hour")} Hours ago`
              : dayjs(date).format("hh:mmA DD/MM/YYYY")
            : ""}
        </span>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Chức năng",
    dataIndex: "menu",
    render: (text, record) => (
      <div className="flex items-center justify-end gap-11">
        <EditBtn
          link={"/menu-editor/" + record._id}
          record={record}
          title={"Page Edit"}
        />
        <Actions record={record} table={"menu"} />
      </div>
    ),
  },
];

export const DISCOUNTS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên",
    dataIndex: "discount_name",
    render: (discount_name) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {discount_name}
      </span>
    ),
  },
  {
    title: "Mã giảm giá",
    dataIndex: "discount_code",
    render: (discount_code) => (
      <span className="inline-block h6 !text-sm max-w-[200px]">
        {discount_code}
      </span>
    ),
  },
  {
    title: "Áp dụng với",
    dataIndex: "discount_applies_to",
    render: (discount_applies_to) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {discount_applies_to === "all"
          ? "Tất cả sản phẩm"
          : "Sản phẩm nhất định"}
      </span>
    ),
  },
  {
    title: "Số lượng đã dùng",
    dataIndex: "discount_uses_count",
    render: (discount_uses_count) => (
      <span className="inline-block h6 !text-sm max-w-[50px]">
        {discount_uses_count}
      </span>
    ),
    responsive: ["lg"],
  },
  {
    title: "Ngày bắt đầu - Ngày kêt thúc",
    dataIndex: "dateAdded",
    render: (date, record) => (
      <div>
        <div className="font-bold text-header">
          Bắt đầu:{" "}
          {record && dayjs(record.discount_start_date).format("DD/MM/YYYY")}
        </div>
        <div className="font-bold text-header">
          Kết thúc:{" "}
          {record && dayjs(record.discount_end_date).format("DD/MM/YYYY")}
        </div>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Hoạt động",
    dataIndex: "status",
    render: (status, record) => (
      <div>
        <Switch
          checkedChildren={"ON"}
          unCheckedChildren={"OFF"}
          onClick={() =>
            alert("run a function that will change discount_is_active")
          }
          onChange={() =>
            alert("Call a function to reload data when onClick is run")
          }
          loading={false}
          checked={record.discount_is_active}
        />
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "category",
    render: (text, record) => {
      return (
        <div className="flex items-center justify-end">
          <Link className="btn info-btn" to={"/test"}>
            <i className="icon icon-circle-info-solid text-lg" />
          </Link>
          <Link className="btn info-btn" to={"/test"}>
            <i className="icon icon-trash-regular text-lg hover:text-red" />
          </Link>
        </div>
      );
    },
  },
];

export const PROMOTIONS_MANAGEMENT_COLUMN_DEFS = [
  {
    title: "Tên chương trình",
    dataIndex: "special_offer_name",
    render: (special_offer_name) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {special_offer_name}
      </span>
    ),
  },
  {
    title: "Mô tả",
    dataIndex: "special_offer_description",
    render: (special_offer_description) => (
      <span className="inline-block h6 !text-sm max-w-[150px]">
        {special_offer_description}
      </span>
    ),
  },
  {
    title: "Ngày bắt đầu - Ngày kêt thúc",
    dataIndex: "dateAdded",
    render: (date, record) => (
      <div>
        <div className="font-bold text-header">
          Bắt đầu:{" "}
          {record &&
            dayjs(record.special_offer_start_date).format("DD/MM/YYYY")}
        </div>
        <div className="font-bold text-header">
          Kết thúc:{" "}
          {record && dayjs(record.special_offer_end_date).format("DD/MM/YYYY")}
        </div>
      </div>
    ),
    responsive: ["lg"],
  },
  {
    title: "Hoạt động",
    dataIndex: "status",
    render: (status, record) => (
      <div>
        <Switch
          checkedChildren={"ON"}
          unCheckedChildren={"OFF"}
          onClick={() =>
            alert("run a function that will change discount_is_active")
          }
          onChange={() =>
            alert("Call a function to reload data when onClick is run")
          }
          loading={false}
          checked={record.special_offer_is_active}
        />
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "category",
    render: (text, record) => {
      return (
        <div className="flex items-center justify-end">
          <Link className="btn info-btn" to={"/test"}>
            <i className="icon icon-circle-info-solid text-lg" />
          </Link>
          <Link className="btn info-btn">
            <i className="icon icon-trash-regular text-lg hover:text-red" />
          </Link>
        </div>
      );
    },
  },
];
