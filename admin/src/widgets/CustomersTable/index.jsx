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
import { CUSTOMERS_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder

const CustomersTable = ({ category, data }) => {
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

  return (
    <div className="flex flex-col flex-1">
      <Spring className="flex flex-col mt-3 flex-1 w-full">
        <StyledTable
          columns={CUSTOMERS_COLUMN_DEFS}
          dataSource={pagination.currentItems()}
          pagination={false}
          locale={{
            emptyText: <Empty text="Không có khách hàng để hiển thi" />,
          }}
          rowKey={(record) => record._id}
        />
        {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
      </Spring>
    </div>
  );
};

export default CustomersTable;
