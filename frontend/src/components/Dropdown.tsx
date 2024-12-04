import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

interface Props {
  heading: string;
  id: string;
  choices: { value: string; label: string }[];
  onChange: (selection: string) => void;
}

export default function Dropdown({
  heading,
  id,
  choices,
  onChange,
}: Props) {

  const handleSelection = (e: SelectChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <>
      <Typography variant="h3">{heading}</Typography>
      <Select
        id={id}
        defaultValue=""
        displayEmpty
        onChange={handleSelection}
      >
        <MenuItem value="">
          Select an option
        </MenuItem>

        {choices.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
