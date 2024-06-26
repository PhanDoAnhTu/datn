// components
import FilterItem from "@ui/FilterItem";
import Select from "@ui/Select";
import StyledTable from "./styles";
import Empty from "@components/Empty";
import Pagination from "@ui/Pagination";
import ProductManagementCollapseItem from "@components/ProductManagementCollapseItem";
import { changeIsPublishedCategory, findAllCategory, isTrashcategory } from "../../store/actions";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import {
  // MANAGEMENT_OPTIONS,
  ADDITIONAL_OPTIONS,
  SELECT_OPTIONS,
} from "@constants/options";
// import { CATEGORIES_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder
// import categories_management from "@db/categories_management";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Switch } from "antd";
import Actions from "@components/Actions";

const CategoryManagementTable = ({ searchQuery }) => {

  const CATEGORIES_MANAGEMENT_COLUMN_DEFS = [
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
      title: "Hoạt động",
      dataIndex: "isPublished",
      render: (status, record) => (
        <div>
          {
            record.isDeleted === false
              ? <Switch
                checkedChildren={"ON"}
                unCheckedChildren={"OFF"}
                onChange={(e) => handleChangeStatus(record?._id, e)}
                loading={false}
                value={record?.isPublished}
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
      dataIndex: "category",
      render: (text, record) => {
        return (
          <div className="flex items-center justify-end gap-11">
            <Actions record={record} table={"category"} handleTrash={() => record.isDeleted === true ? onRemove(record._id, false) : onRemove(record._id, true)} handleDraft={() => handleChangeStatus(record._id, false)} />
          </div>
        );
      },
    },
  ];
  const { width } = useWindowSize();

  const defaultFilters = {
    parentCategory: null,
  };
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };
  const dispatch = useDispatch()
  const [categories_management, setCategories_management] = useState([])
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [filters, setFilters] = useState(defaultFilters);
  const [activeCollapse, setActiveCollapse] = useState("");

  const fetchDataCategory = async () => {
    const resultCat = await dispatch(findAllCategory())
    setCategories_management(resultCat?.payload?.metaData)
  }
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    fetchDataCategory()
  }, [isLoad])
  useEffect(() => {
    setData(categories_management)
  }, [categories_management])
  const getQty = (category) => {
    if (category === "all") return data.filter((product) => product.isDeleted === false).length;
    if (category === "isPublished") return data.filter((product) => product.isPublished === true).length;
    if (category === "UnPublished") return data.filter((product) => product.isPublished === false & product.isDeleted === false).length;
    if (category === "isDeleted") return data.filter((product) => product.isDeleted === true).length;
    if (category === "isDraft") return data.filter((product) => product.isDraft === true).length;
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
              ? a.category_name.toLowerCase() > b.category_name.toLowerCase()
                ? 1
                : -1
              : a.category_name.toLowerCase() < b.category_name.toLowerCase()
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

  useEffect(() => {
    if (searchQuery !== "") {
      setData(
        data.filter((item) =>
          item.category_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setData(categories_management);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleFilterSelect = ({ value, label }, name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };

  const handleApplyFilters = () => {
    if (filters.parentCategory != null) {
      setData(
        categories_management.filter(
          (item) => item.parentCategory === filters.parentCategory.category_name
        )
      );
    }
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    return setData(categories_management);
  };

  const dataByStatus = (category) => {
    if (category === "all") return data.filter((product) => product.isDeleted === false);
    if (category === "isPublished") return data.filter((product) => product.isPublished === true);
    if (category === "UnPublished") return data.filter((product) => product.isPublished === false & product.isDeleted === false);
    if (category === "isDeleted") return data.filter((product) => product.isDeleted === true);
    if (category === "isDraft") return data.filter((product) => product.isDraft === true);
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

  const handleChangeStatus = async (category_id, e) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      changeIsPublishedCategory({
        category_id: category_id,
        isPublished: e,
      })
    );
    if (changeStatus?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: `Đã ${e === false ? "tắt" : "áp dụng"}`,
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
  const onRemove = async (category_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashcategory({ category_id: category_id, isDeleted: isDeleted })
    );
    if (
      (changeStatus?.payload?.status === (200 || 201)) &
      (changeStatus?.payload?.metaData?.nModified === 1)
    ) {
      toast.update(id, {
        render: `Đã chuyển vào thùng rác`,
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
        <span className="text-header">Danh mục:</span>
        <div>
          {[{ value: "all", label: "Tất cả" },
          { value: "isPublished", label: "Đang hoạt động" },
          { value: "UnPublished", label: "Không hoạt động" },
          { value: "isDraft", label: "Bản nháp" },
          { value: "isDeleted", label: "Thùng rác" },
          ]?.map((option, index) => (
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6">
        <Select
          options={[
            { value: null, label: "Không có" },
            ...categories_management?.map((item) => ({
              value: item._id,
              label: item.category_name,
            })),
          ]}
          value={filters.parentCategory}
          placeholder="Chọn danh mục"
          onChange={(e) => handleFilterSelect(e, "parentCategory")}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn btn--secondary !gap-[5px]"
            onClick={handleApplyFilters}
          >
            Lọc <i className="icon-chevron-right-regular text-sm" />
          </button>
          <button
            className="btn btn--outline blue !h-[44px]"
            onClick={handleClearFilters}
          >
            Xóa
          </button>
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
            columns={CATEGORIES_MANAGEMENT_COLUMN_DEFS}
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

export default CategoryManagementTable;
