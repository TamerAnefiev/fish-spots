import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner/Spinner";
import { baseUrl, latinToBgChepareType } from "@/util/constants";
import type { ChepareSeller, ChepareType } from "@/types/chepare";

export default function CheparetaDetails() {
  const navigate = useNavigate();
  const { sellerSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [chepareDetails, setChepareDetails] = useState<ChepareSeller | null>(
    null,
  );

  useEffect(() => {
    fetch(`${baseUrl}/chepareta/details/${sellerSlug}/`)
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
    for (const chepareType in Object.keys(chepareDetails.images)) {
      if (uniqueTypes.includes(chepareType as ChepareType)) {
        continue;
      }

      uniqueTypes.push(chepareType as ChepareType);
    }
    return uniqueTypes;
  };

  const getChepareImagesByType = (type: ChepareType) => {
    if (!chepareDetails) return [];

    return chepareDetails.images?.[type] || [];
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
      <article className="mx-auto mt-6 max-w-6xl rounded bg-cyan-950 p-6 py-10 text-white">
        <h1 className="mb-10 text-center text-2xl font-medium uppercase">
          {chepareDetails.firstName} {chepareDetails.lastName}
        </h1>

        {getSellerChepareTypes().map((chepareType) => (
          <div key={chepareType}>
            <h3 className="text-center text-2xl font-medium uppercase">
              {latinToBgChepareType[chepareType]} -{" "}
              {getChepareImagesByType(chepareType).length} снимки
            </h3>
            <div className="mx-auto mb-8 h-[650px] max-w-3xl">
              {/* TODO: ADD CAROUSEL */}
              {/* <Carousel pauseOnHover indicators={false}>
                {getChepareImagesByType(chepareType).map((img) => (
                  <img
                    className="w-full h-full"
                    key={img.image}
                    src={img.image}
                    alt="чепаре"
                    loading="lazy"
                  />
                ))}
              </Carousel> */}
            </div>
          </div>
        ))}
        <section className="flex flex-col items-center justify-center gap-5">
          <span className="text-center text-2xl font-medium">Контакти:</span>
          <p className="text-2xl font-medium">{chepareDetails.contact}</p>
        </section>
      </article>
    </main>
  );
}
