// components
import FilterItem from "@ui/FilterItem";
import Select from "@ui/Select";
import StyledTable from "./styles";
import Empty from "@components/Empty";
import Pagination from "@ui/Pagination";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import {
  MANAGEMENT_OPTIONS,
  ADDITIONAL_OPTIONS,
  SELECT_OPTIONS,
} from "@constants/options";
import { PAGES_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import pages_management from "@db/pages_management";
import PageManagementCollapseItem from "@components/PageManagementCollapseItem";

// data placeholder

const PageManagementTable = () => {
  const { width } = useWindowSize();
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState(pages_management);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");

  const getQty = (category) => {
    if (category === "all") return data.length;
    return data.filter((item) => item.status === category).length;
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
              ? a.label.toLowerCase() > b.label.toLowerCase()
                ? 1
                : -1
              : a.label.toLowerCase() < b.label.toLowerCase()
              ? 1
              : -1
          )
      );
    }
    if (sorts.sortBy.value === "date-modified") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.dateModified) < new Date(b.dateModified)
                ? 1
                : -1
              : new Date(a.dateModified) > new Date(b.dateModified)
              ? 1
              : -1
          )
      );
    }
    if (sorts.sortBy.value === "date-added") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.dateAdded) < new Date(b.dateAdded)
                ? 1
                : -1
              : new Date(a.dateAdded) > new Date(b.dateAdded)
              ? 1
              : -1
          )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts.sortBy.value, sorts.sortOrder.value]);

  const dataByStatus = () => {
    if (category === "all") return data;
    return data.filter((item) => item.status === category);
  };

  const pagination = usePagination(dataByStatus(), 8);

  // reset active collapse when page or window width changes
  useEffect(() => {
    setActiveCollapse("");
  }, [pagination.currentPage, width]);

  const handleCollapse = (id) => {
    if (activeCollapse === id) {
      setActiveCollapse("");
    } else {
      setActiveCollapse(id);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-header">Trang đơn:</span>
        <div>
          {MANAGEMENT_OPTIONS.map((option, index) => (
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
            options={ADDITIONAL_OPTIONS}
            value={sorts.sortBy}
            placeholder="Sort by"
            onChange={(e) => handleSortChange(e, "sortBy")}
          />
          <Select
            options={SELECT_OPTIONS}
            value={sorts.sortOrder}
            placeholder="Select Action"
            onChange={(e) => handleSortChange(e, "sortOrder")}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[22px]">
        {width >= 768 ? (
          <StyledTable
            columns={PAGES_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record.id}
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
            {pagination.currentItems().map((page, index) => (
              <PageManagementCollapseItem
                key={`page-${index}`}
                page={page}
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

export default PageManagementTable;
