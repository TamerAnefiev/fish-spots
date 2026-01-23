import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingDots from "./LoadingDots";

export default function AuthLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="bg-card w-full max-w-xs shadow-lg">
        <CardHeader className="flex flex-col items-center pb-2">
          <img
            src="/favicon.ico"
            alt="Logo"
            className="mb-4 h-16 w-16 scale-105 animate-pulse"
          />
          <CardTitle className="flex items-center text-xl font-semibold">
            Удостоверяване
            <LoadingDots />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-sm">
            Моля, изчакайте.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
