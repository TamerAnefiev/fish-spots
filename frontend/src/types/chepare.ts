export type ChepareType = "safrid" | "chernokop" | "karagioz" | "palamud";

type ChepareBase = {
  chepareType: ChepareType;
};

type ChepareImageCreation = ChepareBase & {
  image: File;
};

export type ChepareCreation = {
  contact: string;
  firstName: string;
  lastName: string;
  images: ChepareImageCreation[];
};

export type ChepareSeller = {
  id: number;
  contact: string;
  firstName: string;
  lastName: string;
  slug: string;
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
