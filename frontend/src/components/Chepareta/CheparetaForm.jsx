import { useState } from "react";
import { baseUrl } from "../../util/constants";
import Spinner from "../Spinner/Spinner.jsx";
import FormError from "../FormError/FormError.jsx";

const initialFormData = {
  name: "",
  contact: "",
  imagesData: [],
};

const chepareTypes = [
  { text: "Избери сафридени чепарета", elementName: "safrid" },
  { text: "Избери карагьозени чепарета", elementName: "karagioz" },
  { text: "Избери чернокопени чепарета", elementName: "chernokop" },
  { text: "Избери паламудени чепарета", elementName: "palamud" },
];

export default function CheparetaForm({
  showForm,
  closeForm,
  addNewSellerHandler,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState([]);

  const handleFieldChange = (e) => {
    const { name, value, type } = e.target;
    if (type !== "file") {
      setFormData((oldFormData) => {
        return {
          ...oldFormData,
          [name]: value,
        };
      });
    } else if (type === "file") {
      setFormData((oldFormData) => {
        return {
          ...oldFormData,
          imagesData: [
            ...oldFormData.imagesData,
            ...Array.from(e.target.files).map((image) => ({
              chepare_type: name,
              image,
            })),
          ],
        };
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const buildFormData = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "imagesData") {
          formData[key].forEach((imageData) => {
            for (const imageKey in imageData) {
              if (imageData.hasOwnProperty(imageKey)) {
                buildFormData.append(imageKey, imageData[imageKey]);
              }
            }
          });
        } else {
          buildFormData.append(key, formData[key]);
        }
      }
    }

    const options = {
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
      .then((data) => {
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
          maxLength="50"
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
          maxLength="50"
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
            name={chepare.elementName}
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
