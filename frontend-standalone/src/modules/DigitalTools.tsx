import { FormDataType } from "@/types";
import { FormControlLabel, Grid2, Switch, TextField } from "@mui/material";

interface DigitalToolsProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function DigitalTools({
  value,
  onChange
}: DigitalToolsProps) {
  const handleChange = (key: keyof FormDataType["digitalTools"], newValue: any) => {
    onChange("digitalTools", {
      ...value.digitalTools,
      [key]: newValue
    });
  };

  return (
    <Grid2
      container
      direction={"column"}
      gap={1}
    >
      <Grid2>
        <FormControlLabel
          label={"Is event streamed?"}
          control={
            <Switch
              checked={value.digitalTools.streamed}
              onChange={() => handleChange("streamed", !value.digitalTools.streamed)}
            />
          }
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of hours streamed per day"}
          type={"number"}
          value={value.digitalTools.hoursStreamedPerDay}
          onChange={(e) => handleChange("hoursStreamedPerDay", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of users who will watch the stream"}
          type={"number"}
          value={value.digitalTools.usersWatching}
          onChange={(e) => handleChange("usersWatching", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <FormControlLabel
          label={"Is event recorded?"}
          control={
            <Switch
              checked={value.digitalTools.recorded}
              onChange={() => handleChange("recorded", !value.digitalTools.recorded)}
            />
          }
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of hours recorded per day"}
          type={"number"}
          value={value.digitalTools.hoursRecordedPerDay}
          onChange={(e) => handleChange("hoursRecordedPerDay", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <FormControlLabel
          label={"Is recording stored?"}
          control={
            <Switch
              checked={value.digitalTools.stored}
              onChange={() => handleChange("stored", !value.digitalTools.stored)}
            />
          }
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of days recording is stored"}
          type={"number"}
          value={value.digitalTools.daysStored}
          onChange={(e) => handleChange("daysStored", parseInt(e.target.value))}
        />
      </Grid2>
    </Grid2>
  );
}
