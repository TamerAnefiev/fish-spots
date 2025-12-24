import { Link } from "react-router-dom";
import { cityRoutes } from "@/util/routes.js";
import { bulgarianToLatinCities } from "@/util/constants";

type BulgarianCity = keyof typeof bulgarianToLatinCities;

type SelectCityProps = {
  region: string;
  city1: BulgarianCity;
  city2: BulgarianCity;
  city3: BulgarianCity;
};

export default function SelectCity({
  region,
  city1,
  city2,
  city3,
}: SelectCityProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 text-2xl bg-white rounded-xl mb-20">
      <p className="text-center mb-10 font-medium">Избери град</p>
      <section className="max-md:flex-col max-md:text-center flex justify-around gap-10 text-white">
        {[city1, city2, city3].map((city) => (
          <Link
            key={city}
            to={`${cityRoutes.weather}?search=${region}&place=${bulgarianToLatinCities[city]}`}
            className="bg-cyan-700 hover:bg-cyan-800 py-2 px-6 rounded cursor-pointer"
          >
            {city}
          </Link>
        ))}
      </section>
    </div>
  );
}
