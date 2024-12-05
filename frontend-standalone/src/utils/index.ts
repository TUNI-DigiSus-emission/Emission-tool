import { AttendeesType, BandwidthType, CoffeeType, DevicesType, DurationType, EventFormatType, FoodType, FormDataType, Housing, InputType, OutputType, RecordingType, SpaceType, TransportationType } from "@/types";

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


export function calculateEmission(data: InputType): OutputType[] {
  const transportation = data.transportation;
  const housing = data.housing;
  const space = data.space;
  const coffee = data.coffee;
  const food = data.food;
  const bandwidth = data.bandwidth;
  const devices = data.devices;
  const recording = data.recording;
  const eventFormat = data.eventFormat;
  const attendees = data.attendees;
  const duration = data.duration;


  const transportation_emission = calculateTransportation(transportation)
  const housing_emission = calculateHousing(housing)
  const space_emission = calculateSpace(space)
  const coffee_emission = calculateCoffee(coffee)
  const food_emission = calculateFood(food)
  const bandwidth_emission = calculateBandwidth(bandwidth)
  const devices_emission = calculateDevices(devices)
  const recording_emission = calculateRecording(recording)
  const total_emission = (transportation_emission +
    housing_emission +
    space_emission +
    coffee_emission +
    food_emission +
    bandwidth_emission +
    devices_emission +
    recording_emission)

  const inputResult = {
    transportation: transportation_emission,
    housing: housing_emission,
    space: space_emission,
    coffee: coffee_emission,
    food: food_emission,
    bandwidth: bandwidth_emission,
    devices: devices_emission,
    recording: recording_emission,
    format: eventFormat,
    total: total_emission
  };

  if (eventFormat === "On-site") {
    return [
      inputResult,
      calculateHybridEmission("Hybrid", transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration),
      calculateRemoteEmission("Remote", bandwidth, devices, recording, attendees, duration)
    ];
  } else if (eventFormat === "Hybrid") {
    return [
      inputResult,
      calculateOnSiteEmission("On-site", transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration),
      calculateRemoteEmission("Remote", bandwidth, devices, recording, attendees, duration)
    ];
  } else {
    return [
      inputResult,
      calculateOnSiteEmission("On-site", transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration),
      calculateHybridEmission("Hybrid", transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration),
      
    ];
  }
}

function calculateOnSiteEmission(
  format: EventFormatType,
  transportation: TransportationType,
  housing: Housing,
  space: SpaceType,
  coffee: CoffeeType,
  food: FoodType,
  bandwidth: BandwidthType,
  devices: DevicesType,
  recording: RecordingType,
  attendees: AttendeesType,
  duration: DurationType
): OutputType {
  const numOfPeople = attendees.total;
  const dailyHours = duration.dailyDuration;
  const eventDays = duration.totalDays;

  const transportationEmission = calculateTransportation({
    ...transportation,
    carPercentage: attendees.local / attendees.total / 2 * 100,
    publicTransportPercentage: attendees.local / attendees.total / 2 * 100,
    shortFlightDistance: attendees.national / attendees.total * 100,
    longFlightDistance: attendees.international / attendees.total * 100
  })
  const housingEmission = calculateHousing({
    ...housing,
    people: attendees.national + attendees.international,
    nights: eventDays - 1
  })
  const spaceEmission = calculateSpace({
    ...space,
    size: numOfPeople,
    time: dailyHours * eventDays
  })
  const coffeeEmission = calculateCoffee({
    ...coffee,
    days: eventDays,
    people: numOfPeople
  })
  const foodEmission = calculateFood({
    ...food,
    days: eventDays,
    meatServings: 0.8 * numOfPeople,
    nonMeatServings: 0.2 * numOfPeople
  })
  const bandwidthEmission = calculateBandwidth({
    ...bandwidth,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const devicesEmission = calculateDevices({
    ...devices,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const recordingEmission = calculateRecording(recording)
  const totalEmission = (transportationEmission +
    housingEmission +
    spaceEmission +
    coffeeEmission +
    foodEmission +
    bandwidthEmission +
    devicesEmission +
    recordingEmission)

  return {
    format: format,
    transportation: transportationEmission,
    housing: housingEmission,
    space: spaceEmission,
    coffee: coffeeEmission,
    food: foodEmission,
    bandwidth: bandwidthEmission,
    devices: devicesEmission,
    recording: recordingEmission,
    total: totalEmission
  }
}

function calculateHybridEmission(
  format: EventFormatType,
  transportation: TransportationType,
  housing: Housing,
  space: SpaceType,
  coffee: CoffeeType,
  food: FoodType,
  bandwidth: BandwidthType,
  devices: DevicesType,
  recording: RecordingType,
  attendees: AttendeesType,
  duration: DurationType
): OutputType {
  const numOfPeople = attendees.total;
  const dailyHours = duration.dailyDuration;
  const eventDays = duration.totalDays;

  const transportationEmission = calculateTransportation({
    ...transportation,
    carPercentage: attendees.local / attendees.total / 4 * 100,
    publicTransportPercentage: attendees.local / attendees.total / 4 * 100,
    shortFlightDistance: attendees.national / attendees.total / 2 * 100,
    longFlightDistance: attendees.international / attendees.total / 2 * 100
  })
  const housingEmission = calculateHousing({
    ...housing,
    people: (attendees.national + attendees.international) / 2,
    nights: eventDays - 1
  })
  const spaceEmission = calculateSpace({
    ...space,
    size: numOfPeople / 2,
    time: dailyHours * eventDays
  })
  const coffeeEmission = calculateCoffee({
    ...coffee,
    days: eventDays,
    people: numOfPeople / 2
  })
  const foodEmission = calculateFood({
    ...food,
    days: eventDays,
    meatServings: 0.8 * (numOfPeople / 2),
    nonMeatServings: 0.2 * (numOfPeople / 2)
  })
  const bandwidthEmission = calculateBandwidth({
    ...bandwidth,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const devicesEmission = calculateDevices({
    ...devices,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const recordingEmission = calculateRecording(recording)
  const totalEmission = (transportationEmission +
    housingEmission +
    spaceEmission +
    coffeeEmission +
    foodEmission +
    bandwidthEmission +
    devicesEmission +
    recordingEmission)

  return {
    format: format,
    transportation: transportationEmission,
    housing: housingEmission,
    space: spaceEmission,
    coffee: coffeeEmission,
    food: foodEmission,
    bandwidth: bandwidthEmission,
    devices: devicesEmission,
    recording: recordingEmission,
    total: totalEmission
  }
}

function calculateRemoteEmission(
  format: EventFormatType,
  bandwidth: BandwidthType,
  devices: DevicesType,
  recording: RecordingType,
  attendees: AttendeesType,
  duration: DurationType
): OutputType {
  const numOfPeople = attendees.total;
  const dailyHours = duration.dailyDuration;
  const eventDays = duration.totalDays;

  const bandwidthEmission = calculateBandwidth({
    ...bandwidth,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const devicesEmission = calculateDevices({
    ...devices,
    people: numOfPeople,
    sessionLength: dailyHours * eventDays
  })
  const recordingEmission = calculateRecording(recording)
  const totalEmission = (
    bandwidthEmission +
    devicesEmission +
    recordingEmission
  )

  return {
    format: format,
    transportation: 0,
    housing: 0,
    space: 0,
    coffee: 0,
    food: 0,
    bandwidth: bandwidthEmission,
    devices: devicesEmission,
    recording: recordingEmission,
    total: totalEmission
  }
}


export function calculateTransportation(
  data: InputType["transportation"]
): number {
  return data.people * 2 *
    (data.carPercentage / 100 * 0.184 * data.carDistance +
      data.publicTransportPercentage / 100 * 0.0649 * data.publicTransportDistance +
      data.shortFlightPercentage / 100 * 0.5709 * data.shortFlightDistance +
      data.longFlightPercentage / 100 * 0.297 * data.longFlightDistance);
}

export function calculateHousing(data: InputType["housing"]): number {
  return data.people * data.nights * 121.36 * 0.5;
}

export function calculateSpace(data: InputType["space"]): number {
  return data.size * data.time * 0.00466;
}

export function calculateCoffee(data: InputType["coffee"]): number {
  return data.days * data.people * 0.2 * 0.6;
}

export function calculateFood(data: InputType["food"]): number {
  return data.days * (data.meatServings * 2.1725 + data.nonMeatServings * 0.9025);
}

export function calculateBandwidth(data: InputType["bandwidth"]): number {
  return data.people * data.sessionLength * 0.5546;
}

export function calculateDevices(data: InputType["devices"]): number {
  return data.people * data.sessionLength * 0.116539;
}

export function calculateRecording(data: InputType["recording"]): number {
  return 0.00002854 * data.storageLifetime * data.recordingLength * 0.4;
}

