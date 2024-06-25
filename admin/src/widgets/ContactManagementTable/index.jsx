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
import { SELECT_OPTIONS } from "@constants/options";
import { CONTACTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import { useDispatch } from "react-redux";
import { getAllContact } from "../../store/actions/contact-actions";

// data placeholder

const ContactManagementTable = ({ searchQuery }) => {
  const { width } = useWindowSize();

  const defaultSort = {
    sortBy: { label: "Tiêu đề", value: "contact_title" },
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState([]);
  const [category, setCategory] = useState(false);
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");

  const dispatch = useDispatch();

  const fetchData = async () => {
    const responseProducts = await dispatch(getAllContact());
    if (responseProducts) {
      setData(responseProducts.payload.metaData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getQty = (category) => {
    if (category === false)
      return data.filter((item) => item.isReply === false).length;
    return data.filter((item) => item.isReply === true).length;
  };

  const handleSortChange = ({ value, label }, name) => {
    setSorts((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };
  useEffect(() => {
    if (sorts.sortBy.value === "contact_title") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? a.contact_title.toLowerCase() > b.contact_title.toLowerCase()
                ? 1
                : -1
              : a.contact_title.toLowerCase() < b.contact_title.toLowerCase()
              ? 1
              : -1
          )
      );
    }
    if (sorts.sortBy.value === "modifiedOn") {
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
    if (sorts.sortBy.value === "createdOn") {
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
          item.contact_title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const dataByStatus = (category) => {
    if (category === false)
      return data.filter((item) => item.isReply === false);
    return data.filter((item) => item.isReply === true);
  };

  const pagination = usePagination(dataByStatus(category), 8);

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
        <span className="text-header">Liên hệ:</span>
        <div>
          {[
            { value: false, label: "Chưa phản hồi" },
            { value: true, label: "Đã phản hồi" },
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
              { label: "Tiêu đề", value: "contact_title" },
              { label: "Ngày tạo", value: "createdOn" },
              { label: "Ngày phản hồi", value: "modifiedOn" },
            ]}
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
            columns={CONTACTS_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record._id}
            locale={{
              emptyText: <Empty text="Không tìm thấy dữ liệu" />,
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

export default ContactManagementTable;
