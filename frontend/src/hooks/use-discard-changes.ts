import { useCallback, useState } from "react";

export function useDiscardChanges(onClose: (open: boolean) => void) {
  const [isDirty, setIsDirty] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAttempt = useCallback(
    (e?: Event) => {
      if (isDirty) {
        if (e) e.preventDefault();
        setShowAlert(true);
      } else {
        onClose(false);
      }
    },
    [isDirty, onClose],
  );

  const confirmExit = useCallback(() => {
    setIsDirty(false);
    setShowAlert(false);
    onClose(false);
  }, [onClose]);

  return {
    isDirty,
    setIsDirty,
    showAlert,
    setShowAlert,
    handleCloseAttempt,
    confirmExit,
  };
}
