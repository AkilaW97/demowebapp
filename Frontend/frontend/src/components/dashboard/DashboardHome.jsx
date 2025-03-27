import StatCard from "./StatCard";
import OverviewChart from "./OverviewChart";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Welcome back, Admin
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Products"
          value="1,278"
          change="+10% this week"
          icon="📦"
          color="#03613a"
        />
        <StatCard
          title="Total Earnings"
          value="$4,569"
          change="-20.5% this week"
          icon="💰"
          color="#ff4d4d"
        />
      </div>

      {/* Chart */}
      <OverviewChart />
    </div>
  );
}