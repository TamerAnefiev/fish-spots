import RegionChoiceCard from "../RegionChoiceCard/RegionChoiceCard";
import { useLocation } from "react-router-dom";
import { cityRoutes } from "../../util/routes";

const choiceCards = [
  {
    imgPath: "/assets/weather-icon.png",
    imgAlt: "прогноза",
    text: "Прогноза за времето",
    linkTo: cityRoutes.weather,
    name: "weather",
  },
  {
    imgPath: "/assets/fish-rod.png",
    imgAlt: "въдица",
    text: "Риболовни места",
    linkTo: cityRoutes.fishSpots,
    name: "fish-spots",
  },
  {
    imgPath: "/assets/spoticon.png",
    imgAlt: "локация",
    text: "Предложи ми място",
    linkTo: cityRoutes.suggestedSpots,
    name: "suggested-spots",
  },
];

export default function ChoiceContainer({ wantedCity }) {
  const pathName = useLocation().pathname;

  return (
    <>
      <div className="max-md:hidden grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-5 max-w-7xl mx-auto text-2xl text-center bg-slate-500 text-black p-10 mb-20 rounded-xl font-medium">
        {choiceCards.map((card) => (
          <RegionChoiceCard
            key={card.imgPath}
            imgUrl={card.imgPath}
            imgAlt={card.imgAlt}
            pText={card.text}
            linkTo={card.linkTo + `?search=${wantedCity}`}
            shouldScale={pathName.includes(card.name)}
            isMobile={false}
          />
        ))}
      </div>

      <div className="md:hidden max-w-3xl mx-auto p-6 text-2xl bg-white rounded-xl mb-20">
        <p className="text-center mb-5 font-medium">Избери</p>
        <section className="flex-col text-center flex justify-around gap-5 text-white">
          {choiceCards.map((card) => (
            <RegionChoiceCard
              key={card.imgPath}
              pText={card.text}
              linkTo={card.linkTo + `?search=${wantedCity}`}
              shouldScale={pathName.includes(card.name)}
              isMobile={true}
            />
          ))}
        </section>
      </div>
    </>
  );
}
