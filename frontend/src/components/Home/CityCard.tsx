import { Link } from "react-router-dom";

type CityCardProps = {
  cityName: string;
  cityData: readonly string[];
  linkTo: string;
};

export default function CityCard({
  cityName,
  linkTo,
  cityData,
}: CityCardProps) {
  return (
    <Link to={linkTo}>
      <section className="bg-muted max-w-lg cursor-pointer rounded-3xl p-8 shadow-xl duration-150 hover:scale-102">
        <h3 className="relative mb-6 text-center text-2xl font-bold">
          {cityName}
          <div className="absolute top-full left-2/4 h-0.5 w-16 -translate-x-2/4 -translate-y-1/2 bg-cyan-600"></div>
        </h3>
        <div className="flex justify-center gap-x-12">
          <section className="text-2xl">
            {cityData.map((data) => (
              <p
                key={data}
                className="mb-3 inline-flex w-full items-center justify-between"
              >
                {data}
                <span>
                  <i className="fa-solid fa-check h-8 w-8 rounded-full bg-green-500 p-1.5 text-white"></i>
                </span>
              </p>
            ))}
          </section>
        </div>
      </section>
    </Link>
  );
}
