import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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

  const { user } = useAuth();
  const [isSpotFavorite, setIsSpotFavorite] = useState(() =>
    isAddedToFavorites(spotId),
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
    <section className="rounded bg-cyan-950 p-3 text-center shadow-2xl shadow-black">
      <h3 className="mb-2 font-medium text-white">{bgPlaceName}</h3>
      <div>
        <img
          className="aspect-4/3 w-full rounded-t"
          src={image}
          alt={bgPlaceName}
          loading="lazy"
        />
      </div>
      <section
        className={`max-h-50 bg-white px-1 py-2 ${
          user?.isAdmin ? "" : "rounded-b"
        }`}
      >
        <p className="mb-3">{description.slice(0, 50)}...</p>
        <section className="flex justify-center gap-4">
          <Link
            className="rounded-xl bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-800"
            to={`/place/${region}/${place.toLowerCase()}`}
          >
            Детайли
          </Link>
          <span
            className="flex cursor-pointer items-center rounded-xl bg-cyan-600 px-4 py-2 text-lg"
            onClick={addOrRemoveFromFavorites}
            onMouseEnter={() => setIsFavButtonHovered(true)}
            onMouseLeave={() => setIsFavButtonHovered(false)}
          >
            <img src={getHeartImageOnHover()} alt="heart" />
          </span>
        </section>
      </section>
      {user?.isAdmin && (
        <section className="rounded-b bg-slate-400 py-2">
          <button
            className="rounded-xl bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-800"
            onClick={openDeleteModal}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </section>
      )}
    </section>
  );
}
