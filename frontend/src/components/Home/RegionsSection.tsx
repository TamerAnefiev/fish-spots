import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RegionCardSkeleton } from "./RegionCardSkeleton";
import { RegionsList } from "./RegionsList";

export default function RegionsSection() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-destructive mb-2 text-2xl font-bold">
            Възникна грешка при зареждането на регионите
          </h2>
          <Button
            onClick={resetErrorBoundary}
            variant="outline"
            className="border-cyan-600 text-cyan-600"
          >
            Опитайте отново
          </Button>
        </div>
      )}
    >
      <Suspense
        fallback={
          <div className="flex w-full flex-wrap justify-center gap-12 py-16">
            <RegionCardSkeleton />
            <RegionCardSkeleton />
          </div>
        }
      >
        <RegionsList />
      </Suspense>
    </ErrorBoundary>
  );
}
