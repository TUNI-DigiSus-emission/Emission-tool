import { FormDataType, InputType, OutputType } from "@/types";

export function getInputData(formData: FormDataType): InputType {
  const returnData: InputType = {
    transportation: {
      people: formData.attendees.total,
      carPercentage: formData.transport.cars,
      carDistance: formData.transport.carsKm,
      publicTransportPercentage: formData.transport.public,
      publicTransportDistance: formData.transport.publicKm,
      shortFlightPercentage: formData.transport.shortHaulFlights,
      shortFlightDistance: formData.transport.shortHaulFlightsKm,
      longFlightPercentage: formData.transport.longHaulFlights,
      longFlightDistance: formData.transport.longHaulFlightsKm,
    },
    housing: {
      people: formData.overnightStays.amount,
      nights: formData.overnightStays.nights,
    },
    space: getSpace(formData),
    coffee: formData.drink.provided
      ? {
          days: formData.eventDuration.totalDays,
          people:
            formData.attendees.total *
            formData.drink.cupsPerServing *
            formData.drink.amountPerDay,
        }
      : defaultCoffee,
    food: formData.food.provided
      ? {
          days: formData.eventDuration.totalDays,
          meatServings:
            formData.food.meatMealsAmount * formData.food.amountPerDay,
          nonMeatServings:
            formData.food.nonMeatMealsAmount * formData.food.amountPerDay,
        }
      : defaultFood,
    bandwidth: formData.digitalTools.streamed
      ? {
          people: formData.digitalTools.usersWatching,
          sessionLength:
            (formData.digitalTools.hoursStreamedPerDay !== 0
              ? formData.digitalTools.hoursStreamedPerDay
              : formData.eventDuration.dailyDuration) *
            formData.eventDuration.totalDays,
        }
      : defaultBandwidth,
    devices: {
      people: formData.digitalTools.usersWatching,
      sessionLength:
        formData.digitalTools.hoursStreamedPerDay *
        formData.eventDuration.totalDays,
    },
    recording: {
      recordingLength:
        (formData.digitalTools.hoursRecordedPerDay !== 0
          ? formData.digitalTools.hoursRecordedPerDay
          : formData.eventDuration.dailyDuration) *
        formData.eventDuration.totalDays,
      storageLifetime: formData.digitalTools.daysStored,
    },
    eventFormat: formData.eventFormat,

    attendees: {
      total: formData.attendees.total,
      local: formData.attendees.local,
      national: formData.attendees.national,
      international: formData.attendees.international,
    },

    duration: {
      dailyDuration: formData.eventDuration.dailyDuration,
      totalDays: formData.eventDuration.totalDays,
    },
  };

  return returnData;
}

const defaultFood: InputType["food"] = {
  days: 0,
  meatServings: 0,
  nonMeatServings: 0,
};

const defaultCoffee: InputType["coffee"] = {
  days: 0,
  people: 0,
};

const defaultBandwidth: InputType["bandwidth"] = {
  people: 0,
  sessionLength: 0,
};

const getSpace = (data: FormDataType) => {
  if (data.eventFormat === "Remote") {
    return {
      size: data.space.size,
      time: data.space.hours * data.space.days,
    };
  }

  if (data.space.hours === 0 && data.space.days === 0) {
    return {
      size: data.space.size,
      time: data.eventDuration.totalDays * data.eventDuration.dailyDuration,
    };
  }

  return {
    size: data.space.size,
    time: data.space.hours * data.space.days,
  };
};

const compareDifference = (data: OutputType[], result?: number) => {
  if (!data || !result) {
    return 0;
  }

  const og = data[0].total;
  return (og - result) * 100;
};

export const resultComparisonMeat = (result: number) => {
  return (result / 70.6).toFixed(2);
};

export const resultComparisonHousingTemperature = (result: number) => {
  return Math.ceil(result / 147.2);
};

export const resultComparisonCar = (result: number) => {
  return Math.ceil(result / 0.1221);
};

export function getCO2Text(type: string, data: OutputType[]): string {
  switch (type) {
    case "Hybrid":
      const value = compareDifference(data, data[2].total);
      return ` Due to this, arranging events as hybrid has almost certainly less severe environmental impact than an On-Site event. However, were it possible to have this event fully remote, further ${value} % of CO2 emissions could be saved. `;
    case "Remote":
      return ` With transport emissions removed from the equation, arranging an event fully remote is almost certainly the least environmentally impactful format. `;
    default:
      // On-site
      const co2 = data[1].total.toFixed(2);
      const co2Comparison = compareDifference(data, data[1].total).toFixed(2);
      const comparison = compareDifference(data, data[2].total);
      return ` If the event was held hybrid instead of on-site, the total CO2 emissions would be approximately ${co2} kg. This would lead to ${co2Comparison}% decrease in CO2 emissions, mainly due to cutting down on the effect of travel. In a case where it was possible to arrange the event completely remote, CO2 savings of ${comparison} %, could be gained. `;
  }
}

export function getEventTypeText(type: string): string {
  switch (type) {
    case "Networking":
      return "Networking events often work better as in-person events with easier interaction between attendees. Remote options would reduce carbon emissions but might hinder natural interactions. While reducing carbon footprint is a necessity in today's world, the main function should always be first in mind when planning events. If this main function is not reached, or is not attainable to reach in a satisfying enough degree, is arranging the event still worth it?";
    case "Workshop/hackathon":
      return "Workshop and Hackathon work best as in- person or hybrid events encouraging greater collaboration between attendees. Remote events can limit the social engagement of the event. It should be also remembered, that not all people are the same. Some type of people thrive in situations where co-operation is remote. Knowing your potential attendees and understanding their needs and personalities helps making the best possible decisions.";
    default:
      // Lecture/Information sharing
      return "Events where the main purpose is sharing information work well in remote formats minimizing the emissions from traveling. However, face-to-face formats should be considered if audience interaction with event and each other is considered an integral part of the event.";
  }
}
