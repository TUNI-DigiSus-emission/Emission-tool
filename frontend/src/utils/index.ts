import { FormDataType, InputType } from "@/types";

export function getInputData(formData: FormDataType): InputType {
  const returnData: InputType = {
    transportation: {
      people: formData.attendees.total,
      carPercentage: formData.transport.cars,
      carDistance: formData.transport.carsKm,
      publicTransportPercentage: formData.transport.public,
      publicTransportDistance:  formData.transport.publicKm,
      shortFlightPercentage: formData.transport.shortHaulFlights,
      shortFlightDistance:  formData.transport.shortHaulFlightsKm,
      longFlightPercentage: formData.transport.longHaulFlights,
      longFlightDistance:  formData.transport.longHaulFlightsKm,
    },
    housing: {
      people: formData.overnightStays.amount,
      nights: formData.overnightStays.nights
    },
    space: {
      size: formData.space.size,
      time: formData.space.hours * formData.space.days
    },
    coffee: {
      days: formData.eventDuration.totalDays,
      people: formData.attendees.total * formData.drink.cupsPerServing * formData.drink.amountPerDay
    },
    food: {
      days: formData.eventDuration.totalDays,
      meatServings: formData.food.meatMealsAmount * formData.food.amountPerDay,
      nonMeatServings: formData.food.nonMeatMealsAmount * formData.food.amountPerDay,
    },
    bandwidth: {
      people: formData.digitalTools.usersWatching,
      sessionLength: formData.digitalTools.hoursStreamedPerDay * formData.eventDuration.totalDays,
    },
    devices: {
      people: formData.digitalTools.usersWatching,
      sessionLength: formData.digitalTools.hoursStreamedPerDay * formData.eventDuration.totalDays,
    },
    recording: {
      recordingLength: formData.digitalTools.hoursRecordedPerDay * formData.eventDuration.totalDays,
      storageLifetime: formData.digitalTools.daysStored
    },
  };

  return returnData;
}
