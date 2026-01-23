export const baseUrl = "http://127.0.0.1:8000";
export const websiteName = "Fish Spots";
export const DOMAIN = "fishspots.eu";
export const GOOGLE_CLIENT_ID =
  "175237139452-fuebos05lsnn2vt8fqg75hcpqt0p8t4v.apps.googleusercontent.com";

export const fishSpotAreasInRegion = {
  varna: ["shabla", "kranevo", "varna"],
  burgas: ["burgas", "chernomorets", "primorsko"],
};

export const bulgarianToLatinCities = {
  Шабла: "shabla",
  Кранево: "kranevo",
  Варна: "varna",
  Бургас: "burgas",
  Черноморец: "chernomorets",
  Приморско: "primorsko",
} as const;

export const latinToBulgarianCities = {
  shabla: "Шабла",
  kranevo: "Кранево",
  varna: "Варна",
  burgas: "Бургас",
  chernomorets: "Черноморец",
  primorsko: "Приморско",
};

export const latinToBgChepareType = {
  safrid: "сафрид",
  chernokop: "чернокоп",
  karagioz: "карагьоз",
  palamud: "паламуд",
};

export const MAX_FILE_SIZE_MB = 1;
export const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMG_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
