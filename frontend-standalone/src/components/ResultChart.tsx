import { OutputType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ResultChartProps {
  data: OutputType;
  id: string;
}

export default function ResultChart({
  data,
  id
}: ResultChartProps) {
  const getLabel = (key: string) => {
    if (key.toLowerCase() === "housing") {
      return "Accommodation";
    }
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  return (
    <div id={id}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Category
            </TableCell>
            <TableCell>
              Emission amount (CO2 kg)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data)
            .filter((key: string) => key !== "total" && key !== "format")
            .sort((a, b) => data[a as keyof OutputType] > data[b as keyof OutputType] ? -1 : 1)
            .map((key: string) => (
              <TableRow key={key}>
                <TableCell>
                  {getLabel(key)}
                </TableCell>
                <TableCell>
                  {data[key as keyof Omit<OutputType, "format">].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
