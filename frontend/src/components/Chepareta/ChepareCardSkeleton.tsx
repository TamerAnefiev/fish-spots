import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChepareCardSkeleton() {
  return (
    <Card className="bg-muted/50 border-none shadow-xl">
      <CardHeader className="flex flex-row items-center justify-center gap-2">
        <Skeleton className="bg-muted-foreground/20 mb-0 h-4 w-4 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="mx-auto h-4 w-4/5" />
        <Skeleton className="mx-auto h-4 w-2/4" />
      </CardContent>
    </Card>
  );
}
