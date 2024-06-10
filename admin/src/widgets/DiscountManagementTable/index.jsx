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
import { DISCOUNTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import discounts_manangement from "@db/discounts_managements";

// data placeholder

const DiscountManagementTable = () => {
  const { width } = useWindowSize();

  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState(discounts_manangement);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");

  const getQty = (category) => {
    if (category === "all") return discounts_manangement.length;
    return discounts_manangement.filter(
      (product) => product.discount_is_active === category
    ).length;
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

  const dataByStatus = () => {
    if (category === "all") return data;
    return data.filter((product) => product.discount_is_active === category);
  };

  const pagination = usePagination(dataByStatus(), 8);

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

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-header">Mã giảm giá:</span>
        <div>
          {[
            { value: "all", label: "Tất cả" },
            { value: true, label: "Đang hoạt động" },
            { value: false, label: "Không hoạt động" },
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
