import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NumberField from "../src/components/NumberField";
import { getById } from "./test.utils";

describe("NumberField", () => {
  it("should render component", () => {
    const heading = "Test Heading";
    const id = "test_id";
    const dom = render(
      <NumberField
        heading={heading}
        id={id}
        onChange={() => { }}
      />
    );

    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(getById(dom, id)).toBeInTheDocument();
  });
});
