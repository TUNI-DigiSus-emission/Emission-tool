from django.db import migrations, models


def fix_space_expression(apps, schema_editor):
    Data = apps.get_model("backend", "Data")
    space = Data.objects.get(name="Space")
    space.expression = "s*t*0.00466"
    space.parameters = "s,t"


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
        ("backend", "0002_initial_data"),
        ("backend", "0003_append_parameters_to_transportation_B"),
    ]

    operations = [
        migrations.RunPython(fix_space_expression),
    ]
