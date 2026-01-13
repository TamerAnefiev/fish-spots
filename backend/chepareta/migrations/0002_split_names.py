# chepareta/migrations/0002_split_names.py

from django.db import migrations, models

def split_names(apps, schema_editor):
    Seller = apps.get_model('chepareta', 'Seller')
    for seller in Seller.objects.all():
        first_name, last_name = seller.name.strip().split(' ', 1)
        
        seller.first_name = first_name
        seller.last_name = last_name
        
        seller.save()

class Migration(migrations.Migration):

    dependencies = [
        ('chepareta', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='seller',
            name='first_name',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='seller',
            name='last_name',
            field=models.CharField(max_length=30, null=True),
        ),

        migrations.RunPython(split_names),

        migrations.AlterField(
            model_name='seller',
            name='first_name',
            field=models.CharField(max_length=30, null=False, blank=False),
        ),
        migrations.AlterField(
            model_name='seller',
            name='last_name',
            field=models.CharField(max_length=30, null=False, blank=False),
        ),

        migrations.RemoveField(
            model_name='seller',
            name='name',
        ),
    ]