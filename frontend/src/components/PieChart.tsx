import { OutputType } from "@/types";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";

interface PieChartProps {
  data: OutputType;
}

function getDataFormatted(data: OutputType) {
  return [{
    data: [
      { id: 0, value: data.transportation, label: "Transportation" },
      { id: 1, value: data.housing, label: "Housing" },
      { id: 2, value: data.space, label: "Space" },
      { id: 3, value: data.coffee, label: "Coffee" },
      { id: 4, value: data.food, label: "Food" },
      { id: 5, value: data.bandwidth, label: "Bandwidth" },
      { id: 6, value: data.devices, label: "Devices" },
      { id: 7, value: data.recording, label: "Recording" },
    ]
  }];
};


export default function PieChart({
  data
}: PieChartProps) {
  return (
    <MUIPieChart
      colors={["#BFECFF", "#CDC1FF", "#FFF6E3", "#FFCCEA"]}
      series={getDataFormatted(data)}
      width={600}
      height={250}
    />
  );
}
