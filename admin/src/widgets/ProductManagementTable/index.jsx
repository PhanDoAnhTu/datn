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
  // PRODUCT_MANAGEMENT_OPTIONS,
  // STOCK_STATUS_OPTIONS,
  // ADDITIONAL_OPTIONS,
  SELECT_OPTIONS,
} from "@constants/options";

// data placeholder
import { useDispatch } from "react-redux";
import { findAllCategory, onAllProductsOption, PublishProduct, UnPublishProduct, isTrashProduct } from "../../store/actions";
// import EditBtn from "@components/EditBtn";
import Actions from "@components/Actions";
import dayjs from "dayjs";
import { CSVLink } from "react-csv";
import { NumericFormat } from "react-number-format";
import { Switch } from "antd";
import { toast } from "react-toastify";

const ProductManagementTable = () => {
  const PRODUCTS_MANAGEMENT_COLUMN_DEFS = [
    {
      title: (
        <div className="flex items-center justify-center">
          <i className="icon-image-regular text-[26px]" />
        </div>
      ),
      dataIndex: "product_thumb",
      width: 45,
      render: (product_thumb) => (
        <div className="img-wrapper w-[45px] h-[45px] flex items-center justify-center">
          <img src={product_thumb} alt="product" />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "product_name",
      render: (product_name) => (
        <span className="inline-block h6 !text-sm max-w-[155px]">
          {product_name}
        </span>
      ),
    },
    {
      title: "Kho",
      dataIndex: "product_quantity",
      width: 130,
      render: (product_quantity) => (
        <div className="flex items-center gap-5">
          {product_quantity == null ? (
            "On Demand"
          ) : (
            <span>
              <span
                className={`${product_quantity !== 0 ? "text-green" : "text-red"
                  }`}
              >
                {product_quantity !== 0
                  ? product_quantity >= 10
                    ? "Còn hàng "
                    : "Hàng còn ít "
                  : "Hết hàng "}
              </span>
              ({product_quantity})
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "product_price",
      render: (price) => (
        <span>
          <NumericFormat
            value={price}
            displayType="text"
            thousandSeparator={true}
            decimalScale={0}
            id="price"
            suffix={"đ"}
          />
        </span>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "product_category",
      width: 200,
      render: (categories) => (
        <div className="flex flex-wrap gap-x-0.5">
          {categories && categories.length > 0
            ? categories.map((tag, index) => (
              <span className="tag text-accent capitalize" key={tag}>
                {
                  categories_management
                    ?.slice()
                    .find((item) => item.value === tag)?.label
                }
                {index !== categories.length - 1 && " | "}
              </span>
            ))
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
      render: (text, record) => (
        <div className="flex items-center justify-end gap-11">
          <Actions record={record} table={"product"} handleTrash={() => record.isDeleted === true ? onRemove(record._id, false) : onRemove(record._id, true)} handleDraft={() => handleChangeStatus(record._id, false)} />
        </div>
      ),
    },
  ];
  const { width } = useWindowSize();
  const defaultFilters = {
    stockStatus: null,
    parentCategory: null,
  };
  const defaultSort = {
    sortBy: { value: "product_name", label: "Tên" },
    sortOrder: SELECT_OPTIONS[0],
  };
  const [categories_management, setCategoriesManagement] = useState([]);
  const [products_management, setProductsManagement] = useState([]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [filters, setFilters] = useState(defaultFilters);
  const [activeCollapse, setActiveCollapse] = useState("");

  const dispatch = useDispatch();

  const [isLoad, setIsLoad] = useState(false);

  const fetchDataProductsManagement = async () => {
    const responseProducts = await dispatch(onAllProductsOption({}));
    if (responseProducts) {
      setData(responseProducts.payload.metaData)
      // setProductsManagement(responseProducts.payload.metaData);
    }
    const responseCategory = await dispatch(
      findAllCategory({})
    );
    if (responseCategory) {
      setCategoriesManagement(
        responseCategory.payload.metaData.map((item) => {
          return { label: item.category_name, value: item._id };
        })
      );
    }
  };

  useEffect(() => {
    fetchDataProductsManagement();
  }, [isLoad]);

  // useEffect(() => {
  //   setData(products_management);
  // }, [products_management]);

  const getQty = (category) => {
    if (category === "all") return data.filter((product) => product.isDeleted === false).length;
    if (category === "isPublished") return data.filter((product) => product.isPublished === true).length;
    if (category === "UnPublished") return data.filter((product) => product.isPublished === false & product.isDeleted === false).length;
    if (category === "isDeleted") return data.filter((product) => product.isDeleted === true).length;
    if (category === "isDraft") return data.filter((product) => product.isDraft === true).length;
  };

  const handleFilterSelect = ({ value, label }, name) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };

  const handleSortChange = ({ value, label }, name) => {
    setSorts((prevState) => ({
      ...prevState,
      [name]: { label, value },
    }));
  };
  useEffect(() => {
    if (sorts.sortBy.value === "product_name") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? a.product_name.toLowerCase() > b.product_name.toLowerCase()
                ? 1
                : -1
              : a.product_name.toLowerCase() < b.product_name.toLowerCase()
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
              ? new Date(a.updatedAt) < new Date(b.updatedAt)
                ? 1
                : -1
              : new Date(a.updatedAt) > new Date(b.updatedAt)
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
              ? new Date(a.createdAt) < new Date(b.createdAt)
                ? 1
                : -1
              : new Date(a.createdAt) > new Date(b.createdAt)
                ? 1
                : -1
          )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorts.sortBy.value, sorts.sortOrder.value]);

  const handleApplyFilters = () => {
    if (filters.parentCategory != null) {
      setData(
        data.filter((item) =>
          item.product_category.includes(filters.parentCategory.value)
        )
      );
    }
    if (filters.stockStatus != null) {
      if (filters.stockStatus.value === "low") {
        setData(
          data
            .slice()
            .filter((item) => item.product_quantity < 10)
        );
      }
      if (filters.stockStatus.value === "high") {
        setData(
          data
            .slice()
            .filter((item) => item.product_quantity >= 10)
        );
      }
      if (filters.stockStatus.value === "out") {
        setData(
          data
            .slice()
            .filter((item) => item.product_quantity === 0)
        );
      }
    }
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setData(data);
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

  const handleChangeStatus = async (product_id, e) => {
    const id = toast.loading("Vui lòng đợi...");
    if (e === true) {
      const changeStatus = await dispatch(
        PublishProduct({
          product_id: product_id,
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
    }
    if (e === false) {
      const changeStatus = await dispatch(
        UnPublishProduct({
          product_id: product_id,
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
    }

    setIsLoad(!isLoad);
  };
  const onRemove = async (product_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashProduct({ product_id: product_id, isDeleted: isDeleted })
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
        <span className="text-header">Sản phẩm:</span>
        <div>
          {[{ value: "all", label: "Tất cả" },
          { value: "isPublished", label: "Đang hoạt động" },
          { value: "UnPublished", label: "Không hoạt động" },
          { value: "isDraft", label: "Bản nháp" },
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6">
        <Select
          options={[
            { label: "Còn hàng", value: "high" },
            { label: "Còn ít hàng", value: "low" },
            { label: "Hết hàng", value: "out" },
          ]}
          value={filters.stockStatus}
          placeholder="Kho"
          onChange={(e) => handleFilterSelect(e, "stockStatus")}
        />
        <Select
          options={categories_management}
          value={filters.parentCategory}
          placeholder="Danh mục"
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
        <div className="md:min-w-[560px] grid md:grid-cols-3 gap-4">
          <CSVLink className="btn btn--outline blue !h-[44px]" data={data}>
            Xuất Excel <i className="icon-file-export-solid" />
          </CSVLink>
          <Select
            options={[
              { value: "product_name", label: "Tên" },
              { value: "createdOn", label: "Ngày tạo" },
              { value: "modifiedOn", label: "Ngày chỉnh sửa" },
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
            columns={PRODUCTS_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record._id}
            locale={{
              emptyText: <Empty text="Không có sản phẩm" />,
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

export default ProductManagementTable;
