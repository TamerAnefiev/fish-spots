# chepareta/migrations/0003_add_slugs.py

from django.db import migrations, models
from django.utils.text import slugify

def generate_slugs(apps, schema_editor):
    Seller = apps.get_model('chepareta', 'Seller')
    sellers = []

    for seller in Seller.objects.all():
        seller.slug = slugify(f"{seller.first_name}-{seller.last_name}-{seller.pk}")
        sellers.append(seller)

    if sellers:
        Seller.objects.bulk_update(sellers, ["slug"])

class Migration(migrations.Migration):

    dependencies = [
        ('chepareta', '0002_split_names'), 
    ]

    operations = [
        migrations.AddField(
            model_name='seller',
            name='slug',
            field=models.SlugField(max_length=100, null=True),
        ),

        migrations.RunPython(generate_slugs),
    ]