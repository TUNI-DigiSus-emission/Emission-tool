"use client";

import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import Form from "@/modules/Form";
import { FormDataType, OutputType } from "@/types";
import dayjs from "dayjs";
import { getInputData } from "@/utils";
import Results from "@/modules/Results";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/fi';

export default function Home() {
  const [result, setResult] = useState<OutputType | null>(null);
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
      cupsPerServing: 0,
    },
    digitalTools: {
      streamed: false,
      hoursStreamedPerDay: 0,
      usersWatching: 0,
      recorded: false,
      hoursRecordedPerDay: 0,
      stored: false,
      daysStored: 0,
    }
  });

  const onSubmit = async () => {
    try {
      const inputData = getInputData(formData);

      const response = await axios.post(
        "http://localhost:8000/v1/calculate",
        inputData
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fi"}>
      {/* <button
        onClick={() => {
          fetch("/").then((res) => res.json()).then((data) => console.log(data));
        }}
      >
        Click me
      </button> */}
      <Stack
        margin={"45px 0"}
        gap={2}
      >
        <Typography variant="h1" component="h1">
          DigiSus - Emission Calculator
        </Typography>

        <Form
          formData={formData}
          setFormData={setFormData}
          handleSubmit={() => onSubmit()}
        />

        <Results data={result} />
      </Stack>
    </LocalizationProvider>
  );
}
