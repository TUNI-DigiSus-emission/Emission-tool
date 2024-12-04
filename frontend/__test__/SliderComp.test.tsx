import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SliderComp from "../src/components/SliderComp";
import { getById } from "./test.utils";

describe("SliderComp", () => {
  it("should render component and change the slider value", () => {
    const heading = "Test Heading";
    const id = "test_id";
    const onSlide = jest.fn()
    const dom = render(
      <SliderComp
        heading={heading}
        id={id}
        onSlide={onSlide}
      />
    );

    // Check that the heading and id are rendered
    expect(screen.getByText(heading)).toBeInTheDocument();
    expect(getById(dom, id)).toBeInTheDocument();

    // Check that the slider's value is changed
    fireEvent.change(screen.getByRole("slider"), {target: {value: "90"}});
    expect(onSlide).toHaveBeenCalledTimes(1);
  });
});
