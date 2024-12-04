import { FormDataType } from "@/types";
import { Divider, Grid2, List, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip, Typography } from "@mui/material";
import SliderComp from "../components/SliderComp";
import { DirectionsCar, Flight, Train } from "@mui/icons-material";

interface TransportProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function Transport({ value, onChange }: TransportProps) {
  const handleChange = (
    key: keyof FormDataType["transport"],
    newValue: number
  ) => {
    const fixedNewValue = newValue < 0 ? 0 : newValue;

    onChange("transport", {
      ...value.transport,
      [key]: fixedNewValue,
    });
  };

  const totalValue = () => {
    return (
      value.transport.public +
      value.transport.cars +
      value.transport.shortHaulFlights +
      value.transport.longHaulFlights >
      100
    );
  };

  const getPublicTotal = () => {
    return Number(((value.transport.public / 100) * value.attendees.total * value.transport.publicKm).toFixed(0));
  }

  const getCarsTotal = () => {
    return Number(((value.transport.cars / 100) * value.attendees.total * value.transport.carsKm).toFixed(0));
  }

  const getShortHaulFlightsTotal = () => {
    return Number(((value.transport.shortHaulFlights / 100) * value.attendees.total * value.transport.shortHaulFlightsKm).toFixed(0));
  }

  const getLongHaulFlightsTotal = () => {
    return Number(((value.transport.longHaulFlights / 100) * value.attendees.total * value.transport.longHaulFlightsKm).toFixed(0));
  }

  const getTotalKms = () => {
    return (
      getPublicTotal() +
      getCarsTotal() +
      getShortHaulFlightsTotal() +
      getLongHaulFlightsTotal()
    );
  }

  return (
    <Grid2 container gap={1} marginLeft={1} justifyContent={"space-between"}>
      <Grid2 container gap={2} direction={"column"} size={6}>
        {totalValue() && (
          <Typography color="error">Total cannot exceed 100</Typography>
        )}
        <Grid2 container gap={1} justifyContent={"space-between"}>
          <Grid2 size={5}>
            <SliderComp
              heading="Public transport (%)"
              id="pubper"
              onSlide={(value: number) => handleChange("public", value)}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Public transport (avg. km)"
              type="number"
              defaultValue={value.transport.publicKm}
              onBlur={(e) => handleChange("publicKm", parseInt(e.target.value))}
              id="transportPublicKm"
              error={value.transport.publicKm < 0}
              helperText={value.transport.publicKm < 0 ? "Value cannot be negative" : ""}
            />
          </Grid2>
        </Grid2>

        <Grid2 container gap={1} justifyContent={"space-between"}>
          <Grid2 size={5}>
            <SliderComp
              heading="Cars (%)"
              id="carper"
              onSlide={(value: number) => handleChange("cars", value)}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              label="Cars (avg. km)"
              type="number"
              defaultValue={value.transport.carsKm}
              onBlur={(e) => handleChange("carsKm", parseInt(e.target.value))}
              id="transportCarsKm"
            />
          </Grid2>
        </Grid2>

        <Grid2 container gap={1} justifyContent={"space-between"}>
          <Grid2 size={5}>
            <SliderComp
              heading="Short haul flights (%)"
              id="sflightper"
              onSlide={(value: number) => handleChange("shortHaulFlights", value)}
              disabled={value.eventScope === "Local"}
              tooltipTitle={value.eventScope.toLowerCase() === "local" ? "Disabled for local events" : ""}
            />
          </Grid2>
          <Grid2 size={6}>
            <Tooltip
              title={value.eventScope.toLowerCase() === "local" ? "Disabled for local events" : ""}
              placement="bottom"
            >
              <TextField
                label="Short haul flights (avg. km)"
                type="number"
                defaultValue={value.transport.shortHaulFlightsKm}
                onBlur={(e) =>
                  handleChange("shortHaulFlightsKm", parseInt(e.target.value))
                }
                disabled={value.eventScope === "Local"}
                id="transportShortHaulKm"
              />
            </Tooltip>
          </Grid2>
        </Grid2>


        <Grid2 container gap={1} justifyContent={"space-between"}>
          <Grid2 size={5}>
            <SliderComp
              heading="Long haul flights (%)"
              id="lflightper"
              onSlide={(value: number) => handleChange("longHaulFlights", value)}
              disabled={["Local", "National"].includes(value.eventScope)}
              tooltipTitle={["Local", "National"].includes(value.eventScope) ? "Disabled for local and national events" : ""}
            />
          </Grid2>
          <Grid2 size={6}>
            <Tooltip
              title={["Local", "National"].includes(value.eventScope) ? "Disabled for local and national events" : ""}
              placement="bottom"
            >
              <TextField
                label="Long haul flights (avg. km)"
                type="number"
                defaultValue={value.transport.longHaulFlightsKm}
                onBlur={(e) =>
                  handleChange("longHaulFlightsKm", parseInt(e.target.value))
                }
                disabled={["local", "national"].includes(value.eventScope.toLowerCase())}
                id="transportLongHaulKm"
              />
            </Tooltip>
          </Grid2>
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 container gap={2} size={4}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Train />
            </ListItemAvatar>
            <ListItemText>Total public transport km: {getPublicTotal()}</ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <DirectionsCar />
            </ListItemAvatar>
            <ListItemText>Total cars km: {getCarsTotal()}</ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Flight />
            </ListItemAvatar>
            <ListItemText>Total short haul flights km: {getShortHaulFlightsTotal()}</ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Flight />
            </ListItemAvatar>
            <ListItemText>Total long haul flights km: {getLongHaulFlightsTotal()}</ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar />
            <ListItemText>Total km: {getTotalKms()}</ListItemText>
          </ListItem>
        </List>
      </Grid2>
    </Grid2>
  );
}
