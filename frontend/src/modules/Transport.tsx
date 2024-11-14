import { FormDataType } from "@/types";
import { Grid2, TextField } from "@mui/material";

interface TransportProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Transport({
  value,
  onChange
}: TransportProps) {
  const handleChange = (key: keyof FormDataType["transport"], newValue: number) => {
    onChange("transport", {
      ...value.transport,
      [key]: newValue
    });
  };

  return (
    <Grid2
      container
      direction={"column"}
      gap={1}
    >
      <Grid2 container gap={1}>
        <Grid2>
          <TextField
            label="Public transport (%)"
            type="number"
            value={value.transport.public}
            onChange={(e) => handleChange("public", parseInt(e.target.value))}
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Public transport (km)"
            type="number"
            value={value.transport.publicKm}
            onChange={(e) => handleChange("publicKm", parseInt(e.target.value))}
          />
        </Grid2>
      </Grid2>

      <Grid2 container gap={1}>
        <Grid2>
          <TextField
            label="Cars (%)"
            type="number"
            value={value.transport.cars}
            onChange={(e) => handleChange("cars", parseInt(e.target.value))}
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Cars (km)"
            type="number"
            value={value.transport.carsKm}
            onChange={(e) => handleChange("carsKm", parseInt(e.target.value))}
          />
        </Grid2>
      </Grid2>

      <Grid2 container gap={1}>
        <Grid2>
          <TextField
            label="Short haul flights (%)"
            type="number"
            value={value.transport.shortHaulFlights}
            onChange={(e) => handleChange("shortHaulFlights", parseInt(e.target.value))}
            disabled={value.eventScope === "Local"}
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Short haul flights (km)"
            type="number"
            value={value.transport.shortHaulFlightsKm}
            onChange={(e) => handleChange("shortHaulFlightsKm", parseInt(e.target.value))}
            disabled={value.eventScope === "Local"}
          />
        </Grid2>
      </Grid2>

      <Grid2 container gap={1}>
        <Grid2>
          <TextField
            label="Long haul flights (%)"
            type="number"
            value={value.transport.longHaulFlights}
            onChange={(e) => handleChange("longHaulFlights", parseInt(e.target.value))}
            disabled={["Local", "National"].includes(value.eventScope)}
          />
        </Grid2>
        <Grid2>
          <TextField
            label="Long haul flights (km)"
            type="number"
            value={value.transport.longHaulFlightsKm}
            onChange={(e) => handleChange("longHaulFlightsKm", parseInt(e.target.value))}
            disabled={["Local", "National"].includes(value.eventScope)}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
