import { baseUrl } from "@/util/constants";

export const getWeather = async (region = "") => {
  const query = region
    ? `${baseUrl}/regions/weather/?region=${region}`
    : `${baseUrl}/regions/weather/`;

  const response = await fetch(query);
  return await response.json();
};

export const getWeatherForPlace = async (region: string, place: string) => {
  const response = await fetch(
    `${baseUrl}/regions/weather/${place}/?region=${region}`
  );
  return await response.json();
};
