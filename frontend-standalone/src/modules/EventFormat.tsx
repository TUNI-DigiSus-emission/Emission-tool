import { Grid2 } from "@mui/material";
import RadioField from "../components/RadioField";
import { FormDataType } from "@/types";

interface EventFormatProps {
  value: FormDataType["eventFormat"];
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function EventFormat({ value, onChange }: EventFormatProps) {
  return (
    <Grid2 container direction={"column"} gap={1}>
      <Grid2>
        <RadioField
          items={["On-site", "Hybrid", "Remote"]}
          onSelectItem={(value) =>
            onChange("eventFormat", value as FormDataType["eventFormat"])
          }
          value={value}
        />
      </Grid2>
    </Grid2>
  );
}
