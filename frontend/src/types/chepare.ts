export type ChepareType = "safrid" | "chernokop" | "karagioz" | "palamud";

type ChepareBase = {
  chepareType: ChepareType;
};

type ChepareImageCreation = ChepareBase & {
  image: File;
};

export type ChepareImage = ChepareBase & {
  image: string;
  seller: number;
};

export type ChepareCreation = {
  contact: string;
  name: string;
  images: ChepareImageCreation[];
};

export type ChepareSeller = {
  contact: string;
  name: string;
  images: ChepareImage[];
};

export type ChepareTypes = ChepareBase & {
  text: string;
};
