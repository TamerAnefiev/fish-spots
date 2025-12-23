const dotAnimationDelays = ["0s", "0.13s", "0.23s"];

export default function LoadingDots() {
  return (
    <span className="ml-2 flex space-x-1">
      {dotAnimationDelays.map((value) => (
        <span
          key={value}
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: value }}
        ></span>
      ))}
    </span>
  );
}
