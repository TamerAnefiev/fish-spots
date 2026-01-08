def image_directory_distributor(instance, filename):
    return f"sellers/{instance.seller.name}_{instance.seller.pk}/chepareta/{instance.chepare_type}/{filename}"
