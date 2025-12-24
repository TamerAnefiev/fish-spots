import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FishPlacesCard from "@/components/FishPlacesCard/FishPlacesCard";
import RegionChoice from "@/components/RegionChoice/RegionChoice";
import ChoiceContainer from "@/components/ChoiceContainer/ChoiceContainer";
import FilterFishSpots from "@/components/FilterFishSpots/FilterFishSpots";
import Spinner from "@/components/Spinner/Spinner";
import { getSuggestedSpots } from "@/services/fish-spots";
import setDocTitle from "@/util/setDocTitle";
import type { FishSpot } from "@/types/fishspots";

export default function SuggestedSpots() {
  const city = useLocation();
  const searchParams = new URLSearchParams(city.search);
  const wantedRegion = searchParams.get("search") || "varna";

  const [filteredSpots, setFilteredSpots] = useState<FishSpot[]>([]);
  const [emptyFilter, setEmptyFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSpots, setSuggestedSpots] = useState<FishSpot[]>([]);

  setDocTitle("Suggested Spots");

  useEffect(() => {
    const fetchSuggestedSpots = async () => {
      try {
        setIsLoading(true);
        const response = await getSuggestedSpots(wantedRegion);
        if (response.status === 400) {
          throw new Error("Региона е невалиден.");
        }

        const data = await response.json();
        setSuggestedSpots(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestedSpots();
  }, []);

  const filterFishSpots = (searchSpot: string) => {
    searchSpot = searchSpot.toLowerCase();
    const userFilterSpots: FishSpot[] = [];

    for (const data of suggestedSpots) {
      if (
        data.place.includes(searchSpot) ||
        data.bgPlaceName.includes(searchSpot)
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

      <h3 className="pb-4 text-2xl text-center">
        Предложените места са за{" "}
        <span className="text-4xl font-bold text-cyan-800">ДНЕС</span> на база
        на днешното време.
      </h3>
      <p className="text-center text-2xl pb-8">
        Информацията се обновява на всеки{" "}
        <span className="text-4xl font-bold text-cyan-800 animate-pulse">
          3
        </span>{" "}
        часа.
      </p>

      {isLoading && <Spinner />}

      {!isLoading && suggestedSpots.length ? (
        <>
          {suggestedSpots.length && (
            <FilterFishSpots filterFishSpots={filterFishSpots} />
          )}

          {emptyFilter && (
            <p className="text-2xl font-medium text-center mb-4">
              Няма намерени резултати.
            </p>
          )}

          {!emptyFilter && (
            <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1000px]:grid-cols-3 max-md:grid-cols-2 max-[460px]:grid-cols-1 gap-12 py-8 px-4 bg-slate-400 rounded-xl mb-16">
              {(filteredSpots.length ? filteredSpots : suggestedSpots).map(
                (spot) => (
                  <FishPlacesCard
                    key={spot.id}
                    spotId={spot.id}
                    bgPlaceName={spot.bgPlaceName}
                    image={spot.image}
                    description={spot.description}
                    region={spot.region}
                    place={spot.place}
                  />
                )
              )}
            </div>
          )}
        </>
      ) : (
        <h3 className="text-2xl py-12 text-center">
          Няма предложени места или информацията е недостатъчна за да се
          изчисли.
        </h3>
      )}
    </main>
  );
}
