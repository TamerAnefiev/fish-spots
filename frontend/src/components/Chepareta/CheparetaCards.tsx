import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChepareCardSkeleton } from "./ChepareCardSkeleton";
import { CheparetaList } from "./CheparetaList";

export default function CheparetaCards() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="text-destructive mb-2 text-2xl font-bold">
            Възникна грешка при зареждането на майсторите
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
          <div className="grid grid-cols-4 gap-4 rounded-xl px-4 py-6 max-[1000px]:grid-cols-3 max-[460px]:grid-cols-1 max-md:grid-cols-2">
            <ChepareCardSkeleton />
            <ChepareCardSkeleton />
            <ChepareCardSkeleton />
          </div>
        }
      >
        <CheparetaList />
      </Suspense>
    </ErrorBoundary>
  );
}
