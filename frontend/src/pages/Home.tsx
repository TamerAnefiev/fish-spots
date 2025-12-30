import { Link } from "react-router-dom";
import setDocTitle from "@/util/setDocTitle";
import CityCard from "@/components/Home/CityCard";

const cityCards = [
  {
    cityName: "ВАРНА",
    linkTo: "/city?search=varna",
    cityData: ["14 места", "Автоматизирани подсказки", "Правилна информация"],
  },
  {
    cityName: "БУРГАС",
    linkTo: "/city?search=burgas",
    cityData: ["14 места", "Автоматизирани подсказки", "Правилна информация"],
  },
] as const;

const chepareTypes = [
  "Чепарета за сафрид",
  "Чепарета за карагьоз",
  "Чепарета за чернокоп",
];

const Home = () => {
  setDocTitle("Home");

  return (
    <main>
      <div className="relative flex h-96 min-h-fit items-center justify-center overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={"/assets/banner.jpg"}
          alt="banner"
        ></img>
        <div className="absolute h-full w-full bg-zinc-900 opacity-60"></div>
        <article className="absolute flex flex-col justify-center gap-8 text-white">
          <h1 className="text-center text-4xl font-medium tracking-widest max-md:px-6 max-md:text-2xl">
            Тук ще откриете вашите места за{" "}
            <span className="text-sky-400">риболов!</span>
          </h1>

          <Link
            to="/city"
            className="self-center rounded-full bg-emerald-400 px-8 py-3 text-2xl font-medium duration-300 hover:scale-105 hover:bg-teal-600"
          >
            Разгледай!
          </Link>
        </article>
      </div>

      <article className="py-16">
        <h2 className="relative mb-12 px-4 text-center text-4xl max-md:text-2xl">
          Информация за над 25 места!
          <div className="absolute top-[115%] left-2/4 h-0.5 w-60 -translate-x-2/4 -translate-y-1/2 bg-cyan-600 max-md:w-40"></div>
        </h2>

        <div className="flex w-full flex-wrap justify-center gap-12">
          {cityCards.map((city) => (
            <CityCard
              key={city.cityName}
              cityName={city.cityName}
              linkTo={city.linkTo}
              cityData={city.cityData}
            />
          ))}
        </div>
      </article>

      <section className="flex flex-col items-center justify-center py-16">
        <h2 className="relative mb-12 px-4 text-center text-4xl max-md:text-2xl">
          Чепарета от известни майстори!
          <div className="absolute top-[115%] left-2/4 h-0.5 w-60 -translate-x-2/4 -translate-y-1/2 bg-cyan-600 max-md:w-40"></div>
        </h2>
        <Link to="/chepareta" className="duration-150 hover:scale-102">
          <ul className="bg-muted mb-6 max-w-lg rounded-3xl p-8 text-2xl shadow-xl">
            {chepareTypes.map((chepareType) => (
              <li key={chepareType}>
                <p className="mb-3 inline-flex w-full items-center justify-between gap-4">
                  {chepareType}
                  <span>
                    <i className="fa-solid fa-check h-8 w-8 rounded-full bg-green-500 p-1.5 text-white"></i>
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Link>
      </section>
    </main>
  );
};

export default Home;
