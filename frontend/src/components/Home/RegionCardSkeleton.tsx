import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type RegionCardSkeletonProps = {
  rows?: number;
};

export function RegionCardSkeleton({ rows = 3 }: RegionCardSkeletonProps) {
  return (
    <div className="py-16">
      <div className="flex w-full flex-wrap justify-center gap-12">
        <Card className="bg-muted/50 w-87.5 border-none shadow-xl">
          <CardHeader className="flex flex-col items-center pb-8">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="bg-muted-foreground/20 h-0.5 w-16" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
