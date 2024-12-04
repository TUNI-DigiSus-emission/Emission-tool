import { FormDataType } from "@/types";
import { Bed } from "@mui/icons-material";
import { Divider, Grid2, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";

interface OvernightStaysProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function OvernightStays({
  value,
  onChange,
}: OvernightStaysProps) {
  const handleChange = (
    key: keyof FormDataType["overnightStays"],
    newValue: number
  ) => {
    const valueParsed = isNaN(newValue) || newValue < 0 ? 0 : newValue;

    onChange("overnightStays", {
      ...value.overnightStays,
      [key]: valueParsed,
    });
  };

  return (
    <Grid2 container gap={1} justifyContent={"space-between"}>
      <Grid2 size={6} container direction={"column"} gap={2}>
        <Grid2>
          <TextField
            label={"Number of people staying overnight"}
            type={"number"}
            defaultValue={value.overnightStays.amount}
            onBlur={(e) => handleChange("amount", parseInt(e.target.value))}
            id="OvernightStaysPeople"
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of nights"}
            type={"number"}
            defaultValue={value.overnightStays.nights}
            onBlur={(e) => handleChange("nights", parseInt(e.target.value))}
            id="OvernightStaysNights"
          />
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 size={4}>
        <Grid2>
          <List disablePadding>
            <ListItem disableGutters>
              <ListItemIcon>
                <Bed />
              </ListItemIcon>
              <ListItemText
                primary={`Total amount of nights: ${value.overnightStays.amount * value.overnightStays.nights}`}
              />
            </ListItem>
          </List>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
