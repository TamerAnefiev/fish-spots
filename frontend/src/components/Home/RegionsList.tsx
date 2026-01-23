import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import RegionCard from "./RegionCard";
import type { RegionPlaces } from "@/types/fishspots";
import { baseUrl } from "@/util/constants";
import { regionsKeys } from "@/lib/query-keys";

const getRegionPlaces = async (): Promise<RegionPlaces> => {
  const response = await fetch(`${baseUrl}/places/number-of-places/`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export function RegionsList() {
  const { data } = useSuspenseQuery({
    queryKey: regionsKeys.regionPlaces,
    queryFn: getRegionPlaces,
  });

  return (
    <section className="py-16">
      <h2 className="relative mb-8 px-4 text-center text-4xl font-semibold max-md:text-2xl">
        {data.total > 0
          ? `Информация за {data.total} места!`
          : "Все още няма добавени места."}
        <div className="absolute top-[115%] left-1/2 h-0.5 w-60 -translate-x-1/2 bg-cyan-600 max-md:w-40" />
      </h2>

      <div className="flex w-full flex-wrap justify-center gap-12">
        {data.regions.map(({ region, regionBgName, count }) => (
          <Link
            key={region}
            to={`/city?search=${region}`}
            className="block transition-all duration-200 hover:-translate-y-1"
          >
            <RegionCard
              name={regionBgName}
              features={[
                `${count} места`,
                "Автоматизирани подсказки",
                "Правилна информация",
              ]}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
