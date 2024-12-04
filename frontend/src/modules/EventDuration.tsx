import { FormDataType } from "@/types";
import {
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Schedule, Today } from "@mui/icons-material";

interface EventDurationProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

function calculateTotalDays(startDate: Dayjs, endDate: Dayjs) {
  return endDate.diff(startDate, "day") + 1;
}

function calculateTotalHours(totalDays: number, dailyDuration: number) {
  return totalDays * dailyDuration;
}

export default function EventDuration({ value, onChange }: EventDurationProps) {
  const handleChange = (
    key: keyof FormDataType["eventDuration"],
    newValue: Dayjs | string | null
  ) => {
    let startDate = value.eventDuration.startDate;
    let endDate = value.eventDuration.endDate;
    let dailyDuration = value.eventDuration.dailyDuration;

    switch (key) {
      case "startDate":
        startDate = newValue as Dayjs;
        break;
      case "endDate":
        endDate = newValue as Dayjs;
        break;
      case "dailyDuration":
        let val = newValue;
        if (newValue === "" || parseInt(newValue as string) < 0) {
          val = "0";
        } else if (parseInt(newValue as string) > 24) {
          val = "24";
        }
        dailyDuration = parseInt(val as string);
        break;
    }
    const totalDays = calculateTotalDays(startDate, endDate);
    const totalHours = calculateTotalHours(totalDays, dailyDuration);

    const newEventDurationValue = {
      ...value.eventDuration,
      [key]: newValue,
      totalDays,
      totalHours,
    };
    onChange("eventDuration", newEventDurationValue);
  };

  return (
    <Grid2 container gap={1} justifyContent={"space-between"}>
      <Grid2 size={6} container direction={"column"} gap={2}>
        <Grid2>
          <DatePicker
            label="Start date"
            onChange={(date) => handleChange("startDate", date)}
            value={value.eventDuration.startDate}
          />
        </Grid2>

        <Grid2>
          <DatePicker
            label="End date"
            onChange={(date) => handleChange("endDate", date)}
            value={value.eventDuration.endDate}
            minDate={value.eventDuration.startDate}
          />
        </Grid2>

        <Grid2>
          <TextField
            label={"Hours per day"}
            type={"tel"}
            defaultValue={value.eventDuration.dailyDuration}
            onBlur={(e) => handleChange("dailyDuration", e.target.value)}
            id="EventDurationHours"
          />
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 size={4}>
        <Grid2>
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon>
                <Today />
              </ListItemIcon>
              <ListItemText
                primary={`Total days: ${value.eventDuration.totalDays}`}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText
                primary={`Total hours: ${value.eventDuration.totalHours}`}
              />
            </ListItem>
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
