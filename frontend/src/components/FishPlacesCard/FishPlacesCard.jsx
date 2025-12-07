import { Link } from 'react-router-dom';
import { useState } from 'react';

const favoriteButtonImages = {
    notAdded: '/assets/heart-69-16.png',
    added: '/assets/heart-69-16 red.png',
};

const localStorageKey = 'favSpots';

export default function FishPlacesCard({
    props,
    openDeleteModal,
    isAdmin,
    onFavoriteClickHandler,
}) {
    const [isSpotFavorite, setIsSpotFavorite] = useState(() =>
        isAddedToFavorites(props.id)
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
        if (!isAddedToFavorites(props.id)) {
            insertToLocalStorage(props.id);
            setIsSpotFavorite(true);
        } else {
            removeFromLocalStorage(props.id);
            setIsSpotFavorite(false);
        }
        onFavoriteClickHandler();
    }

    function isAddedToFavorites(id) {
        return getFavSpotsFromLocalStorage().includes(id);
    }

    function insertToLocalStorage(id) {
        const favSpots = getFavSpotsFromLocalStorage();
        favSpots.push(id);
        localStorage.setItem(localStorageKey, JSON.stringify(favSpots));
    }

    function removeFromLocalStorage(id) {
        const favSpots = getFavSpotsFromLocalStorage();
        favSpots.splice(favSpots.indexOf(id), 1);
        localStorage.setItem(localStorageKey, JSON.stringify(favSpots));
    }

    function getFavSpotsFromLocalStorage() {
        const favSpotsString = localStorage.getItem(localStorageKey);
        return favSpotsString ? JSON.parse(favSpotsString) : [];
    }

    return (
        <section className="text-center rounded p-3 bg-cyan-950 shadow-2xl shadow-black">
            <h3 className="font-medium mb-2 text-white">
                {props.bg_place_name}
            </h3>
            <div>
                <img
                    className="w-full aspect-[4/3] rounded-t"
                    src={props.image}
                    alt={props.bg_place_name}
                    loading="lazy"
                />
            </div>
            <section
                className={`bg-white py-2 max-h-[200px] px-1 ${
                    isAdmin ? '' : 'rounded-b'
                }`}
            >
                <p className="mb-3">{props.description.slice(0, 50)}...</p>
                <section className="flex justify-center gap-4">
                    <Link
                        className="bg-cyan-600 py-2 px-4 rounded-xl font-medium hover:bg-cyan-800"
                        to={`/place/${
                            props.region
                        }/${props.place.toLowerCase()}`}
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
