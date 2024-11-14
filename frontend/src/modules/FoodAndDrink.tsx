import { FormDataType } from "@/types";
import { FormControlLabel, Grid2, Switch, TextField } from "@mui/material";

interface FoodAndDrinkProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function FoodAndDrink({
  value,
  onChange
}: FoodAndDrinkProps) {
  const handleChange = (
    key: keyof FormDataType["food"] | keyof FormDataType["drink"],
    variant: "food" | "drink",
    newValue: any
  ) => {
    onChange(variant, {
      ...value[variant],
      [key]: newValue
    });
  };

  return (
    <Grid2
      container
      direction={"column"}
      gap={1}
    >
      <Grid2>
        <FormControlLabel
          label={"Is food provided?"}
          control={
            <Switch
              checked={value.food.provided}
              onChange={() => handleChange("provided", "food", !value.food.provided)}
            />
          }
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of meals per day"}
          type={"number"}
          value={value.food.amountPerDay}
          onChange={(e) => handleChange("amountPerDay", "food", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of meals including meat"}
          type={"number"}
          value={value.food.meatMealsAmount}
          onChange={(e) => handleChange("meatMealsAmount", "food", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of non-meat meals"}
          type={"number"}
          value={value.food.nonMeatMealsAmount}
          onChange={(e) => handleChange("nonMeatMealsAmount", "food", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <FormControlLabel
          label={"Is coffee provided?"}
          control={
            <Switch
              checked={value.drink.provided}
              onChange={() => handleChange("provided", "drink", !value.drink.provided)}
            />
          }
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of times coffee is served per day"}
          type={"number"}
          value={value.drink.amountPerDay}
          onChange={(e) => handleChange("amountPerDay", "drink", parseInt(e.target.value))}
        />
      </Grid2>
      <Grid2>
        <TextField
          label={"Number of cups per serving"}
          type={"number"}
          value={value.drink.cupsPerServing}
          onChange={(e) => handleChange("cupsPerServing", "drink", parseInt(e.target.value))}
        />
      </Grid2>
    </Grid2>
  );
}
