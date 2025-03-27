"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WIDTH = 900;
const HEIGHT = 200;

// Sample ELD data with straight-line segments
const eldData = [
    { time: 0, status: 1 },   // 12 AM - Sleeper Berth
    { time: 6, status: 3 },   // 6 AM - On Duty (Pickup)
    { time: 7, status: 2 },   // 7 AM - Driving
    { time: 13, status: 3 },  // 1 PM - Fueling
    { time: 13.5, status: 2 },// 1:30 PM - Driving
    { time: 17.5, status: 3 },// 5:30 PM - Drop-off
    { time: 18.5, status: 0 },// 6:30 PM - Off Duty (Dinner)
    { time: 19.5, status: 2 },// 7:30 PM - Driving
    { time: 23.5, status: 1 },// 11:30 PM - Sleeper Berth
    { time: 24, status: 1 },  // 12 AM - Start of the new cycle
  ];

// Generate ticks every 15 minutes (0.25 hours)
const generateTimeTicks = () => {
  const ticks = [];
  for (let i = 0; i <= 24; i += 0.25) {
    ticks.push(i);
  }
  return ticks;
};

// Custom Tick Renderer for Hours and 15-Minute Marks
const CustomTick = ({ x, y, payload }: any) => {
  const { value } = payload;
  const hour = Math.floor(value);
  const minutes = (value % 1) * 60;

  let tickHeight = 5;
  if (minutes === 30) tickHeight = 10;
  else if (minutes === 0) tickHeight = 15;

  return (
    <g>
      <line x1={x} x2={x} y1={y} y2={y + tickHeight} stroke="black" />
      {minutes === 0 && (
        <text x={x} y={y + 20} textAnchor="middle" fontSize={10}>
          {hour}
        </text>
      )}
    </g>
  );
};

// Status Mapping for Labels
const statusLabels :{[k:number]:string} = {
  0: "Off Duty",
  1: "Sleeper Berth",
  2: "Driving",
  3: "On Duty",
};

const ELDTruckLogChart = () => {
  return (
    <ResponsiveContainer width="100%" height={HEIGHT}>
      <LineChart
        width={WIDTH}
        height={HEIGHT}
        data={eldData}
        margin={{ top: 10, right: 10, left: 10, bottom: 30 }}
      >
        {/* Background Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />

        {/* X-Axis with 15-minute subdivisions */}
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, 24]}
          ticks={generateTimeTicks()}
          tick={<CustomTick />}
          label={{ value: "Time (Hours)", position: "insideBottom", dy: 20 }}
        />

        {/* Y-Axis for ELD Status */}
        <YAxis
          dataKey="status"
          type="number"
          domain={[0, 3]}
          ticks={[0, 1, 2, 3]}
          tickFormatter={(value:number) => statusLabels[value]}
          tick={{ fontSize: 10 }}
          label={{ value: "Status", angle: -90, position: "insideLeft" }}
        />

        {/* Tooltip */}
        <Tooltip formatter={(value) => statusLabels[value as number]} />

        {/* Step Chart for ELD Logs (Straight Lines) */}
        <Line
          type="stepAfter" // Forces horizontal and vertical movements
          dataKey="status"
          stroke="black"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ELDTruckLogChart;
