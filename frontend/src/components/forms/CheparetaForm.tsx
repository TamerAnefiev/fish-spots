import React, { useEffect, useState } from "react";
import { Asterisk, X } from "lucide-react";
import { MAX_FILE_SIZE_MB } from "@/util/constants";
import { validateAttachedImages } from "@/util/validateAttachedImage";
import type {
  ChepareCreation,
  ChepareType,
  ChepareTypes,
} from "@/types/chepare";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

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
  onDirtyChange: (isDirty: boolean) => void;
  onSubmit: (data: ChepareCreation) => void;
  isPending: boolean;
};

export default function CheparetaForm({
  onDirtyChange,
  onSubmit,
  isPending,
}: CheparetaFormProps) {
  const [formData, setFormData] = useState<ChepareCreation>(initialFormData);
  const isInvalid =
    formData.name.trim() === "" ||
    formData.contact.trim() === "" ||
    formData.images.length === 0;

  useEffect(() => {
    const dirty =
      formData.name.trim() !== "" ||
      formData.contact.trim() !== "" ||
      formData.images.length > 0;
    onDirtyChange(dirty);

    return () => onDirtyChange(false);
  }, [formData, onDirtyChange]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    const { hasErrors, errors, validFiles } = validateAttachedImages(files);
    if (hasErrors) {
      errors.forEach((error) => {
        toast.error(error);
      });
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        ...validFiles.map((image) => ({
          chepareType: name as ChepareType,
          image,
        })),
      ],
    }));
  };

  const clearCategory = (type: ChepareType) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.chepareType !== type),
    }));

    const element = document.getElementById(type) as HTMLInputElement;
    if (element) {
      element.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
      <section className="mb-2">
        <Label htmlFor="name" className="relative">
          Име на продавача
          <Asterisk
            size={12}
            className="absolute -top-0.5 -right-3"
            color="#cc0000"
          />
        </Label>
        <Input
          id="name"
          type="text"
          name="name"
          maxLength={50}
          placeholder="Име"
          value={formData.name}
          onChange={handleTextFieldChange}
        />
      </section>

      <section className="mb-2">
        <Label className="relative" htmlFor="contact">
          Контакт
          <Asterisk
            size={12}
            className="absolute -top-0.5 -right-3"
            color="#cc0000"
          />
        </Label>
        <Input
          id="contact"
          type="text"
          name="contact"
          maxLength={50}
          placeholder="Тел. номер"
          value={formData.contact}
          onChange={handleTextFieldChange}
        />
      </section>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {chepareTypes.map((chepare) => {
          const selectedImages = formData.images.filter(
            (img) => img.chepareType === chepare.chepareType,
          );
          const selectedImagesCount = selectedImages.length;

          return (
            <section key={chepare.text} className="mb-1">
              <Label htmlFor={chepare.chepareType}>{chepare.text}</Label>
              <div className="relative flex items-center">
                <Input
                  id={chepare.chepareType}
                  type="file"
                  name={chepare.chepareType}
                  className="bg-background hover:bg-accent cursor-pointer transition-colors file:font-medium file:text-blue-600"
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleFileChange}
                  multiple
                />
                {selectedImagesCount > 0 && (
                  <div className="absolute inset-y-0 right-0">
                    <div className="bg-background flex h-full items-center rounded-r-md border-t border-r border-b border-l">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        onClick={() =>
                          clearCategory(chepare.chepareType as ChepareType)
                        }
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <p className="text-muted-foreground text-center text-[10px] tracking-wider uppercase">
        Качете мин. 1 снимка (JPG, PNG, WEBP) до {MAX_FILE_SIZE_MB} МБ
      </p>

      <div className="mt-4 text-center">
        <Button disabled={isInvalid || isPending} size="lg">
          {isPending ? (
            <>
              Добавяне..
              <Spinner />
            </>
          ) : (
            "Добави"
          )}
        </Button>
      </div>
    </form>
  );
}
