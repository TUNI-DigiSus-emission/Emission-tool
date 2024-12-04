import { FormDataType } from "@/types";
import {
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
} from "@mui/material";
import { People } from "@mui/icons-material";

interface AttendeesProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Attendees({ value, onChange }: AttendeesProps) {
  const handleChange = (
    key: keyof FormDataType["attendees"],
    newValue: number
  ) => {
    const valueParsed = isNaN(newValue) || newValue < 0 ? 0 : newValue;

    const local = key === "local" ? valueParsed : value.attendees.local;
    const national =
      key === "national" ? valueParsed : value.attendees.national;
    const international =
      key === "international" ? valueParsed : value.attendees.international;
    const total = local + national + international;

    onChange("attendees", {
      local,
      national,
      international,
      total,
    });
  };

  return (
    <Grid2 container gap={1} justifyContent={"space-between"}>
      <Grid2 container direction="column" size={6} gap={2}>
        <Grid2>
          <TextField
            label={"Local attendees"}
            type={"number"}
            defaultValue={value.attendees.local}
            onBlur={(e) => handleChange("local", parseInt(e.target.value))}
            id="attendeesLocal"
          />
        </Grid2>
        <Grid2>
          <Tooltip
            title={
              value.eventScope === "Local"
                ? "This field is disabled because the event scope is Local"
                : ""
            }
            placement="bottom"
          >
            <TextField
              label={"National attendees"}
              type={"number"}
              defaultValue={value.attendees.national}
              onBlur={(e) => handleChange("national", parseInt(e.target.value))}
              disabled={value.eventScope === "Local"}
              id="attendeesNational"
            />
          </Tooltip>
        </Grid2>
        <Grid2>
          <Tooltip
            title={
              ["Local", "National"].includes(value.eventScope)
                ? "This field is disabled because the event scope isn't International"
                : ""
            }
            placement="bottom"
          >
            <TextField
              label={"International attendees"}
              type={"number"}
              defaultValue={value.attendees.international}
              onBlur={(e) =>
                handleChange("international", parseInt(e.target.value))
              }
              disabled={["Local", "National"].includes(value.eventScope)}
              id="attendeesInternational"
            />
          </Tooltip>
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 size={4}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemAvatar>
              <People />
            </ListItemAvatar>
            <ListItemText
              primary={`Total attendees: ${value.attendees.total}`}
            />
          </ListItem>
        </List>
      </Grid2>
    </Grid2>
  );
}
