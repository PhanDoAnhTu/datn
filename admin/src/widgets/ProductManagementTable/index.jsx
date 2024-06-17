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
  PRODUCT_MANAGEMENT_OPTIONS,
  STOCK_STATUS_OPTIONS,
  ADDITIONAL_OPTIONS,
  SELECT_OPTIONS,
} from "@constants/options";
// import { PRODUCTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder
// import products_management from "@db/products_management";
import categories_management from "@db/categories_management";
import { useDispatch } from "react-redux";
import { onAllProductsOption } from "../../store/actions";
import EditBtn from "@components/EditBtn";
import Actions from "@components/Actions";
import dayjs from "dayjs";

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
        <span className="inline-block h6 !text-sm max-w-[155px]">{product_name}</span>
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
              <span className={`${product_quantity !== 0 ? "text-green" : "text-red"}`}>
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
  const { width } = useWindowSize();
  const defaultFilters = {
    stockStatus: null,
    parentCategory: null,
  };
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };
  const [products_management, setProducts_management] = useState([]);
  const [data, setData] = useState(products_management);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [filters, setFilters] = useState(defaultFilters);
  const [activeCollapse, setActiveCollapse] = useState("");

  const dispatch = useDispatch()

  const [isLoad, setIsLoad] = useState(false);

  const fetchDataProductsManagement = async () => {
    const responseProducts = await dispatch((onAllProductsOption({ isPublished: true })))
    if (responseProducts) {
      setProducts_management(responseProducts.payload.metaData)
    }
  }

  useEffect(() => {
    fetchDataProductsManagement()
  }, [isLoad])
  
  const getQty = (category) => {
    if (category === "all") return products_management.length;
    return products_management.filter((product) => product.status === category)
      .length;
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

  const handleApplyFilters = () => {
    if (filters.parentCategory != null) {
      setData(
        products_management.filter(
          (item) => item.category === filters.parentCategory.label
        )
      );
    }
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  const dataByStatus = () => {
    if (category === "all") return data;
    if (category === "isPublished") data.filter((product) => product.isPublished === true);
    if (category === "isDraft") data.filter((product) => product.isDraft === true);
    if (category === "isDeleted") data.filter((product) => product.isDeleted === true);
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
        <span className="text-header">Sản phẩm:</span>
        <div>
          {PRODUCT_MANAGEMENT_OPTIONS.map((option, index) => (
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
          options={STOCK_STATUS_OPTIONS}
          value={filters.stockStatus}
          placeholder="Stock Status"
          onChange={(e) => handleFilterSelect(e, "stockStatus")}
        />
        <Select
          options={categories_management}
          value={filters.parentCategory}
          placeholder="Category"
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
