import { useState, useEffect } from "react";
import { fetchCatchStats, deleteCatchStat } from "./services";
import Pagination from "./Pagination";
import StatsSummary from "./StatsSummary";
import SuccessToast from "../SuccessToast/SuccessToast";
import useToast from "../../hooks/useToast";
import Spinner from "../Spinner/Spinner";
import { Trash2 } from "lucide-react";
import type {
  CombinedCatchStats,
  HistoryFetchParams,
} from "../../types/catchHistory";

type CatchHistoryTableProps = {
  fetchParams: HistoryFetchParams;
  setFetchParams: React.Dispatch<React.SetStateAction<HistoryFetchParams>>;
};

export default function CatchHistoryTable({
  fetchParams,
  setFetchParams,
}: CatchHistoryTableProps) {
  const { toast, showToast, hideToast } = useToast();
  const [stats, setStats] = useState<CombinedCatchStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCatchStats({ ...fetchParams })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Моля опитайте по-късно.");
        }

        return response.json();
      })
      .then((data) => setStats(data))
      .catch((error) => {
        console.error(error.message);
        showToast(true, error.message);
      })
      .finally(() => setLoading(false));

    return () => {
      new AbortController().abort();
    };
  }, [fetchParams]);

  const handleDeleteItem = (id: number) => {
    setLoading(true);
    deleteCatchStat(id)
      .then((response) => {
        if (response.status !== 200) throw new Error("Моля опитайте по-късно.");
        return response.json();
      })
      .then((data) => {
        setFetchParams((prev) => ({
          ...prev,
          page: 1,
        }));
        showToast(false, data.detail);
      })
      .catch((error) => {
        console.error(error.message);
        showToast(true, error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <SuccessToast
        error={toast.error}
        message={toast.message}
        trigger={toast.trigger}
        onClose={hideToast}
      />

      {loading && <Spinner />}

      {!loading && stats && (
        <>
          <StatsSummary
            yearlyStats={stats.yearlyStats}
            monthlyStats={stats.monthlyStats}
          />
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left" title="ГГГГ-ММ-ДД">
                    Дата
                  </th>
                  <th className="px-4 py-3 text-left">Град</th>
                  <th className="px-4 py-3 text-left">Риболовно Място</th>
                  <th className="px-4 py-3 text-left">Вид Риба</th>
                  <th className="px-4 py-3 text-right">Количество (кг)</th>
                  <th className="px-4 py-3 text-left">Примамка</th>
                  <th className="px-4 py-3 text-left">От час</th>
                  <th className="px-4 py-3 text-left">До час</th>
                  <th className="px-4 py-3 text-right">Късания</th>
                  <th className="px-4 py-3 text-center">Добро Време</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                {stats.results && stats.results.length > 0 ? (
                  stats.results.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 even:bg-gray-200"
                    >
                      <td className="px-4 py-2 align-middle">{item.date}</td>
                      <td className="px-4 py-2 align-middle">{item.city}</td>
                      <td className="px-4 py-2 align-middle">
                        {item.fishSpot}
                      </td>
                      <td className="px-4 py-2 align-middle">
                        {item.fishType}
                      </td>
                      <td className="px-4 py-2 text-right align-middle">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-2 align-middle">
                        {item.lureType}
                      </td>
                      <td className="px-4 py-2 align-middle">
                        {item.fromHour}
                      </td>
                      <td className="px-4 py-2 align-middle">{item.toHour}</td>
                      <td className="px-4 py-2 text-right align-middle">
                        {item.snaps}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        {item.goodWeather ? "✅" : "❌"}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-md p-1.5 flex items-center justify-center mx-auto"
                          title="Изтрий"
                        >
                          <Trash2 className="w-4 h-4 stroke-white" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center text-gray-500 py-4">
                      No catch history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            pagination={stats.pagination}
            onPageChange={(page: number) =>
              setFetchParams((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </>
      )}
    </>
  );
}
