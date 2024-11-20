import { FormDataType, InputType } from "@/types";

export function getInputData(formData: FormDataType) {
  const returnData: Record<string, string> = {
    transportation_people: formData.attendees.total.toString(),
    transportation_carPercentage: formData.transport.cars.toString(),
    transportation_carDistance: formData.transport.carsKm.toString(),
    transportation_publicTransportPercentage: formData.transport.public.toString(),
    transportation_publicTransportDistance: formData.transport.publicKm.toString(),
    transportation_shortFlightPercentage: formData.transport.shortHaulFlights.toString(),
    transportation_shortFlightDistance: formData.transport.shortHaulFlightsKm.toString(),
    transportation_longFlightPercentage: formData.transport.longHaulFlights.toString(),
    transportation_longFlightDistance: formData.transport.longHaulFlightsKm.toString(),
    housing_people: formData.overnightStays.amount.toString(),
    housing_nights: formData.overnightStays.nights.toString(),
    space_size: formData.space.size.toString(),
    space_time: (formData.space.hours * formData.space.days).toString(),
    coffee_days: formData.eventDuration.totalDays.toString(),
    coffee_people: (formData.attendees.total * formData.drink.cupsPerServing * formData.drink.amountPerDay).toString(),
    food_days: formData.eventDuration.totalDays.toString(),
    food_meatServings: (formData.food.meatMealsAmount * formData.food.amountPerDay).toString(),
    food_nonMeatServings: (formData.food.nonMeatMealsAmount * formData.food.amountPerDay).toString(),
    bandwidth_people: formData.digitalTools.usersWatching.toString(),
    bandwidth_sessionLength: (formData.digitalTools.hoursStreamedPerDay * formData.eventDuration.totalDays).toString(),
    devices_people: formData.digitalTools.usersWatching.toString(),
    devices_sessionLength: (formData.digitalTools.hoursStreamedPerDay * formData.eventDuration.totalDays).toString(),
    recording_recordingLength: (formData.digitalTools.hoursRecordedPerDay * formData.eventDuration.totalDays).toString(),
    recording_storageLifetime: formData.digitalTools.daysStored.toString(),
  };
  
  return new URLSearchParams(returnData).toString();
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
