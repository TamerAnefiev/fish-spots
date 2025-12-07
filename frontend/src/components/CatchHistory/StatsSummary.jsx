export default function StatsSummary({ yearlyStats, monthlyStats }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Обобщена статистика
            </h2>

            <p className="text-gray-700 mb-2">
                <span className="font-medium">Година {yearlyStats.year}:</span>{' '}
                Хванати{' '}
                <span className="font-semibold">
                    {yearlyStats.total_catch ?? 0} кг
                </span>{' '}
                риба,{' '}
                <span className="font-semibold">
                    {yearlyStats.total_snaps ?? 0}
                </span>{' '}
                късания.
            </p>

            <p className="text-gray-700">
                <span className="font-medium">
                    Месец {monthlyStats.month_name_bg}:
                </span>{' '}
                Хванати{' '}
                <span className="font-semibold">
                    {monthlyStats.total_catch ?? 0} кг
                </span>{' '}
                риба,{' '}
                <span className="font-semibold">
                    {monthlyStats.total_snaps ?? 0}
                </span>{' '}
                късания.
            </p>
        </div>
    );
}
