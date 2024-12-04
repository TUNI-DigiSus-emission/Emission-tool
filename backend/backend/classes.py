from typing import TypedDict, Literal

class Transportation(TypedDict):
    people: int
    carPercentage: int
    carDistance: int
    publicTransportPercentage: int
    publicTransportDistance: int
    shortFlightPercentage: int
    shortFlightDistance: int
    longFlightPercentage: int
    longFlightDistance: int

class Housing(TypedDict):
    people: int
    nights: int

class Space(TypedDict):
    size: int
    time: int

class Coffee(TypedDict):
    days: int
    people: int

class Food(TypedDict):
    days: int
    meatServings: int
    nonMeatServings: int

class Bandwidth(TypedDict):
    people: int
    sessionLength: int

class Devices(TypedDict):
    people: int
    sessionLength: int

class Recording(TypedDict):
    recordingLength: int
    storageLifetime: int

class EventFormat(TypedDict):
    format: Literal["On-site", "Hybrid", "Remote"]

class Attendees(TypedDict):
    total: int
    local: int
    national: int
    international: int

class Duration(TypedDict):
    dailyHours: int
    totalDays: int

class InputData(TypedDict):
    transportation: Transportation
    housing: Housing
    space: Space
    coffee: Coffee
    food: Food
    bandwidth: Bandwidth
    devices: Devices
    recording: Recording
    eventFormat: EventFormat
    attendees: Attendees
    duration: Duration

class OutputData(TypedDict):
    format: str
    transportation: int
    housing: int
    space: int
    coffee: int
    food: int
    bandwidth: int
    devices: int
    recording: int
    total: int
