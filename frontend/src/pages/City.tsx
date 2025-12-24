import { useLocation } from "react-router-dom";
import setDocTitle from "@/util/setDocTitle";
import RegionChoice from "@/components/RegionChoice/RegionChoice";
import ChoiceContainer from "@/components/ChoiceContainer/ChoiceContainer";

export default function City() {
  const city = useLocation();
  const searchParams = new URLSearchParams(city.search);
  const wantedCity = searchParams.get("search");

  setDocTitle("Regions");

  return (
    <main>
      <RegionChoice />

      {wantedCity && <ChoiceContainer wantedCity={wantedCity} />}
    </main>
  );
}
