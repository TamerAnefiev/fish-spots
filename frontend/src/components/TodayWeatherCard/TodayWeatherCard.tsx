import type { WindDirection } from "../../types/weather";

const directions = {
  Север: "fa-arrow-down-long",
  Североизток: "fa-arrow-down-long rotate-45",
  Изток: "fa-arrow-left-long",
  Югоизток: "fa-arrow-left-long rotate-45",
  Юг: "fa-arrow-up-long",
  Югозапад: "fa-arrow-up-long rotate-45",
  Запад: "fa-arrow-right-long",
  Северозапад: "fa-arrow-right-long rotate-45",
};

type TodayWeatherCardProps = {
  time: string;
  weatherIconUrl: string;
  normalTemp: number;
  feelsLike: number;
  windDirection: WindDirection;
  windSpeed: number;
};

export default function TodayWeatherCard({
  time,
  weatherIconUrl,
  normalTemp,
  feelsLike,
  windDirection,
  windSpeed,
}: TodayWeatherCardProps) {
  return (
    <section className="bg-cyan-400 rounded-xl p-4 text-center text-xl mb-6">
      <p>{time.slice(0, 5)}ч</p>
      <div className="w-24 h-24 mx-auto">
        <img className="w-full h-auto" src={weatherIconUrl} alt="времето" />
      </div>
      <p className="mb-5">
        {normalTemp}
        <i className="ml-1.5 fa-solid fa-temperature-low"></i>
      </p>

      <div className="flex flex-col gap-3">
        <div className="bg-white rounded-xl p-1">
          <p>Усеща се</p>
          <p className="relative">
            {feelsLike}
            <i className="absolute top-[15%] ml-0.5 text-[8px] fa-regular fa-circle"></i>
          </p>
        </div>

        <div className="bg-white rounded-xl p-1">
          <p>Вятър</p>
          <p>{windDirection}</p>
          <p>
            <i className={`fa-solid ${directions[windDirection]}`}></i>
          </p>
        </div>

        <div className="bg-white rounded-xl p-1">
          <p>Скорост</p>
          <p>{windSpeed}м/с</p>
        </div>
      </div>
    </section>
  );
}
