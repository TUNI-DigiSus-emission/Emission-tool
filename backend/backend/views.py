from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .calculations import *
from transformers import pipeline
import json
from .insert import *
from .models import *
from .classes import InputData, OutputData


def root_view(request):
    return JsonResponse({"status": "OK"})


def show_data(request):
    # Get the infromation from the Data table
    data = Data.objects.all()

    # Add the values from the table into a list
    all_data = list(
        data.values("id", "name", "expression", "parameters", "description")
    )

    return JsonResponse(all_data, safe=False)

# Calculate the emissions as if the event was held on-site
def calculate_on_site_emissions(format, transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration):
    num_of_people = attendees["total"]
    daily_hours = duration["dailyDuration"]
    event_days = duration["totalDays"]

    # Assume half of the local attendees travel by car and half via public transit
    transportation["carPercentage"] =  (attendees["local"] / attendees["total"]) / 2 * 100
    transportation["publicTransportPercentage"] = (attendees["local"] / attendees["total"]) / 2 * 100
    transportation["shortFlightPercentage"] = attendees["national"] / attendees["total"] * 100
    transportation["longFlightPercentage"] = attendees["international"] / attendees["total"] * 100
    transportation_emission = calculate_transportation(transportation.values())

    """
    Previous version:
    transportation["carPercentage"] = attendees["local"] / 2
    transportation["publicTransportPercentage"] = attendees["local"] / 2
    transportation["shortFlightPercentage"] = attendees["national"]
    transportation["longFlightPercentage"] = attendees["international"]
    """

    # Assume only national and international attendees require accommodations in between event days
    housing["people"] = attendees["national"] + attendees["international"]
    housing["nights"] = event_days - 1
    housing_emission = calculate_housing(housing.values())

    # The size of the event space is calculated as 'number of people * 1 square meter'
    space["size"] = num_of_people
    space["time"] = daily_hours * event_days
    space_emission = calculate_space(space.values())

    coffee["days"] = event_days
    coffee["people"] = num_of_people
    coffee_emission = calculate_coffee(coffee.values())

    food["days"] = event_days
    food["meatServings"] = 0.8 * num_of_people
    food["nonMeatServings"] = 0.2 * num_of_people # 20% of food servings assumed vegetarian/vegan
    food_emission = calculate_food(food.values())

    bandwidth["people"] = num_of_people
    bandwidth["sessionLength"] = daily_hours * event_days
    bandwidth_emission = calculate_bandwidth(bandwidth.values())

    devices["people"] = num_of_people
    devices["sessionLength"] = daily_hours * event_days
    devices_emission = calculate_devices(devices.values())

    recording_emission = calculate_recording(recording.values())

    total_emission = (transportation_emission +
                        housing_emission +
                        space_emission +
                        coffee_emission +
                        food_emission +
                        bandwidth_emission +
                        devices_emission +
                        recording_emission)

    result: OutputData = {
        "format": format,
        "transportation": transportation_emission,
        "housing": housing_emission,
        "space": space_emission,
        "coffee": coffee_emission,
        "food": food_emission,
        "bandwidth": bandwidth_emission,
        "devices": devices_emission,
        "recording": recording_emission,
        "total": total_emission,
    }
    return result


# Calculate the emissions as if the event was a hybrid event
def calculate_hybrid_emissions(format, transportation, housing, space, coffee, food, bandwidth, devices, recording, attendees, duration):
    num_of_people = attendees["total"]
    daily_hours = duration["dailyDuration"]
    event_days = duration["totalDays"]

    # Assume half of total attendees participate on-site, rest remotely.
    # Assume half of local attendees travel by car, half via public transit.
    transportation["carPercentage"] = (attendees["local"] / attendees["total"]) / 4 * 100
    transportation["publicTransportPercentage"] = (attendees["local"] / attendees["total"]) / 4 * 100
    transportation["shortFlightPercentage"] = (attendees["national"] / attendees["total"]) / 2 * 100
    transportation["longFlightPercentage"] = (attendees["international"] / attendees["total"]) / 2 * 100
    transportation_emission = calculate_transportation(transportation.values())


    """
    Previous version:
    transportation["carPercentage"] = attendees["local"] / 4
    transportation["publicTransportPercentage"] = attendees["local"] / 4
    transportation["shortFlightPercentage"] = attendees["national"] / 2
    transportation["longFlightPercentage"] = attendees["international"] / 2
    """

    # Assume only national and international attendees require accommodations in between event days
    housing["people"] = (attendees["national"] + attendees["international"]) / 2
    housing["nights"] = event_days - 1
    housing_emission = calculate_housing(housing.values())

    # The size of the event space is calculated as 'number of people * 1 square meter'
    space["size"] = num_of_people / 2
    space["time"] = daily_hours * event_days
    space_emission = calculate_space(space.values())

    coffee["days"] = event_days
    coffee["people"] = num_of_people / 2
    coffee_emission = calculate_coffee(coffee.values())

    food["days"] = event_days
    food["meatServings"] = 0.8 * (num_of_people / 2)
    food["nonMeatServings"] = 0.2 * (num_of_people / 2) # 20% of food servings assumed vegetarian/vegan
    food_emission = calculate_food(food.values())

    bandwidth["people"] = num_of_people
    bandwidth["sessionLength"] = daily_hours * event_days
    bandwidth_emission = calculate_bandwidth(bandwidth.values())

    devices["people"] = num_of_people
    devices["sessionLength"] = daily_hours * event_days
    devices_emission = calculate_devices(devices.values())

    recording_emission = calculate_recording(recording.values())

    total_emission = (transportation_emission +
                      housing_emission +
                      space_emission +
                      coffee_emission +
                      food_emission +
                      bandwidth_emission +
                      devices_emission +
                      recording_emission)

    result: OutputData = {
        "format": format,
        "transportation": transportation_emission,
        "housing": housing_emission,
        "space": space_emission,
        "coffee": coffee_emission,
        "food": food_emission,
        "bandwidth": bandwidth_emission,
        "devices": devices_emission,
        "recording": recording_emission,
        "total": total_emission,
    }
    return result


# Calculate the emissions as if the event was held remotely
def calculate_remote_emissions(format, bandwidth, devices, recording, attendees, duration):
    num_of_people = attendees["total"]
    daily_hours = duration["dailyDuration"]
    event_days = duration["totalDays"]

    bandwidth["people"] = num_of_people
    bandwidth["sessionLength"] = daily_hours * event_days
    bandwidth_emission = calculate_bandwidth(bandwidth.values())

    devices["people"] = num_of_people
    devices["sessionLength"] = daily_hours * event_days
    devices_emission = calculate_devices(devices.values())

    recording_emission = calculate_recording(recording.values())

    total_emission = (bandwidth_emission +
                      devices_emission +
                      recording_emission)

    result: OutputData = {
        "format": format,
        "transportation": 0,
        "housing": 0,
        "space": 0,
        "coffee": 0,
        "food": 0,
        "bandwidth": bandwidth_emission,
        "devices": devices_emission,
        "recording": recording_emission,
        "total": total_emission,
    }
    return result


# Calculates overall emissions of the event
@csrf_exempt
@require_http_methods("POST")
def calculateEmission(request):
    try:
        data = json.loads(request.body)

        if not all(key in data for key in InputData.__annotations__):
            missing_keys = [key for key in InputData.__annotations__ if key not in data]
            return JsonResponse(
                {"error": f"Missing information: {', '.join(missing_keys)}"}, status=400
            )

        transportation = data["transportation"]
        housing = data["housing"]
        space = data["space"]
        coffee = data["coffee"]
        food = data["food"]
        bandwidth = data["bandwidth"]
        devices = data["devices"]
        recording = data["recording"]
        event_format = data["eventFormat"]#["format"]
        attendees = data["attendees"]
        duration = data["duration"]

        transportation_emission = calculate_transportation(transportation.values())
        housing_emission = calculate_housing(housing.values())
        space_emission = calculate_space(space.values())
        coffee_emission = calculate_coffee(coffee.values())
        food_emission = calculate_food(food.values())
        bandwidth_emission = calculate_bandwidth(bandwidth.values())
        devices_emission = calculate_devices(devices.values())
        recording_emission = calculate_recording(recording.values())
        total_emission = (transportation_emission +
                          housing_emission +
                          space_emission +
                          coffee_emission +
                          food_emission +
                          bandwidth_emission +
                          devices_emission +
                          recording_emission)

        result: OutputData = {
            "format": event_format,
            "transportation": transportation_emission,
            "housing": housing_emission,
            "space": space_emission,
            "coffee": coffee_emission,
            "food": food_emission,
            "bandwidth": bandwidth_emission,
            "devices": devices_emission,
            "recording": recording_emission,
            "total": total_emission,
        }
        final_result = [result]

        if event_format == "On-site":
            hybrid_result = calculate_hybrid_emissions("hybrid", transportation, housing, space, coffee, food,
                                                       bandwidth, devices, recording, attendees, duration)
            final_result.append(hybrid_result)
            remote_result = calculate_remote_emissions("remote", bandwidth, devices, recording, attendees, duration)
            final_result.append(remote_result)

        elif event_format == "Hybrid":
            on_site_result = calculate_on_site_emissions("on-site", transportation, housing, space, coffee, food,
                                                         bandwidth, devices, recording, attendees, duration)
            final_result.append(on_site_result)
            remote_result = calculate_remote_emissions("remote", bandwidth, devices, recording, attendees, duration)
            final_result.append(remote_result)

        elif event_format == "Remote":
            on_site_result = calculate_on_site_emissions("on-site", transportation, housing, space, coffee, food,
                                                         bandwidth, devices, recording, attendees, duration)
            final_result.append(on_site_result)
            hybrid_result = calculate_hybrid_emissions("hybrid", transportation, housing, space, coffee, food,
                                                       bandwidth, devices, recording, attendees, duration)
            final_result.append(hybrid_result)
        else:
            return JsonResponse({"error": "Invalid event format."}, status=400)

        return JsonResponse(final_result, safe=False)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON."}, status=400)


@csrf_exempt
@require_http_methods("POST")
def ask(request):
    question = json.loads(request.body).get("question")

    if question is None:
        return JsonResponse({"error": "Missing question."}, status=400)

    model_name = "timpal0l/mdeberta-v3-base-squad2"
    nlp = pipeline("question-answering", model=model_name, tokenizer=model_name)
    context = """DigiSus on monitieteinen tutkimusalusta, jonka tavoitteena on rakentaa uudenlaista yhteistyötä, oivalluksia ja tietämystä liittyen digitalisaation ja kestävän kehityksen kaksoissiirtymään yhteiskunnassa. Toivotamme kaikki tervetulleeksi mukaan toimintaan!
Digitalisaatio ja kestävyyssiirtymä ovat aikakautemme megatrendejä, mutta niitä tutkitaan yleensä erillisinä ilmiöinä, vaikka kokonaisvaltainen ymmärrys voisi tukea molempia näkökulmia. Digitalisaatio on yhtäältä valtava mahdollisuus, mutta toisaalta siihen liittyy moninaisia kestävyyskysymyksiä ja haasteita, joiden laajamittaiset vaikutukset yhteiskuntaan, kulttuuriin ja ympäristöön ovat vasta alkaneet käydä ilmi. DigiSus-tutkimusalustan kautta pyrimme luomaan uutta ymmärrystä ja pitkäjänteistä yhteistyötä digitaalisesti kestävän tulevaisuuden rakentamiseksi.
Tammikuussa 2024 aloittaneen tutkimusalustan toiminnan tavoitteina on:
Kehittää uutta yhteisöä kestävyyden ja digitalisaation poikkileikkaavien teemojen yhteyteen
Lisätä aihepiirin tutkimuksen huippuosaamista
Tukea täydentävän tutkimusrahoituksen hankkimista
Kehittää koulutusta ja käytäntöjä
Vaikuttaa alan käytäntöihin ja luoda uutta yhteistyötä
Tukea poikkitieteellistä tutkimuskulttuuria Tampereen yliopistossa
Ruokkia kestävyystyötä Tampereen korkeakouluyhteisössä
Tampereen yliopisto on myöntänyt tutkimusalustan toiminnalle strategisen rahoituksen neljäksi vuodeksi, toisen nelivuotiskauden optiolla.
"""
    res = nlp(question=question, context=context)
    return JsonResponse({"answer": res})
