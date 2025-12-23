import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { baseUrl, latinToBgChepareType } from "../util/constants";
import type { ChepareSeller, ChepareType } from "../types/chepare";

export default function CheparetaDetails() {
  const navigate = useNavigate();
  const { seller } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chepareDetails, setChepareDetails] = useState<ChepareSeller | null>(
    null
  );

  useEffect(() => {
    fetch(`${baseUrl}/chepareta/details/${seller}/`)
      .then((response) => {
        if (response.status === 400) {
          navigate("/404");
        }

        return response.json();
      })
      .then((data) => {
        setChepareDetails(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const getSellerChepareTypes = () => {
    if (!chepareDetails) return [];

    const uniqueTypes: ChepareType[] = [];
    for (const obj of chepareDetails.images) {
      if (uniqueTypes.includes(obj.chepareType)) {
        continue;
      }

      uniqueTypes.push(obj.chepareType);
    }
    return uniqueTypes;
  };

  const getChepareImagesByType = (type: ChepareType) => {
    if (!chepareDetails) return [];

    return chepareDetails.images.filter((obj) => obj.chepareType === type);
  };

  if (isLoading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  if (!chepareDetails) {
    return (
      <main>
        <h1 className="text-center text-2xl font-medium">
          Неуспешно зареждане
        </h1>
      </main>
    );
  }

  return (
    <main>
      <article className="max-w-6xl mx-auto py-10 text-white mt-6 bg-cyan-950 p-6 rounded">
        <h1 className="text-center text-2xl font-medium uppercase mb-10">
          {chepareDetails.name}
        </h1>

        {getSellerChepareTypes().map((chepareType) => (
          <div key={chepareType}>
            <h3 className="text-center font-medium uppercase text-2xl">
              {latinToBgChepareType[chepareType]} -{" "}
              {getChepareImagesByType(chepareType).length} снимки
            </h3>
            <div className="h-[650px] mx-auto max-w-3xl mb-8">
              <Carousel pauseOnHover indicators={false}>
                {getChepareImagesByType(chepareType).map((img) => (
                  <img
                    className="w-full h-full"
                    key={img.image}
                    src={img.image}
                    alt="чепаре"
                    loading="lazy"
                  />
                ))}
              </Carousel>
            </div>
          </div>
        ))}
        <section className="flex flex-col items-center justify-center gap-5">
          <span className="text-2xl font-medium text-center">Контакти:</span>
          <p className="text-2xl font-medium">{chepareDetails.contact}</p>
        </section>
      </article>
    </main>
  );
}
