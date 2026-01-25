import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCarouselCounter } from "@/hooks/use-carousel-counter";
import type { ChepareType } from "@/types/chepare";
import { latinToBgChepareType } from "@/util/constants";
import { cn } from "@/lib/utils";

type CarouselRowProps = {
  images: string[];
  currentChepareType: ChepareType;
};

export function CarouselRow({ images, currentChepareType }: CarouselRowProps) {
  const { current, count, isScrollable, setApi } = useCarouselCounter();

  return (
    <div className="mx-auto w-full max-w-4xl px-8">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => {
            const isActive = index === current - 1;

            return (
              <CarouselItem key={img} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className={cn(
                          "cursor-pointer overflow-hidden border-0 shadow-sm transition-all duration-300 ease-in-out",
                          !isScrollable
                            ? "scale-100 opacity-100"
                            : isActive
                              ? "ring-primary scale-100 opacity-100 ring-1 ring-offset-2"
                              : "scale-95 opacity-50 hover:opacity-100",
                        )}
                      >
                        <div className="relative aspect-square overflow-hidden rounded-md">
                          <img
                            src={img}
                            alt={`Снимка на чепаре за ${latinToBgChepareType[currentChepareType]}`}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-4xl p-0 [&>button]:hidden"
                      aria-describedby={undefined}
                    >
                      <DialogTitle className="sr-only">
                        Преглед на снимка
                      </DialogTitle>
                      <div className="relative h-[80vh] w-full">
                        <DialogClose className="bg-card-foreground text-card absolute top-4 right-4 z-50 rounded-full p-2 transition-colors">
                          <X className="size-5" />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                        <img
                          src={img}
                          alt={`Снимка на чепаре за ${latinToBgChepareType[currentChepareType]}`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {isScrollable && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
      {isScrollable && (
        <div className="text-muted-foreground py-2 text-center text-sm">
          Снимка {current} от {count}
        </div>
      )}
    </div>
  );
}
