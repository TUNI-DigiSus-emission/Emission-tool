from django.db import migrations, models


def fix_transportation_B(apps, schema_editor):
    Data = apps.get_model("backend", "Data")
    transportation_B = Data.objects.get(name="Transportation B")
    transportation_B.expression = 'P*2*(cp/100*0.184*cd+ptp/100*0.0649*ptd+sfp/100*0.5709*sfd+lfp/100*0.297*lfd)'
    transportation_B.save()


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
        ("backend", "0002_initial_data"),
        ("backend", "0003_append_parameters_to_transportation_B"),
        ("backend", "0004_replace_S_in_space"),
        ("backend", "0005_fix_space"),
        ("backend", "0006_fix_coffee")
    ]

    operations = [
        migrations.RunPython(fix_transportation_B),
    ]
