import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import type { FishSpot } from "@/types/fishspots";
import setDocTitle from "@/util/setDocTitle";
import { deleteFishPlace, getFishPlaces } from "@/services/fish-spots";
import RegionChoice from "@/components/RegionChoice/RegionChoice";
import ChoiceContainer from "@/components/ChoiceContainer/ChoiceContainer";
import FishSpotForm from "@/components/FishSpots/FishSpotForm";
import Spinner from "@/components/Spinner/Spinner";
import FilterFishSpots from "@/components/FilterFishSpots/FilterFishSpots";
import FishPlacesCard from "@/components/FishPlacesCard/FishPlacesCard";
import DeleteAsker from "@/components/Modals/DeleteAsker";

type DeleteModalProps = {
  isOpened: boolean;
  deleteId: number | null;
  isLoading: boolean;
};

export default function FishSpots() {
  const { isAdmin } = useAuthContext();
  const city = useLocation();
  const searchParams = new URLSearchParams(city.search);
  const wantedRegion = searchParams.get("search") || "varna";

  const [filteredSpots, setFilteredSpots] = useState<FishSpot[] | null>(null);
  const [emptyFilter, setEmptyFilter] = useState(false);
  const [fishSpots, setFishSpots] = useState<FishSpot[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<DeleteModalProps>({
    isOpened: false,
    deleteId: null,
    isLoading: false,
  });

  const [showFavSpots, setShowFavSpots] = useState(false);
  const [favSpots, setFavSpots] = useState<FishSpot[] | null>([]);

  setDocTitle("Fish Spots");

  const getFavSpotsFromStorage = (dataFetched: FishSpot[]) => {
    const favSpotsString = localStorage.getItem("favSpots");
    const favSpots = favSpotsString ? JSON.parse(favSpotsString) : [];
    return dataFetched.filter((spot) => favSpots.includes(spot.id));
  };

  useEffect(() => {
    getFishPlaces(wantedRegion)
      .then((data: FishSpot[]) => {
        setFishSpots(data);
        setFavSpots(getFavSpotsFromStorage(data));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleSetFavSpots = () => {
    if (!fishSpots) return;

    const result = getFavSpotsFromStorage(fishSpots);
    setFavSpots(result);
    if (!result.length) {
      setShowFavSpots(false);
    }
  };

  const decideSpotsToShow = () => {
    if (showFavSpots && favSpots && favSpots.length) {
      return favSpots;
    }

    if (filteredSpots && filteredSpots.length) {
      return filteredSpots;
    }

    return fishSpots;
  };

  const addNewPlace = (placeObj: FishSpot) => {
    setFishSpots((currentSpots) => {
      if (!currentSpots) {
        return [placeObj];
      }

      return [placeObj, ...currentSpots];
    });
  };

  const handleDeleteModal = (newProps: Partial<DeleteModalProps>) => {
    setDeleteModal((oldProps) => {
      return { ...oldProps, ...newProps };
    });
  };

  const deleteOnAgree = () => {
    handleDeleteModal({ isLoading: true });
    deleteFishPlace(deleteModal.deleteId!)
      .then((response: Response) => {
        if (response.status === 204) {
          removeFishPlaceAfterDeletion(deleteModal.deleteId!);
          handleDeleteModal({ isOpened: false, deleteId: null });
        }
      })
      .catch(() => {})
      .finally(() => {
        handleDeleteModal({ isLoading: false });
      });
  };

  const removeFishPlaceAfterDeletion = (placeId: number) => {
    setFishSpots((spots) => {
      if (!spots) return spots;

      return spots.filter((spot) => spot.id !== placeId);
    });
  };

  const filterFishSpots = (searchSpot: string) => {
    if (!fishSpots || !fishSpots.length) return;

    searchSpot = searchSpot.toLowerCase();
    const userFilterSpots = [];

    for (const data of fishSpots) {
      if (
        data.place.toLowerCase().includes(searchSpot) ||
        data.bgPlaceName.toLowerCase().includes(searchSpot)
      ) {
        userFilterSpots.push(data);
      }
    }

    if (!userFilterSpots.length) {
      setEmptyFilter(true);
    } else if (userFilterSpots.length) {
      setFilteredSpots(userFilterSpots);
      setEmptyFilter(false);
    }
  };

  return (
    <main>
      <RegionChoice />

      {wantedRegion && <ChoiceContainer wantedCity={wantedRegion} />}

      {isAdmin && (
        <>
          <section className={`flex justify-center ${formOpen ? "" : "mb-10"}`}>
            <button
              type="button"
              className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setFormOpen((isOpen) => !isOpen)}
            >
              {formOpen ? "Скрий формата" : "Създай място"}
            </button>
          </section>
          <FishSpotForm showForm={formOpen} addNewPlaceHandler={addNewPlace} />
        </>
      )}

      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {!showFavSpots && (
            <FilterFishSpots filterFishSpots={filterFishSpots} />
          )}

          {emptyFilter && (
            <p className="text-2xl font-medium text-center mb-4">
              Няма намерени резултати.
            </p>
          )}

          <section className="flex justify-center mb-2">
            <button
              type="button"
              className={`px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                favSpots && favSpots.length
                  ? ""
                  : "disabled:opacity-75 cursor-not-allowed"
              }`}
              onClick={() =>
                setShowFavSpots((currVisibility) => !currVisibility)
              }
              disabled={!favSpots || !favSpots.length}
            >
              {showFavSpots ? "Скрий любими места" : "Покажи любими места"}
            </button>
          </section>

          {!emptyFilter && (
            <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1000px]:grid-cols-3 max-md:grid-cols-2 max-[460px]:grid-cols-1 gap-12 py-8 px-4 bg-slate-400 rounded-xl mb-16">
              {decideSpotsToShow()?.map((obj) => (
                <FishPlacesCard
                  key={obj.id}
                  spotId={obj.id}
                  bgPlaceName={obj.bgPlaceName}
                  image={obj.image}
                  description={obj.description}
                  region={obj.region}
                  place={obj.place}
                  openDeleteModal={() =>
                    handleDeleteModal({
                      isOpened: true,
                      deleteId: obj.id,
                    })
                  }
                  onFavoriteClickHandler={handleSetFavSpots}
                />
              ))}
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <DeleteAsker
          isOpen={deleteModal.isOpened}
          deleteOnAgree={deleteOnAgree}
          closeModal={() =>
            handleDeleteModal({ isOpened: false, deleteId: null })
          }
          isLoading={deleteModal.isLoading}
        />
      )}
    </main>
  );
}
