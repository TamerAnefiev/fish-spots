import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CheparetaForm from "@/components/Chepareta/CheparetaForm";
import Spinner from "@/components/Spinner/Spinner";
import setDocTitle from "@/util/setDocTitle";
import { useAuth } from "@/context/AuthContext";
import { baseUrl, latinToBgChepareType } from "@/util/constants";
import type { ChepareSeller } from "@/types/chepare";

export default function Chepareta() {
  const { user } = useAuth();

  const [allChepareta, setAllChepareta] = useState<ChepareSeller[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);

  setDocTitle("Fish Spots");

  useEffect(() => {
    fetch(`${baseUrl}/chepareta/`)
      .then((response) => response.json())
      .then((data) => {
        setAllChepareta(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading((oldLoading) => !oldLoading));
  }, []);

  const addNewSellerHandler = (newSeller: ChepareSeller) => {
    setAllChepareta((prev) => {
      if (!prev) return prev;

      return [newSeller, ...prev];
    });
  };

  const getCardDescription = (seller: ChepareSeller) => {
    const uniqueTypes: string[] = [];
    seller.images.map((obj) => {
      const bgName = latinToBgChepareType[obj.chepareType];
      if (uniqueTypes.includes(bgName)) {
        return;
      }

      uniqueTypes.push(bgName);
    });

    return uniqueTypes;
  };

  return (
    <main className="py-6">
      {user?.isAdmin && (
        <>
          <section className={`flex justify-center ${formOpen ? "" : "mb-10"}`}>
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-6 py-3.5 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setFormOpen((isOpen) => !isOpen)}
            >
              {formOpen ? "Скрий формата" : "Създай продавач"}
            </button>
          </section>
          <CheparetaForm
            showForm={formOpen}
            closeForm={() => setFormOpen(false)}
            addNewSellerHandler={addNewSellerHandler}
          />
        </>
      )}

      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <h2 className="text-center text-3xl font-medium uppercase">
            Майстори:
          </h2>
          <div className="mx-auto mb-16 grid max-w-7xl grid-cols-4 gap-12 rounded-xl bg-slate-400 px-4 py-8 max-[1000px]:grid-cols-3 max-[460px]:grid-cols-1 max-md:grid-cols-2">
            {allChepareta?.map((seller) => (
              <section
                key={seller.name}
                className="rounded bg-cyan-950 p-3 text-center shadow-2xl shadow-black"
              >
                <h3 className="mb-2 font-medium text-white">{seller.name}</h3>
                <div>
                  <img
                    className="aspect-4/3 w-full rounded-t"
                    src={seller.images[0].image}
                    alt="Чепаре"
                    loading="lazy"
                  />
                </div>
                <section
                  className={`max-h-50 bg-white px-1 py-2 ${
                    user ? "" : "rounded-b"
                  }`}
                >
                  <section className="flex flex-col items-center gap-1">
                    <span>Чепарета за:</span>
                    <p>{getCardDescription(seller).join(", ")}</p>
                  </section>
                  <section className="flex justify-center">
                    <Link
                      className="rounded-xl bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-800"
                      to={`/chepareta/${seller.name
                        .replace(" ", "-")
                        .toLowerCase()}`}
                    >
                      Детайли
                    </Link>
                  </section>
                </section>
              </section>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
