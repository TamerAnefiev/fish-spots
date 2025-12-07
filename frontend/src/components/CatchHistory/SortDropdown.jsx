export default function SortDropdown({ ordering, setOrdering }) {
    const sortOptions = [
        { value: '-date', label: ' най-нови' },
        { value: 'date', label: 'Първо най-стари' },
        { value: '-quantity', label: 'Повече риба (кг)' },
        { value: 'quantity', label: 'По-малко риба (кг)' },
        { value: '-snaps', label: 'Повече късания' },
        { value: 'snaps', label: 'По-малко късания' },
    ];

    return (
        <div className="mb-4 px-4 flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Сортирай по:
            </label>
            <select
                id="sort"
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
