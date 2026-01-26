import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <main className="container mx-auto p-6">
      <Card className="mx-auto max-w-4xl">
        <CardHeader className="space-y-4">
          <Skeleton className="mx-auto h-8 w-1/2" />
          <Skeleton className="mx-auto h-4 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-100 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
