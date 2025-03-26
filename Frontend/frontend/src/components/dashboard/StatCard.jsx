export default function StatCard({ title, value, change, icon, color }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm" style={{ color }}>{change}</div>
      </div>
    );
  }
  