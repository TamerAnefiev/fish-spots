import setDocTitle from "../../util/setDocTitle";
import ChoiceContainer from "../ChoiceContainer/ChoiceContainer";
import { useLocation } from "react-router-dom";
import RegionChoice from "../RegionChoice/RegionChoice";

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
