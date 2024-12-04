from django.db import migrations, models

def populate_data(apps, schema_editor):
    Data = apps.get_model('backend', 'Data')
    Data.objects.create(
        name='Transportation A',
        expression='P*d*(0.7*0.184+0.07*0.0649)',
        parameters='P,d',
        description='''Transportation A

Variables:
P = people count
d = distance

Formula:
P * d * (0.7 * 0.184 + 0.07 * 0.0649)
''')

    Data.objects.create(
        name='Transportation B',
        expression='P*(cp*0.184*cd+ptp*0.0649*ptd+sfp*0.5709*sfd+lfp*0.297*lfd)',
        parameters='P,d,cp,cd,ptp,ptd,sfp,sfd,lfp,lfd',
        description='''Transportation B

Variables:
P = people count
cp = car percentage
cd = car distance
ptp = public transport percentage
ptd = public transport distance
sfp = short flight percentage
sfd = short flight distance
lfp = long flight percentage
lfd = long flight distance

Formula:
P * ( cp * 0.184 * cd + ptp * 0.0649 * ptd + sfp * 0.5709 * sfd + lfp * 0.297 * lfd)
''')

    Data.objects.create(
        name='Transportation C',
        expression='ckm*0.184+ptkm*0.0649+sfkm*0.5709+lfkm*0.297',
        parameters='ckm,ptkm,sfkm,lfkm',
        description='''Transportation C

Variables:
ckm = car km
ptkm = public transport km
sfkm = short flight km
lfkm = long flight km

Formula:
ckm * 0.184 + ptkm * 0.0649 + sfkm * 0.5709 + lfkm * 0.297
''')

    Data.objects.create(
        name='Transportation D',
        expression='lv*ld*(0.7*0.184+0.07*0.0649)+nv*nd*(0.49*0.184+0.1*0.0015+0.08*0.0649*0.02*0.3278)+iv*id*(0.02790)',
        parameters='lv,ld,nv,nd,iv,id',
        description='''Transportation D

Variables:
lv = local visitors
ld = local distance
nv = national visitors
nd = national distance
iv = international visitors
id = international distance

Formula:
lv * ld * (0.7 * 0.184 + 0.07 * 0.0649) +
nv * nd * (0.49 * 0.184 + 0.1 * 0.0015 + 0.08 * 0.0649 * 0.02 * 0.3278) +
iv * id * (0.02790)
''')

    Data.objects.create(
        name='Housing',
        expression='P*n*121.36*0.5',
        parameters='P,n',
        description='''Housing

Variables:
P = people count
n = nights

Formula:
P * n * 121.36 * 0.5
''')

    Data.objects.create(
        name='Space',
        expression='S*t*0.00466',
        parameters='S,t',
        description='''Space

Variables:
S = size in square meters
t = time in hours

Formula:
S * t * 0.00466
''')

    Data.objects.create(
        name='Coffee',
        expression='d*P*0.2*0.9',
        parameters='d,P',
        description='''Coffee

Variables:
d = days
P = people count

Formula:
d * P * 0.2 * 0.9
''')

    Data.objects.create(
        name='Food',
        expression='d*(ms*2.1725+nms*0.9025)',
        parameters='d,ms,nms',
        description='''Food

Variables:
d = days
ms = meat servings
nms = non-meat servings

Formula:
d * (ms * 2.1725 + nms * 0.9025)
''')
    
    Data.objects.create(
        name='Bandwidth',
        expression='rp*sl*0.5546',
        parameters='rp,sl',
        description='''Bandwidth

Variables:
rp = Remote participants
sl = Session length

Formula:
rp * sl * 0.5546
''')
    
    Data.objects.create(
        name='Physical devices',
        expression='rp*sl*0.116539',
        parameters='rp,sl',
        description='''Physical devices

Variables:
rp = Remote participants
sl = Session length

Formula:
rp * sl * 0.116539
''')
    
    Data.objects.create(
        name='Recording',
        expression='0.00002854*st*rt*0.4',
        parameters='st,rt',
        description='''Recording

Variables:
st = Storage time
rt = Recording time

Formula:
0.00002854 * st * rt * 0.4
''')



class Migration(migrations.Migration):
    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_data),
    ]
