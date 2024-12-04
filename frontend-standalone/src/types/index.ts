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
  eventFormat: "On-site" | "Hybrid" | "Remote";

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
  eventFormat: EventFormatType;
  attendees: AttendeesType;
  duration: DurationType;
};

export type TransportationType = {
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

export type Housing = {
  people: number;
  nights: number;
};

export type SpaceType = {
  size: number;
  time: number;
};

export type CoffeeType = {
  days: number;
  people: number;
};

export type FoodType = {
  days: number;
  meatServings: number;
  nonMeatServings: number;
};

export type BandwidthType = {
  sessionLength: number;
  people: number;
};

export type DevicesType = {
  people: number;
  sessionLength: number;
};

export type RecordingType = {
  recordingLength: number;
  storageLifetime: number;
};

export type EventFormatType = "On-site" | "Hybrid" | "Remote";

export type AttendeesType = {
  total: number;
  local: number;
  national: number;
  international: number;
};

export type DurationType = {
  dailyDuration: number;
  totalDays: number;
};

export type OutputType = {
  format: string;
  transportation: number;
  housing: number;
  space: number;
  coffee: number;
  food: number;
  bandwidth: number;
  devices: number;
  recording: number;
  total: number;
};

export type OutputList = OutputType[];
