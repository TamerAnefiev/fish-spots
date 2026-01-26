import axios from "axios";
import { ArrowLeft, ImageIcon, Phone, User } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CarouselRow } from "./carousel-row";
import type { ChepareSeller, ChepareType } from "@/types/chepare";
import { DOMAIN, latinToBgChepareType } from "@/util/constants";
import { cheparetaKeys } from "@/lib/query-keys";
import api from "@/lib/api";
import { useDocumentTitleChange } from "@/hooks/use-document-title-change";

const fetchSellerDetails = async (slug: string): Promise<ChepareSeller> => {
  try {
    const { data } = await api.get<ChepareSeller>(
      `/chepareta/details/${slug}/`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) throw new Error("NOT_FOUND");
    }
    throw new Error("SERVER_ERROR");
  }
};

export function SellerData() {
  const { sellerSlug } = useParams();
  if (!sellerSlug) throw new Error("NOT_FOUND");

  const navigate = useNavigate();

  const { data } = useSuspenseQuery({
    queryKey: cheparetaKeys.sellerDetails(sellerSlug),
    queryFn: () => fetchSellerDetails(sellerSlug),
  });

  const fullName = `${data.firstName} ${data.lastName}`;
  const fishTypes = Object.keys(data.images || {})
    .map((type) => latinToBgChepareType[type as ChepareType])
    .filter(Boolean)
    .join(", ");
  const metaDescription = `Ръчно изработени чепарета от ${fullName}. Вижте модели за ${fishTypes}. Директна поръчка на ${data.contact}!`;
  useDocumentTitleChange(`Чепарета от ${fullName} | ${DOMAIN}`);

  return (
    <>
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Майсторски чепарета: ${fullName}`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={data.thumbnail} />

      <main className="container mx-auto px-4 py-10">
        <Card className="mx-auto max-w-5xl shadow-lg">
          <CardHeader className="relative pb-8 text-center">
            <div className="mb-4 grid grid-cols-3 items-center">
              <div className="text-left">
                <Button
                  variant={"secondary"}
                  onClick={() => navigate("/chepareta")}
                >
                  <ArrowLeft />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-secondary flex size-12 items-center justify-center rounded-full">
                  <User className="size-8" />
                </div>
              </div>
              <div className="invisible" aria-hidden="true" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-wide uppercase">
              {fullName}
            </CardTitle>
            <CardDescription className="text-lg">
              Разгледайте галерията с чепарета
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-12">
            {Object.entries(data.images || {}).map(([type, images]) => {
              const currentType = type as ChepareType;
              if (images.length === 0) return null;

              return (
                <div key={currentType} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <Badge
                      variant="outline"
                      className="border-cyan-600 bg-cyan-50 px-4 py-1 text-lg text-cyan-700"
                    >
                      {latinToBgChepareType[currentType] ?? currentType}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-slate-400">
                      <ImageIcon className="h-4 w-4" /> {images.length} снимки
                    </span>
                  </div>

                  <CarouselRow
                    images={images}
                    currentChepareType={currentType}
                  />
                  <Separator className="my-6" />
                </div>
              );
            })}
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center rounded-b-xl py-8">
            <h3 className="mb-2 text-sm font-semibold tracking-wider uppercase">
              Контакти за поръчка
            </h3>
            <div className="flex items-center gap-3 text-2xl font-bold">
              <Phone className="h-6 w-6 text-cyan-600" />
              <a
                href={`tel:${data.contact}`}
                className="transition-colors hover:text-cyan-600"
              >
                {data.contact}
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
