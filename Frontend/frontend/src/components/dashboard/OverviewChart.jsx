import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 210 },
    { name: "Wed", value: 150 },
    { name: "Thu", value: 280 },
    { name: "Fri", value: 245 },
    { name: "Sat", value: 180 },
    { name: "Sun", value: 310 },
  ];
  
  export default function OverviewChart() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#03613a"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  