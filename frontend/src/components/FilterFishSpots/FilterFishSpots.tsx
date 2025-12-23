type FilterFishSpotsProps = {
  filterFishSpots: (value: string) => void;
};

export default function FilterFishSpots({
  filterFishSpots,
}: FilterFishSpotsProps) {
  return (
    <section className="max-w-lg mx-auto mb-6">
      <input
        className="w-full p-2 rounded-lg outline-none"
        type="text"
        placeholder="Потърси място..."
        onChange={(e) => {
          filterFishSpots(e.target.value);
        }}
      />
    </section>
  );
}
