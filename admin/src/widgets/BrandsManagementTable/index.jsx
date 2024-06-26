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
import { BRANDS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import brands_managements from "@db/brands_managements";
import { useDispatch } from "react-redux";
import { findAllBrand, changeIsPublishedBrand, isTrashBrand } from "../../store/actions";
import dayjs from "dayjs";
import Actions from "@components/Actions";
import { Switch } from "antd";
import { toast } from "react-toastify";

// data placeholder

const BrandManagementTable = ({ searchQuery }) => {
  const BRANDS_MANAGEMENT_COLUMN_DEFS = [
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
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex items-center justify-end gap-11">
          <Actions record={record} table={"brand"} handleTrash={() => record.isDeleted === true ? onRemove(record._id, false) : onRemove(record._id, true)} handleDraft={() => handleChangeStatus(record._id, false)} />
        </div>
      ),
    },
  ];
  const { width } = useWindowSize();
  const dispatch = useDispatch()
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };





  const [data, setData] = useState(brands_managements);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const fetchDatabrand = async () => {
    const allBrand = await dispatch(findAllBrand())
    setData(allBrand?.payload?.metaData)
  }
  useEffect(() => {
    fetchDatabrand()
  }, [isLoad])

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

  useEffect(() => {
    if (searchQuery !== "") {
      setData(
        data.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setData(brands_managements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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

  const handleChangeStatus = async (brand_id, e) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      changeIsPublishedBrand({
        brand_id: brand_id,
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
  const onRemove = async (brand_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashBrand({ brand_id: brand_id, isDeleted: isDeleted })
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
        <span className="text-header">Hãng:</span>
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
            columns={BRANDS_MANAGEMENT_COLUMN_DEFS}
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

export default BrandManagementTable;
