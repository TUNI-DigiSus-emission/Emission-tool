import { InputType } from "@/types";
import { calculateBandwidth, calculateCoffee, calculateFood, calculateHousing, calculatePhysicalDevices, calculateRecording, calculateSpace, calculateTransportation } from "@/utils";

export async function GET(req: Request) {
  // const data = await req.json() as InputType;
  console.log("req", req);

  // Get the query string from the request URL
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  console.log("searchParams", searchParams);

  // Convert the query string to an object
  const data = Object.fromEntries(searchParams.entries());
  // Map data to the InputType
  const inputData: InputType = {
    transportation: {
      people: parseInt(data.transportation_people),
      carPercentage: parseInt(data.transportation_carPercentage),
      carDistance: parseInt(data.transportation_carDistance),
      publicTransportPercentage: parseInt(data.transportation_publicTransportPercentage),
      publicTransportDistance: parseInt(data.transportation_publicTransportDistance),
      shortFlightPercentage: parseInt(data.transportation_shortFlightPercentage),
      shortFlightDistance: parseInt(data.transportation_shortFlightDistance),
      longFlightPercentage: parseInt(data.transportation_longFlightPercentage),
      longFlightDistance: parseInt(data.transportation_longFlightDistance),
    },
    housing: {
      people: parseInt(data.housing_people),
      nights: parseInt(data.housing_nights),
    },
    space: {
      size: parseInt(data.space_size),
      time: parseInt(data.space_time),
    },
    coffee: {
      days: parseInt(data.coffee_days),
      people: parseInt(data.coffee_people),
    },
    food: {
      days: parseInt(data.food_days),
      meatServings: parseInt(data.food_meatServings),
      nonMeatServings: parseInt(data.food_nonMeatServings),
    },
    bandwidth: {
      sessionLength: parseInt(data.bandwidth_sessionLength),
      people: parseInt(data.bandwidth_people),
    },
    devices: {
      people: parseInt(data.devices_people),
      sessionLength: parseInt(data.devices_sessionLength),
    },
    recording: {
      storageLifetime: parseInt(data.recording_storageLifetime),
      recordingLength: parseInt(data.recording_recordingLength),
    },
  };


  // return Response.json({ message: 'Hello World!' });

  const transportation = calculateTransportation(inputData.transportation);
  const housing = calculateHousing(inputData.housing);
  const space = calculateSpace(inputData.space);
  const coffee = calculateCoffee(inputData.coffee);
  const food = calculateFood(inputData.food);
  const bandwidth = calculateBandwidth(inputData.bandwidth);
  const devices = calculatePhysicalDevices(inputData.devices);
  const recording = calculateRecording(inputData.recording);
  const total = transportation + housing + space + coffee + food + bandwidth + devices + recording;


  return Response.json({
    "transportation": transportation,
    "housing": housing,
    "space": space,
    "coffee": coffee,
    "food": food,
    "bandwidth": bandwidth,
    "devices": devices,
    "recording": recording,
    "total": total
  });
}
