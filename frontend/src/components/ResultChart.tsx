import { OutputType } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface ResultChartProps {
  data: OutputType;
}

export default function ResultChart({
  data
}: ResultChartProps) {
  return (
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
          .filter((key: string) => key !== "total")
          .sort((a, b) => data[a] > data[b] ? -1 : 1)
          .map((key: string) => (
            <TableRow key={key}>
              <TableCell>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
              <TableCell>
                {data[key as keyof OutputType].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
