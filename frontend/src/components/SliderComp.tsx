import { Slider, Tooltip } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";

interface SliderProps {
  heading: string;
  id: string;
  onSlide: (value: number) => void;
  tooltipTitle?: string;
  disabled?: boolean;
}

export default function SliderComp({
  heading,
  id,
  onSlide,
  tooltipTitle,
  disabled
}: SliderProps) {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSlider = (value: number | number[]) => {
    if (Array.isArray(value)) {
      value = value[0];
    }

    setSliderValue(value);
    onSlide(value);
  };

  return (
    <Tooltip title={tooltipTitle} placement="bottom">
      <div>
        <Typography variant="caption">{heading}</Typography>
        <Slider
          id={id}
          valueLabelDisplay="auto"
          value={sliderValue}
          onChange={(_, value) => handleSlider(value)}
          disabled={disabled}
          step={5}
        />
      </div>
    </Tooltip>
  );
}
