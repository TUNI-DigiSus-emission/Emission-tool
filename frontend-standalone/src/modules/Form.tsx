import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
} from "@mui/material";
import { useState } from "react";
import EventType from "./EventType";
import EventScope from "./EventScope";
import EventDuration from "./EventDuration";
import Attendees from "./Attendees";
import OvernightStays from "./OvernightStays";
import Space from "./Space";
import Transport from "./Transport";
import FoodAndDrink from "./FoodAndDrink";
import DigitalTools from "./DigitalTools";
import { FormDataType } from "@/types";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

interface FormProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  handleSubmit: () => void;
}

export default function Form({
  formData,
  setFormData,
  handleSubmit,
}: FormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (key: keyof FormDataType, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const steps = [
    {
      label: (
        <div>
          {" "}
          Event type{" "}
          <Tooltip title="Information about event type">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <EventType value={formData} onChange={handleChange} />
        </div>
      ),
    },
    {
      label: (
        <div>
          Event Scope{" "}
          <Tooltip title="Information about Event Scope">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <EventScope value={formData.eventScope} onChange={handleChange} />
        </div>
      ),
    },
    {
      label: (
        <div>
          Event Duration{" "}
          <Tooltip title="Information about Event Duration">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <EventDuration value={formData} onChange={handleChange} />
          {/* How many days?
          How many hours a day? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Attendees{" "}
          <Tooltip title="Information about Attendees">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <Attendees value={formData} onChange={handleChange} />
          {/* How many? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Transport{" "}
          <Tooltip title="Information about Transportation">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <Transport value={formData} onChange={handleChange} />
          {/* How much public transport?
          How much cars?
          How much short haul flights?
          How much long haul flights? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Overnight Stays{" "}
          <Tooltip title="Information about Accommodation">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <OvernightStays value={formData} onChange={handleChange} />
          {/* How many will sleep?
          How many nights? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Space{" "}
          <Tooltip title="Information about Event Space">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <Space value={formData} onChange={handleChange} />
          {/* How many square meters?
          How many days?
          How many hours per day? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Food and Drink{" "}
          <Tooltip title="Information about Food and Drink">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <FoodAndDrink value={formData} onChange={handleChange} />
          {/* How many meals per day?
          How much meals include meat?
          How much non-meat meals?
          How much coffee? */}
        </div>
      ),
    },
    {
      label: (
        <div>
          Digital Tools{" "}
          <Tooltip title="Information about the Digital Tools">
            <InfoIcon />
          </Tooltip>
        </div>
      ),
      content: (
        <div>
          <DigitalTools value={formData} onChange={handleChange} />
          {/* How many hours streamed?
          How many devices used?
          How many hours recorded? */}
        </div>
      ),
    },
  ];

  return (
    <Stack>
      <Paper>
        <Box padding={2}>
          <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepButton onClick={() => setActiveStep(index)}>
                  {step.label}
                </StepButton>
                <StepContent>
                  <Stack gap={2}>
                    {step.content}
                    <Button
                      onClick={() => {
                        if (index === steps.length - 1) {
                          handleSubmit();
                        }
                        setActiveStep((as) => as + 1);
                      }}
                      variant={"outlined"}
                    >
                      {index === steps.length - 1 ? "Submit" : "Continue"}
                    </Button>
                  </Stack>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Paper>
    </Stack>
  );
}
