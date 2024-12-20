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
import {
  MANAGEMENT_OPTIONS,
  ADDITIONAL_OPTIONS,
  SELECT_OPTIONS,
} from "@constants/options";
import { MENUS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import { useDispatch } from "react-redux";
import { getAllMenu } from "../../store/actions/menu-actions";

// data placeholder

const MenuManagementTable = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState([]);
  const [og_data, setOGData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");

  const getQty = (category) => {
    if (category === "all") return data.length;
    if (category === "published")
      return data.filter((product) => product.isPublished === true).length;

    if (category === "trash")
      return data.filter((product) => product.isDeleted === true).length;
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllMenu());
      if (result) {
        setData(result?.payload?.metaData);
        setOGData(result?.payload?.metaData);
      }
    };
    fetchData();
  }, []);

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
              ? a.menu_label.toLowerCase() > b.menu_label.toLowerCase()
                ? 1
                : -1
              : a.menu_label.toLowerCase() < b.menu_label.toLowerCase()
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
              ? new Date(a.modifiedOn) < new Date(b.modifiedOn)
                ? 1
                : -1
              : new Date(a.modifiedOn) > new Date(b.modifiedOn)
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
              ? new Date(a.createdOn) < new Date(b.createdOn)
                ? 1
                : -1
              : new Date(a.createdOn) > new Date(b.createdOn)
              ? 1
              : -1
          )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts.sortBy.value, sorts.sortOrder.value]);

  useEffect(() => {
    if (searchQuery !== "") {
      setData(
        data.filter((item) =>
          item.menu_label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setData(og_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const dataByStatus = () => {
    if (category === "all") return data;
    if (category === "publish")
      return data.filter((product) => product.isPublished === true);

    if (category === "trash")
      return data.filter((product) => product.isDeleted === true);
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
        <span className="text-header">Categories:</span>
        <div>
          {[
            { value: "all", label: "Tất cả" },
            { value: "publish", label: "Xuất bản" },
            { value: "trash", label: "Rác" },
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
        <p>View categories: {pagination.showingOf()}</p>

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
            columns={MENUS_MANAGEMENT_COLUMN_DEFS}
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

export default MenuManagementTable;
