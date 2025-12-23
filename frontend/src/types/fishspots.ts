import type { WindDirection } from "./weather";

export type FishSpot = {
  badWindDirections: WindDirection[];
  bgPlaceName: string;
  createdAt: string;
  description: string;
  fishAreaInRegion: string;
  id: number;
  image: string;
  lastModified: string;
  latitude: string;
  longitude: string;
  maxWindSpeed: number;
  place: string;
  region: string;
};
