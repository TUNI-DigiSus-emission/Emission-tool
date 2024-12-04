import { FormDataType } from "@/types";
import { LiveTv, RadioButtonChecked } from "@mui/icons-material";
import { Divider, FormControlLabel, Grid2, List, ListItem, ListItemIcon, ListItemText, Switch, TextField, Tooltip } from "@mui/material";
import { useState } from "react";

interface DigitalToolsProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function DigitalTools({ value, onChange }: DigitalToolsProps) {
  const [userNotChangedHoursStreamed, setUserNotChangedHoursStreamed] = useState(true);
  const [userNotChangedHoursRecorded, setUserChangedHoursRecorded] = useState(true);

  const handleChange = (
    key: keyof FormDataType["digitalTools"],
    newValue: any
  ) => {
    if (key === "hoursStreamedPerDay" && userNotChangedHoursStreamed) {
      setUserNotChangedHoursStreamed(false);
    }

    if (key === "hoursRecordedPerDay" && userNotChangedHoursRecorded) {
      setUserChangedHoursRecorded(false);
    }

    onChange("digitalTools", {
      ...value.digitalTools,
      [key]: newValue,
    });
  };

  const getHoursStreamedPerDay = () => {
    if (userNotChangedHoursStreamed && value.digitalTools.hoursStreamedPerDay === 0) {
      return value.eventDuration.totalHours / value.eventDuration.totalDays;
    }

    return value.digitalTools.hoursStreamedPerDay;
  }

  const getHoursRecordedPerDay = () => {
    if (userNotChangedHoursRecorded && value.digitalTools.hoursRecordedPerDay === 0) {
      return value.eventDuration.totalHours / value.eventDuration.totalDays;
    }

    return value.digitalTools.hoursRecordedPerDay;
  }

  return (
    <Grid2 container gap={1} justifyContent={"space-between"}>
      <Grid2 size={6} container direction={"column"} gap={2}>
        <Grid2>
          <FormControlLabel
            label={"Is event streamed?"}
            control={
              <Tooltip
                title={value.digitalTools.streamed ? "Yes" : "No"}
                placement="top"
                arrow
              >
                <Switch
                  checked={value.digitalTools.streamed}
                  onChange={() =>
                    handleChange("streamed", !value.digitalTools.streamed)
                  }
                />
              </Tooltip>
            }
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of hours streamed per day"}
            type={"number"}
            value={getHoursStreamedPerDay()}
            onChange={(e) =>
              handleChange("hoursStreamedPerDay", parseInt(e.target.value))
            }
            disabled={!value.digitalTools.streamed}
            id="DigitalToolsHoursStreamed"
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of stream viewers"}
            type={"number"}
            defaultValue={value.digitalTools.usersWatching}
            onBlur={(e) =>
              handleChange("usersWatching", parseInt(e.target.value))
            }
            disabled={!value.digitalTools.streamed}
            id="DigitalToolsWatchers"
          />
        </Grid2>
        <Grid2>
          <FormControlLabel
            label={"Is event recorded?"}
            control={
              <Tooltip
                title={value.digitalTools.recorded ? "Yes" : "No"}
                placement="top"
                arrow
              >
                <Switch
                  checked={value.digitalTools.recorded}
                  onChange={() =>
                    handleChange("recorded", !value.digitalTools.recorded)
                  }
                />
              </Tooltip>
            }
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of hours recorded per day"}
            type={"number"}
            value={getHoursRecordedPerDay()}
            onChange={(e) =>
              handleChange("hoursRecordedPerDay", parseInt(e.target.value))
            }
            disabled={!value.digitalTools.recorded}
            id="DigitalToolsHoursRecorded"
          />
        </Grid2>
        <Grid2>
          <FormControlLabel
            label={"Is recording stored?"}
            control={
              <Tooltip
                title={value.digitalTools.stored ? "Yes" : "No"}
                placement="top"
                arrow
              >
                <Switch
                  checked={value.digitalTools.stored}
                  onChange={() =>
                    handleChange("stored", !value.digitalTools.stored)
                  }
                />
              </Tooltip>
            }
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of days recording is stored"}
            type={"number"}
            defaultValue={value.digitalTools.daysStored}
            onBlur={(e) => handleChange("daysStored", parseInt(e.target.value))}
            disabled={!value.digitalTools.stored}
            id="DigitalToolsDaysStored"
          />
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 size={4}>
        <Grid2>
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon>
                <LiveTv />
              </ListItemIcon>
              <ListItemText
                primary={`Total time of streaming: ${getHoursStreamedPerDay() * value.eventDuration.totalDays}`}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <RadioButtonChecked />
              </ListItemIcon>
              <ListItemText
                primary={`Total time of recording: ${getHoursRecordedPerDay() * value.eventDuration.totalDays}`}
              />
            </ListItem>
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
