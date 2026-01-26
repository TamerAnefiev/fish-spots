export const authKeys = {
  authUser: ["authUser"] as const,
};

export const regionsKeys = {
  regionPlaces: ["regionPlaces"] as const,
};

export const cheparetaKeys = {
  all: ["allChepareta"] as const,
  sellerDetails: (slug: string) =>
    [...cheparetaKeys.all, "details", slug] as const,
};
