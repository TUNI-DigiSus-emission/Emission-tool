import { ChangeEvent } from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
  label?: string;
  items: string[];
  value?: string;
  onSelectItem: (item: string) => void;
}

export default function RadioField({
  label,
  items,
  value,
  onSelectItem,
}: Props) {
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectItem(e.target.value);
  };

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        value={value}
      >
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item}
            control={
              <Radio
                onChange={handleOptionChange}
              />
            }
            label={item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
