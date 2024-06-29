// components
import Spring from "@components/Spring";
import ReportItem from "@components/ReportItem";

// hooks

const data = [
  { dataKey: "revenue", title: "Revenue", amount: 176120, trend: 45 },
  { dataKey: "expense", title: "Expense", amount: 310452, trend: -12 },
  { dataKey: "profit", title: "Profit", amount: 342558, trend: 14.56 },
];

const TotalReport = () => {
  return (
    <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
      <div>
        <div className="flex items-center justify-between">
          <h4>Báo cáo tổng quát</h4>
        </div>
        <p className="mt-1.5 mb-4 text-sm md:text-base"></p>
      </div>
      <div className="flex flex-col flex-1 gap-6 mb-6">
        {data.map((item, index) => (
          <ReportItem key={index} data={item} />
        ))}
      </div>
    </Spring>
  );
};

export default TotalReport;
