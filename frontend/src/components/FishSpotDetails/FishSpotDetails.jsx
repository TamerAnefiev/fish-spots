import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaceDetails } from '../../services/fish-spots';
import Spinner from '../Spinner/Spinner';
import CookieConsentContext from '../../context/CookieConsentContext';
import setDocTitle from '../../util/setDocTitle';

export default function FishSpotDetails() {
    const { hasAgreed } = useContext(CookieConsentContext);
    const { region, spotName } = useParams();
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPlaceDetails(region, spotName)
            .then((response) => {
                if (response.status === 400) {
                    navigate('/404');
                }

                return response.json();
            })
            .then((data) => {
                setDocTitle(`${data.bg_place_name} Details`);
                setPlaceData(data);
            })
            .catch((error) => console.error(error.message))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <main className="max-w-6xl mx-auto py-10">
            {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                </div>
            )}

            {!isLoading && Object.keys(placeData).length > 0 && (
                <article className="p-6 bg-cyan-950 rounded text-white">
                    <h1 className="text-center text-2xl font-medium uppercase">
                        {placeData.bg_place_name}
                    </h1>
                    <div className="mb-6">
                        <img
                            className="aspect-video rounded mx-auto"
                            src={placeData.image}
                            alt={placeData.bg_place_name}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        {hasAgreed && (
                            <section>
                                <h3 className="text-xl text-center">
                                    Можете да разгледате мястото чрез{' '}
                                    <span className="font-bold">
                                        Google Maps
                                    </span>
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
                            <h3 className="text-xl text-center">
                                Прогноза за времето
                            </h3>
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
                                Подробности за{' '}
                                <span className="font-bold">
                                    {placeData.bg_place_name}
                                </span>
                                :
                            </h3>
                            <p className="text-xl px-3">
                                {placeData.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-center text-2xl mb-1 text-red-700 font-bold">
                                Неблагоприятни посоки на вятъра за мястото:
                            </h3>
                            <p className="text-xl text-center">
                                {placeData.bad_wind_directions.join(', ')}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-center text-2xl mb-1 text-red-700 font-bold">
                                Допустима скорост на вятъра за риболов на това
                                място:
                            </h3>
                            <p className="text-2xl text-center">
                                {placeData.max_wind_speed}м/с
                            </p>
                        </section>
                    </div>
                </article>
            )}
        </main>
    );
}
