import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { LoadingSkeleton } from "@/components/Chepareta/chepare-details/loading-skeleton";
import NotFound from "./NotFound";
import { SellerData } from "@/components/Chepareta/chepare-details/seller-data";
import { Button } from "@/components/ui/button";

export default function CheparetaDetails() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (error.message === "NOT_FOUND") {
          return <NotFound />;
        }

        return (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-destructive mb-2 text-2xl font-bold">
              Възникна грешка при зареждането на детайлите
            </h2>
            <Button
              onClick={resetErrorBoundary}
              variant="outline"
              className="border-cyan-600 text-cyan-600"
            >
              Опитайте отново
            </Button>
          </div>
        );
      }}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <SellerData />
      </Suspense>
    </ErrorBoundary>
  );
}
