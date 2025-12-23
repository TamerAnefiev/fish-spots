import { useState, useEffect } from "react";
import { fetchOldestCatchYear } from "./services";

const months = [
  { value: 1, name: "Януари" },
  { value: 2, name: "Февруари" },
  { value: 3, name: "Март" },
  { value: 4, name: "Април" },
  { value: 5, name: "Май" },
  { value: 6, name: "Юни" },
  { value: 7, name: "Юли" },
  { value: 8, name: "Август" },
  { value: 9, name: "Септември" },
  { value: 10, name: "Октомври" },
  { value: 11, name: "Ноември" },
  { value: 12, name: "Декември" },
];

const pageSizes = [10, 20, 50];

const now = new Date();

type FiltersProps = {
  selectedYear: number;
  selectedMonth: number;
  currentPageSize: number;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  onChangePageSize: (pageSize: number) => void;
};

export default function Filters({
  selectedYear,
  selectedMonth,
  currentPageSize,
  onChangeYear,
  onChangeMonth,
  onChangePageSize,
}: FiltersProps) {
  const [oldestYear, setOldestYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOldestCatchYear()
      .then((response) => {
        if (response.status !== 200) return;
        return response.json();
      })
      .then((data) => {
        setOldestYear(data.oldestYear);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Generate years array from oldestYear to currentYear (descending)
  const years = [];
  for (let y = now.getFullYear(); y >= oldestYear; y--) {
    years.push(y);
  }

  return (
    <>
      <div className="mb-4 px-4">
        <p className="text-gray-600 italic text-sm">
          Използвайте филтрите по-долу, за да изберете година и месец за
          показване на данните.
        </p>
      </div>
      <div className="flex space-x-4 mb-6 px-4 items-center">
        {!loading && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Година
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={selectedYear}
              onChange={(e) => onChangeYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Месец
          </label>
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={selectedMonth}
            onChange={(e) => onChangeMonth(parseInt(e.target.value))}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Резултати на страница
          </label>
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={currentPageSize}
            onChange={(e) => onChangePageSize(parseInt(e.target.value))}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
