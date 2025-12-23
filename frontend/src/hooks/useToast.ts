import { useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState({
    error: false,
    message: "",
    trigger: 0,
  });

  const showToast = (isError: boolean, message = "") => {
    setToast({
      error: isError,
      message,
      trigger: Date.now(), // unique value to re-trigger effect
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, error: false, trigger: 0 }));
  };

  return { toast, showToast, hideToast };
}
