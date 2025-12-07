import { Link } from 'react-router-dom';


export default function CityCard({ city, linkTo, cityData }) {
    return (
        <Link to={linkTo}>
            <section className="hover:bg-cyan-50 max-w-lg bg-gray-200 p-8 rounded-3xl hover:scale-105 duration-150 cursor-pointer shadow-xl">
                <h3 className="text-2xl text-center font-bold mb-6 relative">
                    {city}
                    <div className="absolute top-[100%] left-2/4 -translate-x-2/4 -translate-y-1/2 w-16 h-0.5 bg-cyan-600"></div>
                </h3>
                <div className="flex justify-center gap-x-12">
                    <section className="text-2xl">
                        {cityData.map(data => (
                            <p key={data} className="mb-3 inline-flex justify-between items-center w-full"
                                >
                                {data}
                                <span>
                                    <i className="fa-solid fa-check text-white bg-green-500 p-1.5 rounded-full w-8 h-8"></i>
                                </span>
                            </p>
                        ))}
                    </section>
                </div>
            </section>
        </Link>
    );
}