import { FormDataType } from "@/types";
import { Grid2, TextField } from "@mui/material";

interface OvernightStaysProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function OvernightStays({
  value,
  onChange
}: OvernightStaysProps) {
  const handleChange = (key: keyof FormDataType["overnightStays"], newValue: number) => {
    const valueParsed = isNaN(newValue) || newValue < 0 ? 0 : newValue;

    onChange("overnightStays", {
      ...value.overnightStays,
      [key]: valueParsed
    });
  }

  return (
    <Grid2
      container
      direction={"column"}
      gap={1}
    >
      <Grid2>
        <TextField
          label={"Number of people staying overnight"}
          type={"number"}
          defaultValue={value.overnightStays.amount}
          onChange={(e) => handleChange("amount", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of nights"}
          type={"number"}
          defaultValue={value.overnightStays.nights}
          onChange={(e) => handleChange("nights", parseInt(e.target.value))}
        />
      </Grid2>
    </Grid2>
  );
}
