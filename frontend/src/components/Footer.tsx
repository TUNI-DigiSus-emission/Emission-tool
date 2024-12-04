import { Grid2, Typography } from "@mui/material";
import Link from "next/link";
import { CSSProperties } from "react";

const footerStyle: CSSProperties = {
  height: "min-width",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  borderTop: "2px solid #e0e0e0",
};

export default function Footer() {
  return (
    <Grid2 style={footerStyle} container direction={"column"} gap={1}>
      <Grid2>
        <Typography textAlign={"center"} fontWeight={600}>
          Made for
        </Typography>
      </Grid2>
      <Grid2>
        <Typography textAlign={"center"}>
          Digital and Sustainability Transitions (<Link href="https://research.tuni.fi/digisus/">DigiSus</Link>) research platform
        </Typography>
      </Grid2>

      <Grid2 marginTop={1}>
        <Typography textAlign={"center"} fontWeight={600}>
          Tool by
        </Typography>
      </Grid2>
      <Grid2>
        <Typography>
          Anna Koskinen | Teemu Lehti | Camilla Malmi | Sari Myllynen | Petra Pitkämäki | Topi Rissanen | Sanni Välimaa
        </Typography>
      </Grid2>
    </Grid2>
  )
}
