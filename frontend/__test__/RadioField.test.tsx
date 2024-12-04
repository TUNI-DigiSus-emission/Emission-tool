import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RadioField from "../src/components/RadioField";

describe("RadioField", () => {
  it("should render component and check an option", () => {
    const label = "Test label";
    const mockItems = ["item1", "item2", "item3"]
    render(
      <RadioField
        label={label}
        items={mockItems}
        onSelectItem={() => { }}
      />
    );

    // Check if the label and items are rendered
    expect(screen.getByText(label)).toBeInTheDocument();

    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    // Check if the option 2 is checked when it is clicked
    const item2 = screen.getByRole("radio", { name: "item2" });
    fireEvent.click(item2);
    expect(item2).toBeChecked();
  });
});
