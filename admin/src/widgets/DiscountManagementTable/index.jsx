// components
import FilterItem from "@ui/FilterItem";
import Select from "@ui/Select";
import StyledTable from "./styles";
import Empty from "@components/Empty";
import Pagination from "@ui/Pagination";
import ProductManagementCollapseItem from "@components/ProductManagementCollapseItem";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import { ADDITIONAL_OPTIONS, SELECT_OPTIONS } from "@constants/options";
// import { DISCOUNTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import discounts_manangement from "@db/discounts_managements";
import { Switch } from "antd";
import Actions from "@components/Actions";
import { changeIsActiveDiscount, onGetAllDiscount, isTrashDiscount } from "../../store/actions";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// data placeholder

const DiscountManagementTable = () => {
  const DISCOUNTS_MANAGEMENT_COLUMN_DEFS = [
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
      dataIndex: "date",
      render: (date, record) => (
        <div>
          <div className="font-bold text-header">
            Bắt đầu:{" "}
            {record && dayjs(record.discount_start_date).format("hh:mm DD/MM/YYYY")
              ? dayjs().diff(dayjs(record.discount_start_date), "minute") < 60
                ? `${dayjs().diff(dayjs(record.discount_start_date), "minute")} phút trước`
                : dayjs().diff(dayjs(record.discount_start_date), "hour") < 24
                  ? `${dayjs().diff(dayjs(record.discount_start_date), "hour")} giờ trước`
                  : dayjs(record.discount_start_date).format("hh:mmA DD/MM/YYYY")
              : ""}
          </div>
          <div className="font-bold text-header">
            Kết thúc:{" "}
            {dayjs(record?.special_offer_end_date).format("DD/MM/YYYY")}

          </div>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Hoạt động",
      dataIndex: "isPublished",
      render: (status, record) => (
        <div>
          {
            record.isDeleted === false
              ? <Switch
                checkedChildren={"ON"}
                unCheckedChildren={"OFF"}
                onChange={(e) => handleChangeStatus(e, record?._id)}
                loading={false}
                checked={record?.isPublished}
              />
              : <Switch
                disabled
                checkedChildren={"ON"}
                unCheckedChildren={"OFF"}
                loading={false}
                checked={false}
              />
          }
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex items-center justify-end gap-11">
            <Actions record={record} table={"Promotion"} handleTrash={() => record.isDeleted === true ? onRemovePromotion(record._id, false) : onRemovePromotion(record._id, true)} />
          </div>
        );
      },
    },
  ];

  const { width } = useWindowSize();
  const dispatch = useDispatch()
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState(discounts_manangement);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");



  const [isLoad, setIsLoad] = useState(false);

  const fetchDataPromotionManagement = async () => {
    const response = await dispatch(onGetAllDiscount());
    if (response) {
      setData(response.payload.metaData);
    }
  };

  useEffect(() => {
    fetchDataPromotionManagement();
  }, [isLoad]);

  const getQty = (category) => {
    if (category === "all") return data.filter((product) => product.isDeleted === false).length;
    if (category === "isPublished") return data.filter((product) => product.isPublished === true).length;
    if (category === "isDeleted") return data.filter((product) => product.isDeleted === true).length;
    if (category === "isDraft") return data.filter((product) => product.isPublished === false).length;

  };

  const handleSortChange = ({ value, label }, name) => {
    setSorts((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };
  useEffect(() => {
    if (sorts.sortBy.value === "label") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? a.discount_name.toLowerCase() > b.discount_name.toLowerCase()
                ? 1
                : -1
              : a.discount_name.toLowerCase() < b.discount_name.toLowerCase()
                ? 1
                : -1
          )
      );
    }
    if (sorts.sortBy.value === "discount_start_date") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.discount_start_date) <
                new Date(b.discount_start_date)
                ? 1
                : -1
              : new Date(a.discount_start_date) >
                new Date(b.discount_start_date)
                ? 1
                : -1
          )
      );
    }
    if (sorts.sortBy.value === "discount_end_date") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.discount_end_date) < new Date(b.discount_end_date)
                ? 1
                : -1
              : new Date(a.discount_end_date) > new Date(b.discount_end_date)
                ? 1
                : -1
          )
      );
    }
    if (sorts.sortBy.value === "discount_uses_count") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? a.discount_uses_count < b.discount_uses_count
                ? -1
                : 1
              : a.discount_uses_count > b.discount_uses_count
                ? -1
                : 1
          )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts.sortBy.value, sorts.sortOrder.value]);

  const dataByStatus = (category) => {
    if (category === "all") return data.filter((product) => product.isDeleted === false);
    if (category === "isPublished") return data.filter((product) => product.isPublished === true);
    if (category === "isDeleted") return data.filter((product) => product.isDeleted === true);
    if (category === "isDraft") return data.filter((product) => product.isPublished === false);

  };

  const pagination = usePagination(dataByStatus(category), 8);

  // reset active collapse when page or window width changes
  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  const handleCollapse = (sku) => {
    if (activeCollapse === sku) {
      setActiveCollapse("");
    } else {
      setActiveCollapse(sku);
    }
  };

  const handleChangeStatus = async (e, discount_id) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      changeIsActiveDiscount({
        discount_id: discount_id,
        isPublished: e,
      })
    );
    if (changeStatus?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: `Mã giảm giá đã được ${e === false ? "tắt" : "áp dụng"
          }`,
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Thay đổi trạng thái không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setIsLoad(!isLoad);
  };
  const onRemovePromotion = async (discount_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashDiscount({ discount_id: discount_id, isDeleted: isDeleted })
    );
    if (
      (changeStatus?.payload?.status === (200 || 201)) &
      (changeStatus?.payload?.metaData?.nModified === 1)
    ) {
      toast.update(id, {
        render: `Mã giảm giá này vào thùng rác`,
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    } else {
      toast.update(id, {
        render: "Xóa không thành công",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
    }
    setIsLoad(!isLoad);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-header">Mã giảm giá:</span>
        <div>
          {[
            { value: "all", label: "Tất cả" },
            { value: "isPublished", label: "Đang hoạt động" },
            { value: "isDraft", label: "Không hoạt động" },
            { value: "isDeleted", label: "Thùng rác" },
          ].map((option, index) => (
            <FilterItem
              key={`filter-${index}`}
              text={option.label}
              qty={getQty(option.value)}
              value={option.value}
              active={category}
              onClick={setCategory}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 mt-4 mb-5 md:flex-row md:justify-between md:items-end md:mt-5 md:mb-6">
        <p>Dữ liệu đang xem: {pagination.showingOf()}</p>
        <div className="md:min-w-[560px] grid md:grid-cols-2 gap-4">
          <Select
            options={[
              { value: "label", label: "Tên" },
              { value: "discount_start_date", label: "Ngày bắt đầu" },
              { value: "discount_end_date", label: "Ngày kết thúc" },
              { value: "discount_uses_count", label: "Số lượng đã dùng" },
            ]}
            value={sorts.sortBy}
            placeholder="Sort by"
            onChange={(e) => handleSortChange(e, "sortBy")}
          />
          <Select
            options={SELECT_OPTIONS}
            value={sorts.sortOrder}
            placeholder="Chọn hướng sắp xếp"
            onChange={(e) => handleSortChange(e, "sortOrder")}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <StyledTable
            columns={DISCOUNTS_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.discount_code}
            locale={{
              emptyText: <Empty text="No products found" />,
            }}
            rowSelection={{
              type: "checkbox",
            }}
            pagination={false}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {pagination.currentItems().map((product, index) => (
              <ProductManagementCollapseItem
                key={`product-${index}`}
                product={product}
                handleCollapse={handleCollapse}
                activeCollapse={activeCollapse}
              />
            ))}
          </div>
        )}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </div>
    </div>
  );
};

export default DiscountManagementTable;
