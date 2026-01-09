import { useSuspenseQuery } from "@tanstack/react-query";
import type { ChepareSeller } from "@/types/chepare";
import { baseUrl } from "@/util/constants";
import { ChepareCard } from "./ChepareCard";

const getAllChepareta = async (): Promise<ChepareSeller[]> => {
  const response = await fetch(`${baseUrl}/chepareta/`);
  if (!response.ok) throw new Error("Неуспешно зареждане на продавачите.");
  return response.json();
};

export function CheparetaList() {
  const { data } = useSuspenseQuery({
    queryKey: ["getChepareta"],
    queryFn: getAllChepareta,
  });

  if (!data.length) {
    return (
      <h3 className="text-destructive mt-4 text-center font-bold">
        Няма добавени майстори в момента.
      </h3>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 rounded-xl px-4 py-6 max-[1000px]:grid-cols-3 max-[460px]:grid-cols-1 max-md:grid-cols-2">
      {data.map((seller) => (
        <ChepareCard key={seller.name} seller={seller} />
      ))}
    </div>
  );
}
