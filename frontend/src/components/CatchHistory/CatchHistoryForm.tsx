import React, { useState } from "react";
import { createCatchStats } from "./services";
import Spinner from "@/components/Spinner/Spinner";
import SuccessToast from "@/components/SuccessToast/SuccessToast";
import useToast from "@/hooks/useToast";
import type { CatchHistory } from "@/types/catchHistory";

type CatchHistoryFormProps = {
  showForm: boolean;
  onSuccess: () => void;
  closeForm: () => void;
};

const INITIAL_FORM_DATA: Omit<CatchHistory, "id"> = {
  date: "",
  city: "",
  fishSpot: "",
  fishType: "",
  quantity: 0,
  lureType: "",
  fromHour: "",
  toHour: "",
  snaps: 0,
  goodWeather: false,
};

export default function CatchHistoryForm({
  showForm,
  onSuccess,
  closeForm,
}: CatchHistoryFormProps) {
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] =
    useState<Omit<CatchHistory, "id">>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      good_weather: !!formData.goodWeather,
    };

    createCatchStats(payload)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(() => {
            throw new Error("Failed to create catch history.");
          });
        }
        return response.json();
      })
      .then(() => {
        setFormData(INITIAL_FORM_DATA);
        showToast(false, "Успешно създадохте запис!");
        closeForm();
        onSuccess();
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

      <form
        onSubmit={handleSubmit}
        className={`space-y-4 max-w-md mx-auto p-4 border rounded-md ${
          showForm ? "block" : "hidden"
        }`}
      >
        <div>
          <label className="block font-semibold mb-1" htmlFor="date">
            Дата
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="city">
            Град
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="fishSpot">
            Рибно място
          </label>
          <input
            type="text"
            id="fishSpot"
            name="fishSpot"
            value={formData.fishSpot}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="fishType">
            Вид риба
          </label>
          <input
            type="text"
            id="fishType"
            name="fishType"
            value={formData.fishType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="quantity">
            Количество (кг)
          </label>
          <input
            type="number"
            step="0.01"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="lureType">
            Вид примамка
          </label>
          <input
            type="text"
            id="lureType"
            name="lureType"
            value={formData.lureType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="fromHour">
              От час
            </label>
            <input
              type="time"
              id="fromHour"
              name="fromHour"
              value={formData.fromHour}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1" htmlFor="toHour">
              До час
            </label>
            <input
              type="time"
              id="toHour"
              name="toHour"
              value={formData.toHour}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="snaps">
            Късания
          </label>
          <input
            type="number"
            id="snaps"
            name="snaps"
            value={formData.snaps}
            onChange={handleChange}
            min="0"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="goodWeather"
            name="goodWeather"
            checked={formData.goodWeather}
            onChange={handleChange}
            className="rounded"
          />
          <label htmlFor="goodWeather" className="font-semibold">
            Добро време
          </label>
        </div>

        <section className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Запис..." : "Запази"}
          </button>
        </section>
        {loading && <Spinner />}
      </form>
    </>
  );
}
