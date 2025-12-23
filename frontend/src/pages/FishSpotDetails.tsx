import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookieConsentContext } from "../context/CookieConsentContext";
import type { FishSpot } from "../types/fishspots";
import { getPlaceDetails } from "../services/fish-spots";
import setDocTitle from "../util/setDocTitle";
import Spinner from "../components/Spinner/Spinner";

export default function FishSpotDetails() {
  const { hasAgreed } = useCookieConsentContext();
  const { region, spotName } = useParams();
  const navigate = useNavigate();
  const [placeData, setPlaceData] = useState<FishSpot | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getPlaceDetails(region!, spotName!);
        if (response.status === 400) {
          navigate("/404");
          return;
        }

        const data: FishSpot = await response.json();
        setDocTitle(`${data.bgPlaceName} Details`);
        setPlaceData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, []);

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto py-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      </main>
    );
  }

  if (!placeData) {
    return (
      <main className="max-w-6xl mx-auto py-10">
        <h2 className="text-center text-2xl font-medium uppercase">
          Неуспешно зареждане на локацията.
        </h2>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10">
      <article className="p-6 bg-cyan-950 rounded text-white">
        <h1 className="text-center text-2xl font-medium uppercase">
          {placeData.bgPlaceName}
        </h1>
        <div className="mb-6">
          <img
            className="aspect-video rounded mx-auto"
            src={placeData.image}
            alt={placeData.bgPlaceName}
          />
        </div>

        <div className="flex flex-col gap-5">
          {hasAgreed && (
            <section>
              <h3 className="text-xl text-center">
                Можете да разгледате мястото чрез{" "}
                <span className="font-bold">Google Maps</span>
              </h3>
              <iframe
                className="w-full h-[600px] max-md:h-[400px] rounded shadow-lg"
                src={`https://maps.google.com/maps?q=${placeData.latitude},${placeData.longitude}&t=k&z=20&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Рибарско място"
              ></iframe>
            </section>
          )}

          <section>
            <h3 className="text-xl text-center">Прогноза за времето</h3>
            <iframe
              className="w-full h-[600px] max-md:h-[400px] rounded shadow-lg"
              src={`https://embed.windy.com/embed2.html?lat=${placeData.latitude}&lon=${placeData.longitude}&detailLat=${placeData.latitude}&detailLon=${placeData.longitude}&zoom=18&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=true&pressure=&type=map&location=coordinates&detail=true&metricWind=m%2Fs&metricTemp=%C2%B0C&radarRange=-1`}
              loading="lazy"
              title="Времето за мястото"
            ></iframe>
          </section>
        </div>

        <div className="flex flex-col gap-5 py-6">
          <section>
            <h3 className="text-center text-2xl mb-1">
              Подробности за{" "}
              <span className="font-bold">{placeData.bgPlaceName}</span>:
            </h3>
            <p className="text-xl px-3">{placeData.description}</p>
          </section>

          <section>
            <h3 className="text-center text-2xl mb-1 text-red-700 font-bold">
              Неблагоприятни посоки на вятъра за мястото:
            </h3>
            <p className="text-xl text-center">
              {placeData.badWindDirections.join(", ")}
            </p>
          </section>

          <section>
            <h3 className="text-center text-2xl mb-1 text-red-700 font-bold">
              Допустима скорост на вятъра за риболов на това място:
            </h3>
            <p className="text-2xl text-center">{placeData.maxWindSpeed}м/с</p>
          </section>
        </div>
      </article>
    </main>
  );
}
