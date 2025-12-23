import ChoiceContainer from "../ChoiceContainer/ChoiceContainer";
import RegionChoice from "../RegionChoice/RegionChoice";
import SelectCity from "../SelectCity/SelectCity";
import Spinner from "../Spinner/Spinner";
import TodayWeatherCard from "../TodayWeatherCard/TodayWeatherCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWeatherForPlace } from "../../services/weather";
import setDocTitle from "../../util/setDocTitle";
import type { Day, MultipleDays } from "../../types/weather";

export default function Weather() {
  const [isLoading, setIsLoading] = useState(true);
  const [cityWeather, setCityWeather] = useState<MultipleDays | null>(null);

  const city = useLocation();
  const searchParams = new URLSearchParams(city.search);
  const wantedRegion = searchParams.get("search") || "varna";
  const wantedCity = searchParams.get("place") || "varna";

  setDocTitle("Weather");

  useEffect(() => {
    if (wantedCity) {
      getWeatherForPlace(wantedRegion, wantedCity)
        .then((data) => {
          setCityWeather((prevData) => {
            return { ...prevData, ...data };
          });
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [wantedCity]);

  function renderTodayWeatherCard(data: Day, showSunset = false) {
    return (
      <>
        <p className="text-center text-white text-2xl mb-3">{data.dayOfWeek}</p>
        <p className="text-center text-white text-2xl mb-8">{data.todayDate}</p>
        {showSunset ? (
          <section className="flex justify-center gap-10 text-center">
            <p className="text-white text-2xl">Изгрев в {data.sunrise}ч</p>
            <p className="text-white text-2xl mb-8">Залез в {data.sunset}ч</p>
          </section>
        ) : (
          ""
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] px-5 gap-3 mb-12">
          {data.listHours.map((day) => (
            <TodayWeatherCard
              key={day.id}
              time={day.time}
              weatherIconUrl={day.weatherIconUrl}
              normalTemp={day.normalTemp}
              feelsLike={day.feelsLike}
              windDirection={day.windDirection}
              windSpeed={day.windSpeed}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <main>
      <RegionChoice />

      {wantedRegion && <ChoiceContainer wantedCity={wantedRegion} />}

      <SelectCity
        region={wantedRegion}
        city1={wantedRegion === "varna" ? "Шабла" : "Бургас"}
        city2={wantedRegion === "varna" ? "Кранево" : "Черноморец"}
        city3={wantedRegion === "varna" ? "Варна" : "Приморско"}
      />

      {isLoading && wantedCity && <Spinner />}

      {cityWeather?.today && (
        <>
          <article className="max-w-screen-2xl mx-auto bg-cyan-700 rounded-xl mb-32">
            <h3 className="max-w-7xl mx-auto text-center py-10 text-3xl relative">
              Прогноза за днес - {cityWeather.today.bgNamePlace}
              <div className="absolute top-[75%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-60 h-0.5 bg-white"></div>
            </h3>
            {renderTodayWeatherCard(cityWeather.today, true)}
          </article>

          <article className="max-w-screen-2xl mx-auto bg-cyan-700 py-7 rounded-xl mb-32">
            <h3 className="max-w-7xl mx-auto text-center py-10 text-3xl relative">
              4 дневна прогноза
              <div className="absolute top-[75%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-40 h-0.5 bg-white"></div>
            </h3>
            {renderTodayWeatherCard(cityWeather.fourDays.firstDay)}
            {renderTodayWeatherCard(cityWeather.fourDays.secondDay)}
            {renderTodayWeatherCard(cityWeather.fourDays.thirdDay)}
            {renderTodayWeatherCard(cityWeather.fourDays.fourthDay)}
          </article>
        </>
      )}
    </main>
  );
}
