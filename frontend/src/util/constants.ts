const baseUrl = "http://127.0.0.1:8000";
const websiteName = "Fish Spots";

const fishSpotAreasInRegion = {
  varna: ["shabla", "kranevo", "varna"],
  burgas: ["burgas", "chernomorets", "primorsko"],
};

const bulgarianToLatinCities = {
  Шабла: "shabla",
  Кранево: "kranevo",
  Варна: "varna",
  Бургас: "burgas",
  Черноморец: "chernomorets",
  Приморско: "primorsko",
} as const;

const latinToBulgarianCities = {
  shabla: "Шабла",
  kranevo: "Кранево",
  varna: "Варна",
  burgas: "Бургас",
  chernomorets: "Черноморец",
  primorsko: "Приморско",
};

const latinToBgChepareType = {
  safrid: "сафрид",
  chernokop: "чернокоп",
  karagioz: "карагьоз",
  palamud: "паламуд",
};

export {
  baseUrl,
  websiteName,
  fishSpotAreasInRegion,
  bulgarianToLatinCities,
  latinToBulgarianCities,
  latinToBgChepareType,
};
