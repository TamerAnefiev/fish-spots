import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RegionCardProps = {
  name: string;
  features: readonly string[];
};

export default function RegionCard({ name, features }: RegionCardProps) {
  return (
    <Card className="bg-muted/50 w-87.5 overflow-hidden border-none shadow-xl hover:shadow-lg">
      <CardHeader className="relative pb-8">
        <CardTitle className="text-center text-2xl font-bold">
          {name}
          <div className="absolute top-[65%] left-1/2 h-0.5 w-16 -translate-x-1/2 bg-cyan-600" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center justify-between text-xl"
            >
              <span>{feature}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Check className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
