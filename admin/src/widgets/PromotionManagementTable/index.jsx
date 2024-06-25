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
// import { PROMOTIONS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
// import promotions_manangement from "@db/promotions_managements";
import { useDispatch } from "react-redux";
import {
  onGetAllSpecialOffer,
  onChangeStatusSpecialOfferById,
  removeSpecialOfferById,
  isTrashPromotion

} from "../../store/actions";
import { Link } from "react-router-dom";
import { Switch } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Actions from "@components/Actions";

// data placeholder

const PromotionMangementTable = () => {
  const PROMOTIONS_MANAGEMENT_COLUMN_DEFS = [
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
      render: (text, record) => (
        <div>
          <div className="font-bold text-header">
            Bắt đầu:{" "}
            {record &&
              dayjs(record?.special_offer_start_date).format("DD/MM/YYYY")}
          </div>
          <div className="font-bold text-header">
            Kết thúc:{" "}
            {record &&
              dayjs(record?.special_offer_end_date).format("DD/MM/YYYY")}
          </div>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Hoạt động",
      dataIndex: "status",
      render: (text, record) => (
        <div>{
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
  const dispatch = useDispatch();
  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };
  // const [promotions_manangement, setPromotions_manangement] = useState([]);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  // console.log("data", data)
  const fetchDataPromotionManagement = async () => {
    const responsePromotion = await dispatch(onGetAllSpecialOffer());
    if (responsePromotion) {
      setData(responsePromotion.payload.metaData);
    }
  };

  useEffect(() => {
    fetchDataPromotionManagement();
  }, [isLoad]);

  const handleChangeStatus = async (e, promotion_id) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      onChangeStatusSpecialOfferById({
        special_offer_id: promotion_id,
        isPublished: e,
      })
    );
    if (changeStatus?.payload?.status === (200 || 201)) {
      toast.update(id, {
        render: `Chương trình giảm giá đã được ${e === false ? "tắt" : "áp dụng"
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
  const onRemovePromotion = async (special_offer_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashPromotion({ special_offer_id: special_offer_id, isDeleted: isDeleted })
    );
    if (
      (changeStatus?.payload?.status === (200 || 201)) &
      (changeStatus?.payload?.metaData?.nModified === 1)
    ) {
      toast.update(id, {
        render: `Đã chuyển chương trình giảm giá này vào thùng rác`,
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
    if (sorts.sortBy.value === "special_offer_name") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? a.special_offer_name.toLowerCase() >
                b.special_offer_name.toLowerCase()
                ? 1
                : -1
              : a.special_offer_name.toLowerCase() <
                b.special_offer_name.toLowerCase()
                ? 1
                : -1
          )
      );
    }
    if (sorts.sortBy.value === "special_offer_start_date") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.special_offer_start_date) <
                new Date(b.special_offer_start_date)
                ? 1
                : -1
              : new Date(a.special_offer_start_date) >
                new Date(b.special_offer_start_date)
                ? 1
                : -1
          )
      );
    }
    if (sorts.sortBy.value === "special_offer_end_date") {
      setData(
        data
          .slice()
          .sort((a, b) =>
            sorts.sortOrder.value === "ascending"
              ? new Date(a.special_offer_end_date) <
                new Date(b.special_offer_end_date)
                ? 1
                : -1
              : new Date(a.special_offer_end_date) >
                new Date(b.special_offer_end_date)
                ? 1
                : -1
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

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-header">Chương trình khuyến mãi:</span>
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
              { value: "special_offer_name", label: "Tên" },
              { value: "special_offer_start_date", label: "Ngày bắt đầu" },
              { value: "special_offer_end_date", label: "Ngày kết thúc" },
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
            columns={PROMOTIONS_MANAGEMENT_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            rowKey={(record) => record._id}
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

export default PromotionMangementTable;
