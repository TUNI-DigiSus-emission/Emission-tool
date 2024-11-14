import { Box, Typography } from "@mui/material";
import { CSSProperties } from "react";

const footerStyle: CSSProperties = {
  height: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  borderTop: "1px solid black",
};

export default function Footer() {
  return (
    <Box style={footerStyle}>
      <Typography>Footer</Typography>
    </Box>
  )
}
