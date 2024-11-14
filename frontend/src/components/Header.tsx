import { Box, Typography } from "@mui/material";
import { CSSProperties } from "react";

const headerStyle: CSSProperties = {
  height: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid black",
};

export default function Header() {
  return (
    <Box style={headerStyle}>
      <Typography>Header</Typography>
    </Box>
  )
}
