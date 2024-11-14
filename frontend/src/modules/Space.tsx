import { FormDataType } from "@/types";
import { Grid2, TextField } from "@mui/material";

interface SpaceProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Space({
  value,
  onChange
}: SpaceProps) {
  const handleChange = (key: keyof FormDataType["space"], newValue: number) => {
    onChange("space", {
      ...value.space,
      [key]: newValue
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
          label={"Square meters"}
          type={"number"}
          value={value.space.size}
          onChange={(e) => handleChange("size", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"How many days?"}
          type={"number"}
          value={value.space.days}
          onChange={(e) => handleChange("days", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"How many hours a day?"}
          type={"number"}
          value={value.space.hours}
          onChange={(e) => handleChange("hours", parseInt(e.target.value))}
        />
      </Grid2>
    </Grid2>
  );
}
