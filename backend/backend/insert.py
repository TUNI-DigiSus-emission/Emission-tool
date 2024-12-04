from . import models

def insert_data(name, expression, parameters, description):
    new_formula = models.Data(
        name = name,
        expression = expression,
        parameters = parameters,
        description = description
    )
    new_formula.save()