import { Box, Typography } from "@mui/material";
import { CSSProperties } from "react";

const boxStyle: CSSProperties = {
  padding: "2rem 0 1rem 0"
}

export default function LabelField() {
  return (
    <Box style={boxStyle}>
      <Typography variant="h1">DigiSus - Emission Tool</Typography>
    </Box>
  )
}
