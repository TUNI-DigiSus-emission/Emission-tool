from django.db import migrations, models


def fix_transportation_B(apps, schema_editor):
    Data = apps.get_model("backend", "Data")
    transportation_B = Data.objects.get(name="Transportation B")
    transportation_B.parameters = "P,cp,cd,ptp,ptd,sfp,sfd,lfp,lfd"
    transportation_B.save()


class Migration(migrations.Migration):
    dependencies = [
        ("backend", "0001_initial"),
        ("backend", "0002_initial_data"),
    ]

    operations = [
        migrations.RunPython(fix_transportation_B),
    ]
