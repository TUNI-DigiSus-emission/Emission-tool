import { FormDataType } from "@/types";
import { Grid2, TextField } from "@mui/material";
import { useState } from "react";

interface SpaceProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Space({ value, onChange }: SpaceProps) {
  const [userNotChangedDays, setUserNotChangedDays] = useState(true);
  const [userNotChangedHours, setUserNotChangedHours] = useState(true);

  const handleChange = (key: keyof FormDataType["space"], newValue: number) => {
    if (key === "days" && userNotChangedDays) {
      setUserNotChangedDays(false);
    }
    if (key === "hours" && userNotChangedHours) {
      setUserNotChangedHours(false);
    }

    onChange("space", {
      ...value.space,
      [key]: newValue,
    });
  };

  const getDaysValue = () => {
    if (userNotChangedDays && value.space.days === 0) {
      return value.eventDuration.totalDays;
    }
    return value.space.days;
  };

  const getHoursValue = () => {
    if (userNotChangedHours && value.space.hours === 0) {
      return value.eventDuration.totalHours / value.eventDuration.totalDays;
    }

    return value.space.hours;
  };

  return (
    <Grid2 container direction={"column"} gap={2}>
      <Grid2>
        <TextField
          label={"Square meters"}
          type={"number"}
          defaultValue={value.space.size}
          onBlur={(e) => handleChange("size", parseInt(e.target.value))}
          id="spaceSquareMeters"
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"How many days?"}
          type={"number"}
          value={getDaysValue()}
          onChange={(e) => handleChange("days", parseInt(e.target.value))}
          id="spaceDays"
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"How many hours a day?"}
          type={"number"}
          value={getHoursValue()}
          onChange={(e) => handleChange("hours", parseInt(e.target.value))}
          id="spaceHoursPerDay"
        />
      </Grid2>
    </Grid2>
  );
}
