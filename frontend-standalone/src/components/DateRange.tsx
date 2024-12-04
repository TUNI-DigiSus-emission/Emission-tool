import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface Props {
  label: string;
  value: Dayjs;
  onDateChange: (formattedDate: string | null) => void;
}

export default function DateRange({ label, value, onDateChange }: Props) {
  const handleDateChange = (newValue: Dayjs | null) => {
    const formattedDate = newValue ? newValue.format("DD/MM/YYYY") : null;
    onDateChange(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        format="DD/MM/YYYY"
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}
