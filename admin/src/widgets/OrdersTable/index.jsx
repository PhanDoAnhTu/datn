// components
import Spring from "@components/Spring";
import StyledTable from "./styles";
import Pagination from "@ui/Pagination";
import OrderCollapseItem from "@components/OrderCollapseItem";
import Empty from "@components/Empty";

// hooks
import usePagination from "@hooks/usePagination";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

// constants
import { ORDERS_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder

const OrdersTable = ({ category, data }) => {
  const { width } = useWindowSize();
  const [activeCollapse, setActiveCollapse] = useState("");

  const pagination = usePagination(data, 5);

  // go to first page when period or sort changes and reset active collapse
  useEffect(() => {
    pagination.goToPage(0);
    setActiveCollapse("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, data]);

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
      <Spring className="flex flex-col mt-3 flex-1 w-full">
        {width >= 768 ? (
          <StyledTable
            columns={ORDERS_COLUMN_DEFS}
            dataSource={pagination.currentItems()}
            pagination={false}
            locale={{
              emptyText: <Empty text="Không có đơn hàng để hiển thi" />,
            }}
            rowKey={(record) => record._id}
          />
        ) : (
          <div className="flex flex-1 flex-col gap-5 mb-[26px]">
            {pagination.currentItems().map((order) => (
              <OrderCollapseItem
                key={order._id}
                order={order}
                activeCollapse={activeCollapse}
                handleCollapse={handleCollapse}
              />
            ))}
          </div>
        )}
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </Spring>
    </div>
  );
};

export default OrdersTable;
