import { useState } from 'react';
import { createCatchStats } from './services';
import Spinner from '../Spinner/Spinner';
import SuccessToast from '../SuccessToast/SuccessToast';
import useToast from '../../hooks/useToast';

export default function CatchHistoryForm({ showForm, onSuccess, closeForm }) {
    const { toast, showToast, hideToast } = useToast();

    const [formData, setFormData] = useState({
        date: '',
        city: '',
        fish_spot: '',
        fish_type: '',
        quantity: '',
        lure_type: '',
        from_hour: '',
        to_hour: '',
        snaps: '',
        good_weather: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            quantity: parseFloat(formData.quantity),
            snaps: parseInt(formData.snaps, 10),
            good_weather: !!formData.good_weather,
        };

        createCatchStats(payload)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(() => {
                        throw new Error('Failed to create catch history.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    date: '',
                    city: '',
                    fish_spot: '',
                    fish_type: '',
                    quantity: '',
                    lure_type: '',
                    from_hour: '',
                    to_hour: '',
                    snaps: '',
                    good_weather: false,
                });
                showToast(false, 'Успешно създадохте запис!');
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
                    showForm ? 'block' : 'hidden'
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
                    <label
                        className="block font-semibold mb-1"
                        htmlFor="fish_spot"
                    >
                        Рибно място
                    </label>
                    <input
                        type="text"
                        id="fish_spot"
                        name="fish_spot"
                        value={formData.fish_spot}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label
                        className="block font-semibold mb-1"
                        htmlFor="fish_type"
                    >
                        Вид риба
                    </label>
                    <input
                        type="text"
                        id="fish_type"
                        name="fish_type"
                        value={formData.fish_type}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label
                        className="block font-semibold mb-1"
                        htmlFor="quantity"
                    >
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
                    <label
                        className="block font-semibold mb-1"
                        htmlFor="lure_type"
                    >
                        Вид примамка
                    </label>
                    <input
                        type="text"
                        id="lure_type"
                        name="lure_type"
                        value={formData.lure_type}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label
                            className="block font-semibold mb-1"
                            htmlFor="from_hour"
                        >
                            От час
                        </label>
                        <input
                            type="time"
                            id="from_hour"
                            name="from_hour"
                            value={formData.from_hour}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div className="flex-1">
                        <label
                            className="block font-semibold mb-1"
                            htmlFor="to_hour"
                        >
                            До час
                        </label>
                        <input
                            type="time"
                            id="to_hour"
                            name="to_hour"
                            value={formData.to_hour}
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
                        id="good_weather"
                        name="good_weather"
                        checked={formData.good_weather}
                        onChange={handleChange}
                        className="rounded"
                    />
                    <label htmlFor="good_weather" className="font-semibold">
                        Добро време
                    </label>
                </div>

                <section className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Запис...' : 'Запази'}
                    </button>
                </section>
                {loading && <Spinner />}
            </form>
        </>
    );
}
