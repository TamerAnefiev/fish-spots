import Spinner from "@/components/Spinner/Spinner";

type DeleteAskerProps = {
  isOpen: boolean;
  deleteOnAgree: () => void;
  isLoading: boolean;
  closeModal: () => void;
};

export default function DeleteAsker({
  isOpen,
  deleteOnAgree,
  isLoading,
  closeModal,
}: DeleteAskerProps) {
  return (
    <article
      className={`fixed inset-0 flex justify-center items-center transition-colors
                ${isOpen ? "visible bg-black/[.50]" : "invisible"}
            `}
      onClick={closeModal}
    >
      <div
        className={`bg-cyan-800 max-w-xs break-words p-4 rounded text-white transition-all ease-linear duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <section className="text-2xl text-center">
          <h3 className="mb-4 font-bold">ИЗТРИВАНЕ</h3>
          <p>Сигурен ли си ,че искаш да изтриеш?</p>
        </section>

        <section className="flex justify-center flex-wrap items-center gap-8 py-6 text-white font-medium text-3xl">
          <button
            className="bg-red-800 py-2 px-4 rounded-xl hover:bg-red-900"
            onClick={deleteOnAgree}
          >
            Да!
          </button>

          <button
            className="bg-green-700 py-2 px-4 rounded-xl hover:bg-green-800"
            onClick={closeModal}
          >
            Затвори
          </button>
        </section>

        {isLoading && <Spinner />}
      </div>
    </article>
  );
}
