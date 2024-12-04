import { OutputType } from "@/types";
import { BarChart as MUIBarChart } from "@mui/x-charts/BarChart";

interface BarChartProps {
  data: OutputType;
}

export default function BarChart({
  data
}: BarChartProps) {
  const groups = ["group A", "group B", "group C"];
  const seriesData = [
    { data: [4, 3, 5], label: "Travel" },
    { data: [1, 6, 3], label: "Food" },
    { data: [2, 5, 6], label: "Digital" },
    { data: [2, 5, 6], label: "Physical" },
  ];

  return (
    <MUIBarChart
      colors={["#BFECFF", "#CDC1FF", "#FFF6E3", "#FFCCEA"]}
      xAxis={[{ scaleType: "band", data: groups }]}
      yAxis={[
        {
          label: "kg CO2",
        },
      ]}
      series={seriesData}
      width={500}
    />
  );
}
