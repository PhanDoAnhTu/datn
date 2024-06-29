// components
import Spring from "@components/Spring";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useWindowSize } from "react-use";
import { numFormatter } from "@utils/helpers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip p-4">
        <h6 className="mb-1">{label}</h6>
        <div className="flex flex-col">
          {payload.map((item, index) => (
            <div className="flex gap-1.5" key={index}>
              <span className="label-text capitalize">{item.name}:</span>
              <span className="h6 !text-sm">
                {numFormatter(item.value, 1, "$")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const SalesStats = ({ order }) => {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  const revenueColor = theme === "light" ? "var(--header)" : "#C4DEFF";
  const [generatedOrder, setGeneratedOrder] = useState([]);
  useEffect(() => {
    setGeneratedOrder(
      [...Array(dayjs().$M + 1).keys()].map((month) => {
        return {
          name: `Th${month + 1}`,
          revenue: order
            ?.slice()
            .filter(
              (item) =>
                dayjs(item.createdOn).$M ===
                  dayjs().month(month).startOf("month").$M &&
                dayjs(item.createdOn).$M ===
                  dayjs().month(month).endOf("month").$M &&
                dayjs(item.createdOn).$y === dayjs().$y &&
                (item.order_status === "review" ||
                  item.order_status === "successful")
            )
            .map((item) => item.order_checkout?.totalCheckout)
            .reduce((a, b) => a + b, 0),
        };
      })
    );
  }, [order]);
  return (
    <Spring className="card flex flex-col h-[300px] md:h-[494px] lg:col-span-3 xl:col-span-1">
      <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
        <h4>{`Doanh thu năm ${dayjs().format("YYYY")}`}</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: revenueColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Doanh thu
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={generatedOrder} margin={false}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--input-border)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={9}
              hide={width < 768}
              tick={{
                fontSize: 14,
                fontFamily: "var(--heading-font)",
                fontWeight: 700,
                fill: "var(--header)",
              }}
            />
            <YAxis
              tickLine={true}
              axisLine={false}
              tickFormatter={(value) => numFormatter(value, 0, "")}
              tick={{
                fill: "var(--header)",
              }}
              hide={width < 768}
            />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill={revenueColor}
              maxBarSize={16}
              radius={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Spring>
  );
};

export default SalesStats;
