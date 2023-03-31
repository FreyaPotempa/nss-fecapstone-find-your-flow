import { Divider, Heading } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const ProgressChart = ({ data }) => {
  return (
    <>
      <Divider />
      <Heading m="8" size="lg">
        Progress over Time
      </Heading>
      <ResponsiveContainer width="75%" height={200}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          {/*
                Don't know if I like this here but might add in again later 
            <CartesianGrid strokeDasharray="3 3"/> */}
          <XAxis dataKey="dateCompleted" />
          <YAxis dataKey="difficulty" domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="difficulty" fill="#56638a" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
