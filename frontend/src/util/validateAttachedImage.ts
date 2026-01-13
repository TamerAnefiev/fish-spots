import {
  ALLOWED_IMG_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
} from "./constants";

type ImageValidationResult = {
  hasErrors: boolean;
  errors: string[];
  validFiles: File[];
};

export function validateAttachedImages(files: FileList): ImageValidationResult {
  const incomingFiles = Array.from(files);
  const validFiles: File[] = [];
  const errors: string[] = [];

  incomingFiles.forEach((file) => {
    const invalidFormat = !ALLOWED_IMG_TYPES.includes(file.type);
    const fileTooBig = file.size > MAX_FILE_SIZE;
    const fullyInvalid = invalidFormat && fileTooBig;

    if (fullyInvalid) {
      errors.push(
        `${file.name} е с невалиден формат и е твърде голям (макс. ${MAX_FILE_SIZE_MB}MB).`,
      );
      return;
    }

    if (invalidFormat) {
      errors.push(`${file.name} е с невалиден формат.`);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name} е твърде голям (макс. ${MAX_FILE_SIZE_MB}MB).`);
      return;
    }

    validFiles.push(file);
  });

  return {
    hasErrors: errors.length > 0,
    errors,
    validFiles,
  };
}
