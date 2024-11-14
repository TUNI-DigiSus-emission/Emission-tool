import { FormDataType } from "@/types";
import { Grid2, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { People } from "@mui/icons-material";

interface AttendeesProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Attendees({
  value,
  onChange
}: AttendeesProps) {
  const handleChange = (key: keyof FormDataType["attendees"], newValue: number) => {
    const valueParsed = isNaN(newValue) || newValue < 0 ? 0 : newValue;

    const local = key === "local" ? valueParsed : value.attendees.local;
    const national = key === "national" ? valueParsed : value.attendees.national;
    const international = key === "international" ? valueParsed : value.attendees.international;
    const total = local + national + international;

    onChange("attendees", {
      local,
      national,
      international,
      total
    });
  };

  return (
    <Grid2
      container
      direction="column"
      gap={1}
    >
      <Grid2>
        <TextField
          label={"Local attendees"}
          type={"number"}
          defaultValue={value.attendees.local}
          onChange={(e) => handleChange("local", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"National attendees"}
          type={"number"}
          defaultValue={value.attendees.national}
          onChange={(e) => handleChange("national", parseInt(e.target.value))}
          disabled={value.eventScope === "Local"}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"International attendees"}
          type={"number"}
          defaultValue={value.attendees.international}
          onChange={(e) => handleChange("international", parseInt(e.target.value))}
          disabled={["Local", "National"].includes(value.eventScope)}
        />
      </Grid2>
      <Grid2>
        <List>
          <ListItem>
            <ListItemAvatar>
              <People />
            </ListItemAvatar>
            <ListItemText primary={`Total attendees: ${value.attendees.total}`}/>
          </ListItem>
        </List>
      </Grid2>
    </Grid2>
  );
}
