import { ChangeEvent } from "react";
import { Box, Typography, TextField } from "@mui/material";

interface NumberFieldProps {
  heading: string;
  id: string;
  onChange: (value: number) => void;
}

export default function NumberField({
  heading,
  id,
  onChange
}: NumberFieldProps) {

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value));
  };

  return (
    <Box id={id}>
      <Typography variant="h3">{heading}</Typography>
      <TextField
        type="number"
        onChange={handleNumberChange}
      />
    </Box>
  );
}
