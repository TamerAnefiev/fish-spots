import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import setDocTitle from "@/util/setDocTitle";
import RegionsSection from "@/components/Home/RegionsSection";
import { Card, CardContent } from "@/components/ui/card";

const CHEPARE_TYPES = [
  "Чепарета за сафрид",
  "Чепарета за карагьоз",
  "Чепарета за чернокоп",
] as const;

const Home = () => {
  setDocTitle("Home");

  return (
    <main>
      <div className="relative flex h-96 min-h-fit items-center justify-center overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={"/assets/banner.jpg"}
          alt="banner"
        />
        <div className="absolute h-full w-full bg-zinc-900 opacity-60" />
        <section className="absolute flex flex-col justify-center gap-8 text-white">
          <h1 className="text-center text-4xl font-medium tracking-widest max-md:px-6 max-md:text-2xl">
            Тук ще откриете вашите места за{" "}
            <span className="text-sky-400">риболов!</span>
          </h1>

          <Link
            to="/city"
            className="self-center rounded-full bg-emerald-400 px-8 py-3 text-2xl font-medium duration-300 hover:scale-105 hover:bg-teal-600"
          >
            Разгледай!
          </Link>
        </section>
      </div>

      <RegionsSection />

      <section className="flex flex-col items-center justify-center pb-16">
        <h2 className="relative mb-8 px-4 text-center text-4xl max-md:text-2xl">
          Чепарета от известни майстори!
          <div className="absolute top-[115%] left-2/4 h-0.5 w-60 -translate-x-2/4 -translate-y-1/2 bg-cyan-600 max-md:w-40" />
        </h2>
        <Link
          to="/chepareta"
          className="block transition-all duration-200 hover:-translate-y-1"
        >
          <Card className="bg-muted/50 w-87.5 overflow-hidden border-none shadow-xl hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {CHEPARE_TYPES.map((chepareType) => (
                  <div
                    key={chepareType}
                    className="flex items-center justify-between text-xl"
                  >
                    <span>{chepareType}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>
    </main>
  );
};

export default Home;
