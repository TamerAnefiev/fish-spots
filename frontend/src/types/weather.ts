export type WindDirection =
  | "Север"
  | "Североизток"
  | "Изток"
  | "Югоизток"
  | "Юг"
  | "Югозапад"
  | "Запад"
  | "Северозапад";

export type Hourly = {
  feelsLike: number;
  id: number;
  maxTemp: number;
  minTemp: number;
  normalTemp: number;
  time: string;
  weatherIconUrl: string;
  windDirection: WindDirection;
  windSpeed: number;
};

export type Day = {
  bgNamePlace: string;
  dayOfWeek: string;
  listHours: Hourly[];
  sunrise: string;
  sunset: string;
  todayDate: string;
};

export type MultipleDays = {
  fourDays: {
    firstDay: Day;
    secondDay: Day;
    thirdDay: Day;
    fourthDay: Day;
  };
  today: Day;
};
