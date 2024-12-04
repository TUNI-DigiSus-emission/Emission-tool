import { FormDataType } from "@/types";
import { Coffee, DinnerDining, LunchDining, RiceBowl } from "@mui/icons-material";
import { Divider, FormControlLabel, Grid2, List, ListItem, ListItemIcon, ListItemText, Switch, TextField, Tooltip } from "@mui/material";

interface FoodAndDrinkProps {
  value: FormDataType;
  onChange: (key: keyof FormDataType, value: any) => void;
}

export default function FoodAndDrink({ value, onChange }: FoodAndDrinkProps) {
  const handleChange = (
    key: keyof FormDataType["food"] | keyof FormDataType["drink"],
    variant: "food" | "drink",
    newValue: any
  ) => {
    const formattedNewValue = !newValue || newValue === "" || newValue < 0 ? 0 : newValue;

    onChange(variant, {
      ...value[variant],
      [key]: formattedNewValue,
    });
  };

  const getShouldHighlight = () => {
    return value.food.amountPerDay !== 0 && value.food.meatMealsAmount === 0 && value.food.nonMeatMealsAmount === 0;
  }

  return (
    <Grid2 container gap={1} justifyContent={"space-between"}>
      <Grid2 size={6} container direction={"column"} gap={2}>
        <Grid2>
          <FormControlLabel
            label={"Is food provided?"}
            control={
              <Tooltip
                title={value.food.provided ? "Yes" : "No"}
                placement="top"
                arrow
              >
                <Switch
                  checked={value.food.provided}
                  onChange={() =>
                    handleChange("provided", "food", !value.food.provided)
                  }
                />
              </Tooltip>
            }
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of meals per day"}
            type={"number"}
            defaultValue={value.food.amountPerDay}
            onBlur={(e) =>
              handleChange("amountPerDay", "food", parseInt(e.target.value))
            }
            disabled={!value.food.provided}
            id="foodAndDrinkMeals"
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of meals including meat"}
            type={"number"}
            defaultValue={value.food.meatMealsAmount}
            onBlur={(e) =>
              handleChange("meatMealsAmount", "food", parseInt(e.target.value))
            }
            disabled={!value.food.provided}
            color={getShouldHighlight() ? "secondary" : "primary"}
            focused={getShouldHighlight() ? true : undefined}
            id="foodAndDrinkMealsWithMeat"
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of non-meat meals"}
            type={"number"}
            defaultValue={value.food.nonMeatMealsAmount}
            onBlur={(e) =>
              handleChange("nonMeatMealsAmount", "food", parseInt(e.target.value))
            }
            disabled={!value.food.provided}
            color={getShouldHighlight() ? "secondary" : "primary"}
            focused={getShouldHighlight() ? true : undefined}
            id="foodAndDrinkMealsWithoutMeat"
          />
        </Grid2>
        <Grid2>
          <FormControlLabel
            label={"Is coffee provided?"}
            control={
              <Tooltip
                title={value.drink.provided ? "Yes" : "No"}
                placement="top"
                arrow
              >
                <Switch
                  checked={value.drink.provided}
                  onChange={() =>
                    handleChange("provided", "drink", !value.drink.provided)
                  }
                />
              </Tooltip>
            }
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of times coffee is served per day"}
            type={"number"}
            defaultValue={value.drink.amountPerDay}
            onBlur={(e) =>
              handleChange("amountPerDay", "drink", parseInt(e.target.value))
            }
            disabled={!value.drink.provided}
            id="foodAndDrinkTimesCoffeeServed"
          />
        </Grid2>
        <Grid2>
          <TextField
            label={"Number of cups per serving (2 dl)"}
            type={"number"}
            defaultValue={value.drink.cupsPerServing}
            onBlur={(e) =>
              handleChange("cupsPerServing", "drink", parseInt(e.target.value))
            }
            disabled={!value.drink.provided}
            id="foodAndDrinkCoffeePerServing"
          />
        </Grid2>
      </Grid2>

      <Divider orientation="vertical" flexItem />

      <Grid2 size={4}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemIcon>
              <LunchDining />
            </ListItemIcon>
            <ListItemText
              primary={`Meat meals total: ${value.food.amountPerDay * value.food.meatMealsAmount}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <RiceBowl />
            </ListItemIcon>
            <ListItemText
              primary={`Non-meat meals total: ${value.food.amountPerDay * value.food.nonMeatMealsAmount}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <DinnerDining />
            </ListItemIcon>
            <ListItemText
              primary={`Meals in total: ${((value.food.amountPerDay * value.food.meatMealsAmount) + (value.food.amountPerDay * value.food.nonMeatMealsAmount)) * value.eventDuration.totalDays}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <Coffee />
            </ListItemIcon>
            <ListItemText
              primary={`Coffee cups total: ${value.drink.amountPerDay * value.drink.cupsPerServing * value.eventDuration.totalDays * value.attendees.total}`}
            />
          </ListItem>
        </List>
      </Grid2>
    </Grid2>
  );
}
