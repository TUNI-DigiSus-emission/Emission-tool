import { FormDataType, InputType } from "@/types";

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

export function calculateTransportation(
  data: InputType["transportation"]
) {
  return data.people *
    (data.carPercentage * 0.184 * data.carDistance +
      data.publicTransportPercentage * 0.0649 * data.publicTransportDistance +
      data.shortFlightPercentage * 0.5709 * data.shortFlightDistance +
      data.longFlightPercentage * 0.297 * data.longFlightDistance);
}

export function calculateHousing(data: InputType["housing"]): number {
  return data.people * data.nights * 121.36 * 0.5;
}

export function calculateSpace(data: InputType["space"]): number {
  return data.size * data.time * 0.00466;
}

export function calculateCoffee(data: InputType["coffee"]): number {
  return data.days * data.people * 0.2 * 0.9;
}

export function calculateFood(data: InputType["food"]): number {
  return data.days * (data.meatServings * 2.1725 + data.nonMeatServings * 0.9025);
}

export function calculateBandwidth(data: InputType["bandwidth"]): number {
  return data.people * data.sessionLength * 0.5546;
}

export function calculatePhysicalDevices(data: InputType["devices"]): number {
  return data.people * data.sessionLength * 0.116539;
}

export function calculateRecording(data: InputType["recording"]): number {
  return 0.00002854 * data.storageLifetime * data.recordingLength * 0.4;
}
