export default function FilterFishSpots ({ filterFishSpots }) {

    return (
        <section className="max-w-lg mx-auto mb-6">
            <input 
                className="w-full p-2 rounded-lg outline-none"
                type="text"
                placeholder="Потърси място..."
                onChange={(e) => {filterFishSpots(e.target.value)}}
            />         
        </section>
    );
}