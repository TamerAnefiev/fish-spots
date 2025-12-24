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
      <div className="flex justify-center items-center h-96 min-h-fit overflow-hidden relative">
        <img
          className="w-full h-full object-cover"
          src={"/assets/banner.jpg"}
          alt="banner"
        ></img>
        <div className="absolute bg-zinc-900 opacity-60 w-full h-full"></div>
        <article className="flex flex-col justify-center gap-8 absolute text-white">
          <h1 className="max-md:text-2xl max-md:px-6 text-4xl text-center font-medium tracking-widest">
            Тук ще откриете вашите места за{" "}
            <span className="text-sky-400">риболов!</span>
          </h1>

          <Link
            to="/city"
            className="bg-emerald-400 self-center px-8 py-3 text-2xl rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105"
          >
            Разгледай!
          </Link>
        </article>
      </div>

      <article className="py-16">
        <h2 className="text-center max-md:text-2xl text-4xl mb-12 px-4 relative">
          Информация за над 25 места!
          <div className="absolute top-[115%] left-2/4 -translate-x-2/4 -translate-y-1/2 max-md:w-40 w-60 h-0.5 bg-cyan-600"></div>
        </h2>

        <div className="w-full flex flex-wrap justify-center gap-12 w-3/5">
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

      <section className="py-16 flex flex-col justify-center items-center">
        <h2 className="text-center max-md:text-2xl text-4xl mb-12 px-4 relative">
          Чепарета от известни майстори!
          <div className="absolute top-[115%] left-2/4 -translate-x-2/4 -translate-y-1/2 max-md:w-40 w-60 h-0.5 bg-cyan-600"></div>
        </h2>
        <ul className="text-2xl max-w-lg bg-gray-200 p-8 rounded-3xl shadow-xl mb-6">
          {chepareTypes.map((chepareType) => (
            <li key={chepareType}>
              <p className="mb-3 inline-flex justify-between items-center w-full gap-4">
                {chepareType}
                <span>
                  <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                </span>
              </p>
            </li>
          ))}
        </ul>
        <Link
          to="/chepareta"
          className="bg-emerald-400 self-center px-8 py-3 text-2xl rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105"
        >
          Разгледай!
        </Link>
      </section>
    </main>
  );
};

export default Home;
