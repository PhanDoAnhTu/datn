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
// import posts_managements from "@db/posts_manangement";
// import { POSTS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";
import {
  getListPosts,
  isTrashPost,
  changeIsPublishedPost,
  getListTopic,
} from "../../store/actions";
import dayjs from "dayjs";
import Actions from "@components/Actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Switch } from "antd";

// data placeholder

const PostManagementTable = ({ searchQuery }) => {
  const [topics_management, setTopicManagement] = useState([]);
  const [og_data, setOGData] = useState([]);

  const POSTS_MANAGEMENT_COLUMN_DEFS = [
    {
      title: "Tên",
      dataIndex: "post_name",
      render: (label) => (
        <span className="inline-block h6 !text-sm max-w-[150px]">{label}</span>
      ),
    },
    {
      title: "Chủ đề",
      dataIndex: "topic_id",
      render: (topicID) => {
        if (topicID) {
          return (
            <span className="text-accent capitalize">
              {
                topics_management?.slice().find((item) => item._id === topicID)
                  ?.topic_name
              }
            </span>
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
          {record.isDeleted === false ? (
            <Switch
              checkedChildren={"ON"}
              unCheckedChildren={"OFF"}
              onChange={(e) => handleChangeStatus(record?._id, e)}
              loading={false}
              value={record?.isPublished}
            />
          ) : (
            <Switch
              disabled
              checkedChildren={"ON"}
              unCheckedChildren={"OFF"}
              loading={false}
              checked={false}
            />
          )}
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex items-center justify-end gap-11">
          <Actions
            record={record}
            table={"post"}
            handleTrash={() =>
              record.isDeleted === true
                ? onRemove(record._id, false)
                : onRemove(record._id, true)
            }
            handleDraft={() => handleChangeStatus(record._id, false)}
          />
        </div>
      ),
    },
  ];

  const { width } = useWindowSize();

  const defaultSort = {
    sortBy: ADDITIONAL_OPTIONS[0],
    sortOrder: SELECT_OPTIONS[0],
  };

  const [data, setData] = useState([]);
  const [category, setCategory] = useState("all");
  const [sorts, setSorts] = useState(defaultSort);
  const [activeCollapse, setActiveCollapse] = useState("");

  const dispatch = useDispatch();

  const [isLoad, setIsLoad] = useState(false);

  const fetchDataPromotionManagement = async () => {
    const response = await dispatch(getListPosts());
    if (response) {
      setData(response.payload.metaData);
      setOGData(response.payload.metaData);
    }
    const response1 = await dispatch(getListTopic());
    if (response1) {
      setTopicManagement(response1.payload.metaData);
    }
  };

  useEffect(() => {
    fetchDataPromotionManagement();
  }, [isLoad]);

  const getQty = (category) => {
    if (category === "all")
      return data.filter((product) => product.isDeleted === false).length;
    if (category === "isPublished")
      return data.filter((product) => product.isPublished === true).length;
    // if (category === "UnPublished") return data.filter((product) => product.isPublished === false & product.isDeleted === false).length;
    if (category === "isDeleted")
      return data.filter((product) => product.isDeleted === true).length;
    if (category === "isDraft")
      return data.filter((product) => product.isDraft === true).length;
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
              ? a.post_name.toLowerCase() > b.post_name.toLowerCase()
                ? 1
                : -1
              : a.post_name.toLowerCase() < b.post_name.toLowerCase()
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
              ? new Date(a.updatedAt) < new Date(b.updatedAt)
                ? 1
                : -1
              : new Date(a.updatedAt) > new Date(b.updatedAt)
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

  useEffect(() => {
    if (searchQuery !== "") {
      setData(
        og_data.filter((item) =>
          item.post_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setData(og_data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const dataByStatus = (category) => {
    if (category === "all")
      return data.filter((product) => product.isDeleted === false);
    if (category === "isPublished")
      return data.filter((product) => product.isPublished === true);
    // if (category === "UnPublished") return data.filter((product) => product.isPublished === false & product.isDeleted === false);
    if (category === "isDeleted")
      return data.filter((product) => product.isDeleted === true);
    if (category === "isDraft")
      return data.filter((product) => product.isDraft === true);
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

  //
  const handleChangeStatus = async (post_id, e) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      changeIsPublishedPost({
        post_id: post_id,
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
  const onRemove = async (post_id, isDeleted) => {
    const id = toast.loading("Vui lòng đợi...");
    const changeStatus = await dispatch(
      isTrashPost({ post_id: post_id, isDeleted: isDeleted })
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
        <span className="text-header">Bài viết:</span>
        <div>
          {[
            { value: "all", label: "Tất cả" },
            { value: "isPublished", label: "Đang hoạt động" },
            // { value: "UnPublished", label: "Không hoạt động" },
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
            columns={POSTS_MANAGEMENT_COLUMN_DEFS}
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

export default PostManagementTable;
