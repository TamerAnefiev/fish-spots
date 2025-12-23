import { useEffect, useState } from "react";

type SuccessToastProps = {
  error: boolean;
  message: string;
  trigger: number;
  onClose: () => void;
};

const SuccessToast = ({
  error,
  message,
  trigger,
  onClose,
}: SuccessToastProps) => {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (trigger) {
      setVisible(true); // subject to change. I am going to use ready for use toast anyway.
      setAnimatingOut(false);
      setProgress(100);

      const duration = 5000; // 5 seconds
      const intervalTime = 50;
      const steps = duration / intervalTime;
      const decrement = 100 / steps;

      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - decrement, 0));
      }, intervalTime);

      const timeout = setTimeout(() => {
        setAnimatingOut(true);
        setTimeout(() => {
          setVisible(false);
          onClose();
        }, 300); // animation duration
      }, duration);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 w-72 px-4 py-3 ${
        error ? "bg-red-500" : "bg-green-500"
      } text-white rounded shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          animatingOut
            ? "translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
    >
      <div className="font-semibold">{message}</div>
      <div className="mt-2 h-1 bg-green-700 rounded overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-50"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SuccessToast;
