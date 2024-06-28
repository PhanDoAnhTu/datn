// components
import PageHeader from "@layout/PageHeader";
import MainProfileInfo from "@widgets/MainProfileInfo";
import SalesStats from "@widgets/SalesStats";
import TotalReport from "@widgets/TotalReport";
import TotalBalance from "@components/Banners/TotalBalance";

// hooks
import { useWindowSize } from "react-use";
import CustomerRetentionRate from "@widgets/CustomerRetentionRate";
import DemographicSegmentation from "@widgets/DemographicSegmentation";

const SalesAnalytics = () => {
  const { width } = useWindowSize();

  return (
    <>
      <PageHeader title="Biểu đồ" />
      <div className="widgets-grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6">
        <div className="xl:col-span-4">
          <MainProfileInfo />
        </div>
        <div className="xl:col-span-2">{width >= 1536 && <TotalBalance />}</div>
        <div className="xl:col-span-3">
          <SalesStats />
        </div>
        <div className="xl:col-span-3">
          <TotalReport />
        </div>
        <div className="xl:col-span-4">
          <CustomerRetentionRate />
        </div>
        <div className="xl:col-span-2">
          <DemographicSegmentation />
        </div>
      </div>
    </>
  );
};

export default SalesAnalytics;
