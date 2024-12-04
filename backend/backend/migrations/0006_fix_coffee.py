from django.db import migrations, models

def fix_coffee_expression(apps, schema_editor):
    Data = apps.get_model("backend", "Data")
    coffee = Data.objects.get(name="Coffee")
    coffee.expression = 'd*P*0.2*0.6'
    coffee.save()

class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
        ("backend", "0002_initial_data"),
        ("backend", "0003_append_parameters_to_transportation_B"),
        ("backend", "0004_replace_S_in_space"),
        ("backend", "0005_fix_space")
    ]

    operations = [
        migrations.RunPython(fix_coffee_expression),
    ]
