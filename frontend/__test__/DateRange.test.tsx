import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import DateRange from "../src/components/DateRange";
import dayjs from "dayjs";

describe("DateRange", () => {
  it("should render component", () => {
    const label = "Test date range";
    const value = dayjs("2024-11-20");
    const onDateChange = jest.fn();
    render(
      <DateRange
        label={label}
        value={value}
        onDateChange={onDateChange}
      />
    );

    // Check if the label and the value exist and are correct
    expect(screen.getByRole("textbox",{ name: label })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: label })).toHaveValue("20/11/2024");

    // Check if the value is changed
    fireEvent.change(screen.getByRole("textbox", { name: label }), {target: { value: "21/11/2024" },});
    expect(onDateChange).toHaveBeenCalledTimes(1);
  });
})
