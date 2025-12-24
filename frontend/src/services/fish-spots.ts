import { baseUrl } from "@/util/constants";

export const getFishPlaces = async (region: string) => {
  const response = await fetch(`${baseUrl}/places/?region=${region}`);
  return await response.json();
};

export const getPlaceDetails = async (region: string, placeName: string) => {
  return await fetch(`${baseUrl}/places/${region}/${placeName}/`);
};

export const getSuggestedSpots = async (region: string) => {
  return await fetch(`${baseUrl}/places/suggested-spots?region=${region}`);
};

export const createFishPlace = async (formData: FormData) => {
  const options: RequestInit = {
    method: "POST",
    body: formData,
    credentials: "include",
  };
  return await fetch(`${baseUrl}/places/create/`, options);
};

export const deleteFishPlace = async (placeId: number) => {
  const options: RequestInit = {
    method: "DELETE",
    credentials: "include",
  };
  return await fetch(`${baseUrl}/places/delete/${placeId}/`, options);
};
