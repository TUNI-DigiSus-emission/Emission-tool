// import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ResultChart from "@/components/ResultChart";
import { OutputType } from "@/types";
import { Box, Grid2, Paper, Typography } from "@mui/material";

interface ResultsProps {
  data: OutputType | null;
}

export default function Results({
  data
}: ResultsProps) {
  if (!data || data === null) {
    return <></>;
  }

  return (
    <Paper>
      <Box padding={2}>
        <Grid2 container gap={2} direction={"column"}>
          <Grid2 alignSelf={"center"}>
            <Typography fontWeight={600}>
              Total CO2 emissions (kg): {data.total.toFixed(2)}
            </Typography>
          </Grid2>
          <Grid2>
            <PieChart data={data} />
          </Grid2>
          <Grid2>
            <ResultChart data={data} />
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  )
}

