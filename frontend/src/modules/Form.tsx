import { Divider, Paper, Stack } from "@mui/material";
import EventType from "./EventType";
import EventScope from "./EventScope";
import EventDuration from "./EventDuration";
import Attendees from "./Attendees";
import OvernightStays from "./OvernightStays";
import Space from "./Space";
import Transport from "./Transport";
import FoodAndDrink from "./FoodAndDrink";
import DigitalTools from "./DigitalTools";
import EventFormat from "./EventFormat";
import FormBlock from "@/components/FormBlock";
import { FormDataType } from "@/types";
import { Fragment } from "react";

interface FormProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function Form({
  formData,
  setFormData,
}: FormProps) {
  const handleChange = (key: keyof FormDataType, value: any) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const steps = [
    {
      label: "Event type",
      tooltipText:
      <div>
        <h3>What type the arranged event will be?</h3>
      </div>,
      content: <EventType value={formData} onChange={handleChange} />,
    },
    {
      label: "Event format",
      tooltipText:
      <div>
        <h3>What is the format of the arranged event?</h3>
      </div>,
      content: <EventFormat value={formData.eventFormat} onChange={handleChange} />,
    },
    {
      label: "Event Scope",
      tooltipText:
      <div>
        <h3>What is the approximate scope of the event?</h3>
        <ul>
          <li>Local</li>
          <ul>
            <li>Coming guests will come from the city of arranged event or from nearby areas</li>
            <ul>
              <li>Example: Event is held at Tampere and the guests come from Tampere or nearby Tampere</li>
            </ul>
          </ul>
          <li>National</li>
          <ul>
            <li>Coming guests will come from inside the nation where the event is held</li>
            <ul>
              <li>Example: Event is held at Tampere and the coming guests will come all around from Finland, for example, from Helsinki, Turku and Oulu.</li>
            </ul>
          </ul>
          <li>International</li>
          <ul>
            <li>Coming guests will come from all around the world.</li>
            <ul>
              <li>Example: The event is held at Tampere and guests are coming from France, Japan and United States</li>
            </ul>
          </ul>
        </ul>
      </div>,
      content: <EventScope value={formData.eventScope} onChange={handleChange} />,
    },
    {
      label: "Event Duration",
      tooltipText:
      <div>
        <h3>How long will the arranged event be?</h3>
      </div>,
      content: <EventDuration value={formData} onChange={handleChange} />,
    },
    {
      label: "Attendees",
      tooltipText:
      <div>
        <h3>Where are the guests coming from?</h3>
      </div>,
      content: <Attendees value={formData} onChange={handleChange} />,
    },
    {
      label: "Transportation",
      tooltipText:
      <div>
        <h3>Approximate percentage of guests visiting and the distance(km)</h3>
        <ul>
          <li>Public transport (bus)</li>
          <ul>
            <li>What percentage of the guests are going to use public transportation when coming to the event?</li>
            <li>What is the approximate distance from which guests who come by public transport (bus) are traveling?</li>
          </ul>
          <li>Cars</li>
          <ul>
            <li>What percentage of the guests are going to use their own cars when coming to the event?</li>
            <li>What is the approximate distance from which guests who come by car are traveling?</li>
          </ul>
          <li>Short-haul flights</li>
          <ul>
            <li>What percentage of the guests are going to fly short-haul distance (&lt; 463km) when coming to the event?</li>
            <li>What is the approximate distance from which guests who use short haul flights are traveling?</li>
          </ul>
          <li>Long-haul flights</li>
          <ul>
            <li>What percentage of the guests are going to fly long-haul distance (&gt; 463km) when coming to the event?</li>
            <li>What is the approximate distance from which guests who use long haul flights are traveling?</li>
          </ul>
        </ul>
      </div>,
      content: <Transport value={formData} onChange={handleChange} />,
    },
    {
      label: "Overnight Stays",
      tooltipText:
      <div>
        <h3>What is the approximate number of guests who will stay overnight, and how many nights one person is going to spend at the hotel?</h3>
      </div>,
      content: <OvernightStays value={formData} onChange={handleChange} />,
    },
    {
      label: "Event Space",
      tooltipText:
      <div>
        <h3>In what space is the event being held?</h3>
          <h4>Example space sizes</h4>
        <ul>
          <li>Large auditorium (300-645 seats) (300-645 m2)</li>
          <li>Small auditorium (Under 300 seats) (&lt; 300 m2)</li>
          <li>Large classroom (Over 45 seats) (&gt; 45 m2)</li>
          <li>Small classroom / Conference room (Under 45 seats) (&lt; 45 m2)</li>
          <li>Sources</li>
          <ul>
            <li>https://www.tuni.fi/fi/tutustu-meihin/vuokraa-tila-kampukselta</li>
            <li>The sizes of the spaces are calculated as number of seats * 1 square meter</li>
          </ul>
        </ul>
          <h4>Example</h4>
        <ul>
          <li>The event is held in a small auditorium. The event duration is two days, but the auditorium is used only for one day. The auditorium is used for two hours in that single day.</li>
          <ul>
            <li>Square meters = 100 m2</li>
            <li>How many days? = 1</li>
            <li>How many hours a day? = 2</li>
          </ul>
        </ul>
      </div>,
      content: <Space value={formData} onChange={handleChange} />,
    },
    {
      label: "Food and Drink",
      tooltipText:
      <div>
        <h3>How many of the guests are going to eat and/or drink coffee?</h3>
          <h4>Example (Food)</h4>
          <ul>
            <li>The food is served two times a day. 92 out of 100 guests are going to eat meat. The rest are non-meat eaters.</li>
            <ul>
              <li>Numbers of meals per day = 2</li>
              <li>Number of meals including meat = 92</li>
              <li>Number of non-meat meals = 8</li>
            </ul>
        </ul>
        <h3>How many of the guests are going to eat and/or drink coffee?</h3>
          <h4>Example (Coffee)</h4>
          <ul>
            <li>Coffee is served two times a day. One person drinks one cup (2dl) of coffee per serving.</li>
            <ul>
              <li>The number of times coffee is served = 2</li>
              <li>Number of cups per serving = 1</li>
            </ul>
          </ul>
      </div>,
      content: <FoodAndDrink value={formData} onChange={handleChange} />,
    },
    {
      label: "Digital Tools",
      tooltipText:
      <div>
        <h3>Are digital tools used to stream (Zoom, Microsoft Teams etc.) and/or record the event? If the event is recorded, is the recording going to be stored somewhere (YouTube, Panopto etc.)?</h3>
      </div>,
      content: <DigitalTools value={formData} onChange={handleChange} />,
    },
  ];

  return (
    <Paper>
      <Stack>
        {steps.map((step, index) => (
          <Fragment key={`form_block_${step.label}_${index}`}>
            <FormBlock
              label={step.label}
              tooltipText={step.tooltipText}
              content={step.content}
            />
            {index < steps.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Stack>
    </Paper>
  );
}
