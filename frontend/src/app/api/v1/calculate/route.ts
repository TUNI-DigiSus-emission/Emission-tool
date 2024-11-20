import { InputType } from "@/types";
import { calculateBandwidth, calculateCoffee, calculateFood, calculateHousing, calculatePhysicalDevices, calculateRecording, calculateSpace, calculateTransportation } from "@/utils";
// export async function POST(data: InputType) {
export async function POST(req: Request) {
  const data = await req.json() as InputType;

  const transportation = calculateTransportation(data.transportation);
  const housing = calculateHousing(data.housing);
  const space = calculateSpace(data.space);
  const coffee = calculateCoffee(data.coffee);
  const food = calculateFood(data.food);
  const bandwidth = calculateBandwidth(data.bandwidth);
  const devices = calculatePhysicalDevices(data.devices);
  const recording = calculateRecording(data.recording);
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
