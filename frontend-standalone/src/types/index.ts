import { Dayjs } from "dayjs";

export type FormDataType = {
  eventType:
    | "Lecture/Information sharing"
    | "Networking"
    | "Workshop/hackathon";
  hybrid: boolean;
  eventScope: "Local" | "National" | "International";
  eventDuration: {
    startDate: Dayjs;
    endDate: Dayjs;
    dailyDuration: number;
    totalDays: number;
    totalHours: number;
  };
  attendees: {
    total: number;
    local: number;
    national: number;
    international: number;
  };
  transport: {
    public: number;
    publicKm: number;
    cars: number;
    carsKm: number;
    shortHaulFlights: number;
    shortHaulFlightsKm: number;
    longHaulFlights: number;
    longHaulFlightsKm: number;
  };
  overnightStays: {
    amount: number;
    nights: number;
  };
  space: {
    size: number;
    days: number;
    hours: number;
  };
  food: {
    provided: boolean;
    amountPerDay: number;
    meatMealsAmount: number;
    nonMeatMealsAmount: number;
  };
  drink: {
    provided: boolean;
    amountPerDay: number;
    cupsPerServing: number;
  };
  digitalTools: {
    streamed: boolean;
    hoursStreamedPerDay: number;
    usersWatching: number;
    recorded: boolean;
    hoursRecordedPerDay: number;
    stored: boolean;
    daysStored: number;
  };
};

export type InputType = {
  transportation: TransportationType;
  housing: Housing;
  space: SpaceType;
  coffee: CoffeeType;
  food: FoodType;
  bandwidth: BandwidthType;
  devices: DevicesType;
  recording: RecordingType;
};

type TransportationType = {
  people: number;
  carPercentage: number;
  carDistance: number;
  publicTransportPercentage: number;
  publicTransportDistance: number;
  shortFlightPercentage: number;
  shortFlightDistance: number;
  longFlightPercentage: number;
  longFlightDistance: number;
};

type Housing = {
  people: number;
  nights: number;
}

type SpaceType = {
  size: number;
  time: number;
}

type CoffeeType = {
  days: number;
  people: number;
}

type FoodType = {
  days: number;
  meatServings: number;
  nonMeatServings: number;
}

type BandwidthType = {
  sessionLength: number;
  people: number;
}

type DevicesType = {
  people: number;
  sessionLength: number;
}

type RecordingType = {
  recordingLength: number;
  storageLifetime: number;
}

export type OutputType = {
  transportation: number;
  housing: number;
  space: number;
  coffee: number;
  food: number;
  bandwidth: number;
  devices: number;
  recording: number;
  total: number;
}
