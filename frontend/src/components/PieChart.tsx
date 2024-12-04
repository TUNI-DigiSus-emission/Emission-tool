import { OutputType } from "@/types";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";

interface PieChartProps {
  data: OutputType;
  id: string;
}

function getDataFormatted(data: OutputType) {
  return [{
    data: [
      { value: data.transportation, label: "Transportation" },
      { value: data.housing, label: "Accomodation" },
      { value: data.space, label: "Space" },
      { value: data.coffee, label: "Coffee" },
      { value: data.food, label: "Food" },
      { value: data.bandwidth, label: "Bandwidth" },
      { value: data.devices, label: "Devices" },
      { value: data.recording, label: "Recording" },
    ]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((item, idx) => ({ ...item, id: idx }))
  }];
};


export default function PieChart({
  data,
  id
}: PieChartProps) {
  return (
    <div id={id}>
      <MUIPieChart
        colors={["#91deff", "#b19ffc", "#ffd887", "#fc8953", "#8ac983", "#ffa1d8", "#6773a6", "#a3a2a2"]}
        series={getDataFormatted(data)}
        width={600}
        height={250}
      />
    </div>
  );
}
