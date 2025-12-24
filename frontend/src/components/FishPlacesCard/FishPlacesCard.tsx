import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

const favoriteButtonImages = {
  notAdded: "/assets/heart-69-16.png",
  added: "/assets/heart-69-16 red.png",
};

const localStorageKey = "favSpots";

type FishPlacesCardProps = {
  spotId: number;
  bgPlaceName: string;
  image: string;
  description: string;
  region: string;
  place: string;
  openDeleteModal?: () => void;
  onFavoriteClickHandler?: () => void;
};

export default function FishPlacesCard({
  spotId,
  bgPlaceName,
  image,
  region,
  place,
  description,
  openDeleteModal,
  onFavoriteClickHandler,
}: FishPlacesCardProps) {
  function isAddedToFavorites(id: number) {
    return getFavSpotsFromLocalStorage().includes(id);
  }

  function getFavSpotsFromLocalStorage() {
    const favSpotsString = localStorage.getItem(localStorageKey);
    return favSpotsString ? JSON.parse(favSpotsString) : [];
  }

  const { isAdmin } = useAuthContext();
  const [isSpotFavorite, setIsSpotFavorite] = useState(() =>
    isAddedToFavorites(spotId)
  );
  const [isFavButtonHovered, setIsFavButtonHovered] = useState(false);

  const getHeartImageOnHover = () => {
    if (isSpotFavorite) {
      if (isFavButtonHovered) {
        return favoriteButtonImages.notAdded;
      }
      return favoriteButtonImages.added;
    }

    if (!isSpotFavorite) {
      if (!isFavButtonHovered) {
        return favoriteButtonImages.notAdded;
      }
      return favoriteButtonImages.added;
    }
  };

  function addOrRemoveFromFavorites() {
    if (!isAddedToFavorites(spotId)) {
      insertToLocalStorage(spotId);
      setIsSpotFavorite(true);
    } else {
      removeFromLocalStorage(spotId);
      setIsSpotFavorite(false);
    }
    onFavoriteClickHandler?.();
  }
  function insertToLocalStorage(id: number) {
    const favSpots = getFavSpotsFromLocalStorage();
    favSpots.push(id);
    localStorage.setItem(localStorageKey, JSON.stringify(favSpots));
  }

  function removeFromLocalStorage(id: number) {
    const favSpots = getFavSpotsFromLocalStorage();
    favSpots.splice(favSpots.indexOf(id), 1);
    localStorage.setItem(localStorageKey, JSON.stringify(favSpots));
  }

  return (
    <section className="text-center rounded p-3 bg-cyan-950 shadow-2xl shadow-black">
      <h3 className="font-medium mb-2 text-white">{bgPlaceName}</h3>
      <div>
        <img
          className="w-full aspect-[4/3] rounded-t"
          src={image}
          alt={bgPlaceName}
          loading="lazy"
        />
      </div>
      <section
        className={`bg-white py-2 max-h-[200px] px-1 ${
          isAdmin ? "" : "rounded-b"
        }`}
      >
        <p className="mb-3">{description.slice(0, 50)}...</p>
        <section className="flex justify-center gap-4">
          <Link
            className="bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
            to={`/place/${region}/${place.toLowerCase()}`}
          >
            Детайли
          </Link>
          <span
            className="flex items-center bg-cyan-600 rounded-xl py-2 px-4 text-lg cursor-pointer"
            onClick={addOrRemoveFromFavorites}
            onMouseEnter={() => setIsFavButtonHovered(true)}
            onMouseLeave={() => setIsFavButtonHovered(false)}
          >
            <img src={getHeartImageOnHover()} alt="heart" />
          </span>
        </section>
      </section>
      {isAdmin && (
        <section className="bg-slate-400 py-2 rounded-b">
          <button
            className="bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
            onClick={openDeleteModal}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </section>
      )}
    </section>
  );
}
