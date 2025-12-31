from .models import VarnaRegion, BurgasRegion

region_map = {
    "varna": "Варна",
    "burgas": "Бургас"
}

regions = {
    "varna": {"model": VarnaRegion, "places": ["Shabla", "Kranevo", "Varna"]},
    "burgas": {
        "model": BurgasRegion,
        "places": ["Burgas", "Chernomorets", "Primorsko"],
    },
}

valid_places = (
    "shabla",
    "kranevo",
    "varna",
    "burgas",
    "chernomorets",
    "primorsko",
)

english_to_bulgarian_places = {
    "Shabla": "Шабла",
    "Kranevo": "Кранево",
    "Varna": "Варна",
    "Burgas": "Бургас",
    "Chernomorets": "Черноморец",
    "Primorsko": "Приморско",
}

english_to_bulgarian_months = {
    "January": "Януари",
    "February": "Февруари",
    "March": "Март",
    "April": "Април",
    "May": "Май",
    "June": "Юни",
    "July": "Юли",
    "August": "Август",
    "September": "Септември",
    "October": "Октомври",
    "November": "Ноември",
    "December": "Декември",
}

english_to_bulgarian_days = {
    "Monday": "Понеделник",
    "Tuesday": "Вторник",
    "Wednesday": "Сряда",
    "Thursday": "Четвъртък",
    "Friday": "Петък",
    "Saturday": "Събота",
    "Sunday": "Неделя",
}
