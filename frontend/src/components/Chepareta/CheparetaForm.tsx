import React, { useState } from "react";
import { baseUrl } from "../../util/constants";
import Spinner from "../Spinner/Spinner";
import FormError from "../FormError/FormError";
import type {
  ChepareCreation,
  ChepareSeller,
  ChepareType,
  ChepareTypes,
} from "../../types/chepare";

const initialFormData: ChepareCreation = {
  name: "",
  contact: "",
  images: [],
};

const chepareTypes: ChepareTypes[] = [
  { text: "Избери сафридени чепарета", chepareType: "safrid" },
  { text: "Избери карагьозени чепарета", chepareType: "karagioz" },
  { text: "Избери чернокопени чепарета", chepareType: "chernokop" },
  { text: "Избери паламудени чепарета", chepareType: "palamud" },
];

type CheparetaFormProps = {
  showForm: boolean;
  closeForm: () => void;
  addNewSellerHandler: (seller: ChepareSeller) => void;
};

export default function CheparetaForm({
  showForm,
  closeForm,
  addNewSellerHandler,
}: CheparetaFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ChepareCreation>(initialFormData);
  const [formErrors, setFormErrors] = useState([]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => {
      if (type !== "file") {
        return {
          ...prev,
          [name]: value,
        };
      }

      if (!files) return prev;

      return {
        ...prev,
        images: [
          ...prev.images,
          ...Array.from(files).map((image) => ({
            chepareType: name as ChepareType,
            image,
          })),
        ],
      };
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const buildFormData = new FormData();
    buildFormData.append("name", formData.name);
    buildFormData.append("contact", formData.contact);

    formData.images.forEach(({ chepareType, image }) => {
      buildFormData.append("chepareType", chepareType);
      buildFormData.append("image", image);
    });

    const options: RequestInit = {
      method: "POST",
      body: buildFormData,
      credentials: "include",
    };

    setIsLoading(true);
    fetch(`${baseUrl}/chepareta/create/`, options)
      .then((response) => {
        if (response.status === 400 || response.status === 401) {
          throw new Error("Unauthorized or server failed to save images.");
        }

        return response.json();
      })
      .then((data: ChepareSeller) => {
        addNewSellerHandler(data);
        resetForm();
        closeForm();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`max-w-lg mx-auto mb-10 p-4 rounded-xl flex-col items-center gap-4 bg-gradient-to-b from-slate-700 to-gray-900 ${
        showForm ? "flex" : "hidden"
      }`}
      encType="multipart/form-data"
    >
      <section className="w-10/12">
        <span className="text-white dark:font-medium">Име на продавача:</span>
        <input
          type="text"
          className="block w-full rounded p-1.5 text-stone-950 outline-none"
          name="name"
          maxLength={50}
          placeholder="Тамер.."
          value={formData.name}
          onChange={handleFieldChange}
        />
      </section>

      <section className="w-10/12">
        <span className="text-white dark:font-medium">Контакт:</span>
        <input
          type="text"
          className="block w-full rounded p-1.5 text-stone-950 outline-none"
          name="contact"
          maxLength={50}
          placeholder="088.."
          value={formData.contact}
          onChange={handleFieldChange}
        />
      </section>

      {chepareTypes.map((chepare) => (
        <section key={chepare.text}>
          <span className="text-white">{chepare.text}</span>
          <input
            className="block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name={chepare.chepareType}
            accept=".jpg, .jpeg, .png, .webp"
            onChange={handleFieldChange}
            multiple
          />
        </section>
      ))}

      {isLoading && <Spinner />}

      <div className="text-center mt-4">
        <button className="px-4 py-2 text-black font-medium rounded-lg bg-gradient-to-r from-green-200 via-green-400 to-green-500 hover:from-green-300 hover:via-green-500 hover:to-green-600">
          Create!
        </button>
      </div>

      {formErrors.length > 0 && (
        <div className="flex flex-col gap-2 text-lg">
          {formErrors.map((error, i) => (
            <FormError key={`${error}${i}`} msg={error} />
          ))}
        </div>
      )}
    </form>
  );
}
