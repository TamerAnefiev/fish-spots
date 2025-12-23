import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center max-w-4xl mx-auto mt-20 p-4 bg-cyan-800 text-white text-2xl rounded-lg">
      <section>
        <img
          className="max-md:hidden"
          src={"/assets/cockroach.png"}
          alt="error-image"
          loading="lazy"
        />
      </section>
      <div className="flex flex-col gap-6 items-center text-center">
        <h3>Ух... Ох!</h3>
        <p>Тази страница не съществува!</p>
        <p>Може би искате да се върнете към началната страница?</p>
        <Link
          className="bg-emerald-400 px-10 py-4 rounded-full font-medium hover:bg-teal-600 duration-300 hover:scale-105"
          to="/"
        >
          Към началната страница
        </Link>
      </div>
    </div>
  );
}
