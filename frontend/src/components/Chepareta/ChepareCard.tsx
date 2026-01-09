import { useState } from "react";
import { Link } from "react-router-dom";
import { FishingHook, Trash2, UserRound, Image } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type {
  ChepareSeller,
  ChepareType,
  DeleteResponse,
} from "@/types/chepare";
import { latinToBgChepareType } from "@/util/constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertOnOperation } from "@/components/dialogs/AlertOnOperation";
import { useCheparetaMutations } from "@/hooks/use-chepareta-mutations";
import { toast } from "sonner";

type ChepareCardProps = {
  seller: ChepareSeller;
};

export function ChepareCard({ seller }: ChepareCardProps) {
  const { user } = useAuth();
  const { deleteSeller } = useCheparetaMutations();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDeleteSeller = (sellerId: number) => {
    deleteSeller.mutate(sellerId, {
      onSuccess: (data: DeleteResponse) => {
        toast.success(data.detail);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Card className="bg-card/75 flex h-full flex-col overflow-hidden border-none shadow-md shadow-black">
      <CardHeader className="flex p-3 text-center">
        <CardTitle className="flex items-center justify-center gap-1 text-lg font-medium">
          <UserRound size={12} />
          <h4>{seller.name}</h4>
        </CardTitle>
      </CardHeader>

      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform hover:scale-105"
          src={seller.thumbnail}
          alt={`Чепаре от ${seller.name}`}
          loading="lazy"
        />
      </div>

      <CardContent className="flex-1 p-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground flex items-center gap-1 text-xs font-semibold tracking-wider uppercase">
            <FishingHook size={16} color="#0a74ff" />
            Чепарета за:
          </span>

          <div className="flex flex-wrap justify-center gap-1">
            {Object.entries(seller.images).map(([chepareType, images]) => (
              <Tooltip key={chepareType}>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="relative overflow-hidden bg-cyan-100 text-cyan-900 hover:bg-cyan-100"
                  >
                    <div className="animate-shimmer absolute inset-0 inline-block -translate-x-full bg-[linear-gradient(105deg,transparent_25%,rgba(192,192,192,0.6)_40%,transparent_25%)]" />
                    <span className="relative z-10">
                      {latinToBgChepareType[chepareType as ChepareType]}
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="flex items-center gap-1">
                    <Image size={16} color="#0a74ff" />
                    <span className="font-medium">{images.length} Снимки</span>
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-1 px-4 pt-0 pb-4">
        <Button asChild>
          <Link
            to={`/chepareta/${seller.name.replace(/\s+/g, "-").toLowerCase()}`}
          >
            Детайли
          </Link>
        </Button>
        {user?.isAdmin && (
          <AlertOnOperation
            description={`Изтривайки ${seller.name}, също така ще се изтрият и ${seller.imagesCount} снимки/а.`}
            cancelBtnText="Откажи"
            confirmBtnText="Изтрий"
            open={isAlertOpen}
            onOpenChange={setIsAlertOpen}
            onConfirmExit={() => handleDeleteSeller(seller.id)}
          >
            <Button size="icon" variant="destructive">
              <Trash2 />
            </Button>
          </AlertOnOperation>
        )}
      </CardFooter>
    </Card>
  );
}
