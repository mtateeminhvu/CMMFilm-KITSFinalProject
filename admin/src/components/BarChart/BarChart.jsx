import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "ROMANCE",
    MALE: 4000,
    FEMALE: 2400,
    amt: 2400,
  },
  {
    name: "FIGHTING",
    MALE: 3000,
    FEMALE: 1398,
    amt: 2210,
  },
  {
    name: "ANIME",
    MALE: 2000,
    FEMALE: 9800,
    amt: 2290,
  },
  {
    name: "HOLIWOOD",
    MALE: 2780,
    FEMALE: 3908,
    amt: 2000,
  },
  {
    name: "CARTOON",
    MALE: 1890,
    FEMALE: 4800,
    amt: 2181,
  },
  {
    name: "STORY",
    MALE: 2390,
    FEMALE: 3800,
    amt: 2500,
  },
  {
    name: "YOTUBE",
    MALE: 3490,
    FEMALE: 4300,
    amt: 2100,
  },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="90%" height="80%">
      <BarChart width={500} height={300} data={data} margin={{}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="MALE" fill="#0f9ab3" />
        <Bar dataKey="FEMALE" fill="#c84dc8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
