// components
import Spring from "@components/Spring";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// utils
import { commaFormatter, getPercentage, getTotal } from "@utils/helpers";

import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const data = [
  { name: "Khách hàng mới", value: 27153, color: "chart-dark" },
  {
    name: "Khách hàng có đơn hàng trong 30 ngày",
    value: 7587,
    color: "accent",
  },
  {
    name: "Khách hàng chưa có đơn hàng trong 30 ngày",
    value: 5937,
    color: "red",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="chart-tooltip p-2">
        <span className="h6">{commaFormatter(payload[0].value)}</span>
      </div>
    );
  }

  return null;
};

const CustomerRetentionRate = ({ customers, order }) => {
  dayjs.extend(isBetween);

  const [caculatedGender, setCaculatedGender] = useState([]);

  useEffect(() => {
    setCaculatedGender([
      {
        name: "Khách hàng mới",
        value: customers?.filter((item) =>
          dayjs(item.createdAt).isAfter(dayjs().subtract(1, "month"))
        ).length,
        color: "chart-dark",
      },
      {
        name: "Khách hàng có đơn trong 30 ngày",
        value: customers?.slice().filter(
          (customer) =>
            order
              ?.slice()
              .filter(
                (item) =>
                  dayjs(item.createdOn).isBefore(dayjs()) &&
                  dayjs(item.createdOn).isAfter(dayjs().subtract(1, "month"))
              )
              .map((item) => {
                return item.order_userId;
              })
              .includes(customer._id) &&
            dayjs(customer.createdAt).isBefore(dayjs().subtract(1, "month"))
        )?.length,
        color: "accent",
      },
      {
        name: "Khách hàng không có đơn trong 30 ngày",
        value: customers?.slice().filter(
          (customer) =>
            !order
              ?.slice()
              .filter(
                (item) =>
                  dayjs(item.createdOn).isBefore(dayjs()) &&
                  dayjs(item.createdOn).isAfter(dayjs().subtract(1, "month"))
              )
              .map((item) => {
                return item.order_userId;
              })
              .includes(customer._id) &&
            dayjs(customer.createdAt).isBefore(dayjs().subtract(1, "month"))
        )?.length,
        color: "red",
      },
    ]);
  }, [customers]);
  return (
    <Spring className="card xl:col-span-4">
      <h5 className="mb-5">Biểu đồ khách hàng</h5>
      <div className="flex flex-col gap-[30px] md:flex-row md:items-start lg:items-center lg:gap-[70px]">
        <div className="shrink-0 h-[220px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={caculatedGender}
                cx="50%"
                cy="50%"
                outerRadius="100%"
                fill="#8884d8"
                dataKey="value"
                strokeWidth={0}
              >
                {caculatedGender.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`var(--${entry.color})`} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h6 className="mt-2.5 mb-3 md:mb-5">
            Tổng khách hàng - {commaFormatter(getTotal(caculatedGender))} trong
            tháng này
          </h6>

          <ul className="flex flex-col gap-5">
            {caculatedGender.map((item, index) => (
              <li className="flex gap-[14px]" key={index}>
                <i
                  className="icon-circle-solid text-sm"
                  style={{ color: `var(--${item.color})` }}
                />
                <p className="label-text max-w-[280px]">
                  {item.name} - {getPercentage(caculatedGender, item.value)}%,
                  là {commaFormatter(item.value)} khách hàng
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Spring>
  );
};

export default CustomerRetentionRate;
