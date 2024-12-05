"use client";

import { useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Form from "@/modules/Form";
import { FormDataType, OutputList } from "@/types";
import dayjs from "dayjs";
import { calculateEmission, getInputData } from "@/utils";
import Results from "@/modules/Results";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fi";
import Notification from "@/components/Notification";

export default function Home() {
  const [result, setResult] = useState<OutputList | null>(null);
  const [error, setError] = useState({
    message: "",
    open: false,
    severity: "error",
  });
  const [pieImages, setPieImages] = useState<{
    blob: Blob,
    id: number
  }[]>([]);
  const [chartImages, setChartImages] = useState<{
    blob: Blob,
    id: number
  }[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    eventType: "Lecture/Information sharing",
    hybrid: false,
    eventScope: "Local",
    eventDuration: {
      startDate: dayjs(),
      endDate: dayjs(),
      dailyDuration: 0,
      totalDays: 1,
      totalHours: 0,
    },
    eventFormat: "On-site",

    attendees: {
      total: 0,
      local: 0,
      national: 0,
      international: 0,
    },
    transport: {
      public: 0,
      publicKm: 10,
      cars: 0,
      carsKm: 50,
      shortHaulFlights: 0,
      shortHaulFlightsKm: 500,
      longHaulFlights: 0,
      longHaulFlightsKm: 1000,
    },
    overnightStays: {
      amount: 0,
      nights: 0,
    },
    space: {
      size: 0,
      days: 0,
      hours: 0,
    },
    food: {
      provided: false,
      amountPerDay: 0,
      meatMealsAmount: 0,
      nonMeatMealsAmount: 0,
    },
    drink: {
      provided: false,
      amountPerDay: 0,
      cupsPerServing: 1,
    },
    digitalTools: {
      streamed: false,
      hoursStreamedPerDay: 0,
      usersWatching: 0,
      recorded: false,
      hoursRecordedPerDay: 0,
      stored: false,
      daysStored: 0,
    },
  });

  const onSubmit = async () => {
    try {
      const inputData = getInputData(formData);

      const data = calculateEmission(inputData);

      setPieImages([]);
      setChartImages([]);
      setResult(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fi"}>
      <Stack margin={"45px 0"} gap={2}>
        <Typography variant="h1" component="h1" textAlign={"center"}>
          Environmental Sustainability
          <br />
          Assessment for Events
        </Typography>
        <Divider />
        <Typography
          variant={"subtitle1"}
          alignSelf={"center"}
          textAlign={"center"}
          maxWidth={700}
        >
          The purpose of this tool is to help event organizers to make informed decisions on how to reduce carbon emissions of events. The tool aims to aid in decisions on whether to organize the event in face-to-face, hybrid, or virtual mode, and provide comparison of the emissions of each mode.
        </Typography>

        <Form
          formData={formData}
          setFormData={setFormData}
        />

        {formData.attendees.total < 1 &&
          <Typography textAlign={"center"}>Note! Event must have at least one attendee</Typography>
        }
        <Button
          onClick={() => onSubmit()}
          variant="contained"
          disabled={formData.attendees.total < 1}
        >
          Submit
        </Button>

        <Results
          data={result}
          input={formData}
          pieImages={pieImages}
          chartImages={chartImages}
          setPieImages={setPieImages}
          setChartImages={setChartImages}
        />
      </Stack>

      <Notification
        open={error.open}
        message={error.message}
        severity={error.severity}
        onClose={() => setError({ message: "", open: false, severity: "error" })}
      />
    </LocalizationProvider>
  );
}
