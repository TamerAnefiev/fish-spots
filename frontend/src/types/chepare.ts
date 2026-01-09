export type ChepareType = "safrid" | "chernokop" | "karagioz" | "palamud";

type ChepareBase = {
  chepareType: ChepareType;
};

type ChepareImageCreation = ChepareBase & {
  image: File;
};

export type ChepareCreation = {
  contact: string;
  name: string;
  images: ChepareImageCreation[];
};

export type ChepareSeller = {
  id: number;
  contact: string;
  name: string;
  images: Partial<Record<ChepareType, string[]>>;
  thumbnail: string;
  imagesCount: number;
};

export type ChepareTypes = ChepareBase & {
  text: string;
};

export type DeleteResponse = {
  detail: string;
};
