import { Slider } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";

interface SliderProps {
  heading: string;
  id: string;
  onSlide: (value: number) => void;
}

export default function SliderComp({ heading, id, onSlide }: SliderProps) {
  const [sliderValue, setSliderValue] = useState(50);

  const handleSlider = (e) => {
    const setValue = e.target.value;
    setSliderValue(setValue);
    onSlide(setValue);
  };

  return (
    <>
      <Typography variant="h3" component="h3">
        {heading}
      </Typography>
      <Slider
        id={id}
        defaultValue={50}
        valueLabelDisplay="auto"
        value={sliderValue}
        onChange={handleSlider}
      />
    </>
  );
}
