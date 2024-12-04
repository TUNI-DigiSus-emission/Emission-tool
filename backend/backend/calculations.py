from django.http import JsonResponse
from datetime import datetime
from .models import Data
import sympy as sp

def get_data_by_name(name):
    try:
        data = Data.objects.get(name=name)
        return data
    except Data.DoesNotExist:
        print(f"No data found with name: {name}")
        return None

def calculate_expression(name, *args):
    data = get_data_by_name(name)

    if data:
        expression = sp.sympify(data.expression)
        parameters = sp.symbols(data.parameters)
        
        if len(args) != len(parameters):
            raise ValueError(f"Expected {len(parameters)} arguments, but got {len(args)}.")

        result = expression.subs(dict(zip(parameters, args)))
        return float(result)
    else:
        return None

def calculate_transportation(args):
    print(f"Transportation {args}")
    return calculate_expression("Transportation B", *args)

def calculate_housing(args):
    print(f"Housing {args}")
    return calculate_expression("Housing", *args)

def calculate_space(args):
    print(f"Space {args}")
    return calculate_expression("Space", *args)

def calculate_coffee(args):
    print(f"Coffee {args}")
    return calculate_expression("Coffee", *args)

def calculate_food(args):
    print(f"Food {args}")
    return calculate_expression("Food", *args)

def calculate_bandwidth(args):
    print(f"Bandwidth {args}")
    return calculate_expression("Bandwidth", *args)
    
def calculate_devices(args):
    print(f"Devices {args}")
    return calculate_expression("Physical devices", *args)

def calculate_recording(args):
    print(f"Recording {args}")
    return calculate_expression("Recording", *args)