import { FormControlLabel, Grid2, Switch } from "@mui/material";
import RadioField from "../components/RadioField";
import { FormDataType } from "@/types";

interface EventTypeProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function EventType({ value, onChange }: EventTypeProps) {
  return (
    <Grid2 container direction={"column"} gap={1}>
      <Grid2>
        <RadioField
          items={[
            "Lecture/Information sharing",
            "Networking",
            "Workshop/hackathon",
          ]}
          onSelectItem={(value) =>
            onChange("eventType", value as FormDataType["eventType"])
          }
          value={value.eventType}
        />
      </Grid2>
    </Grid2>
  );
}
