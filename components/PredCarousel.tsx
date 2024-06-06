import { ImageUpIcon, ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import CarouselItemContent from "@/components/CarouselItemContent";
import { Button } from "@/components/ui/button";
import { FormDataType } from "@/lib/definitions";
import { Suspense } from "react";

type PredCarouselProps = {
  response: Promise<FormDataType[]> | FormDataType[];
};

const PredCarousel: React.FC<PredCarouselProps> = ({ response }) => {
  if (response instanceof Promise) {
    return (
      <Suspense
        fallback={
          <Card className="mt-4">
            <CardContent className="flex flex-col sm:flex-row justify-around items-center">
              <Loader2Icon size={48} className="mt-4 animate-spin" />
              <p className="mt-4">Loading results...</p>
            </CardContent>
          </Card>
        }
      >
        <ResolvedPredCarousel response={response} />
      </Suspense>
    );
  }

  return <ResolvedPredCarousel response={response} />;
};

const ResolvedPredCarousel: React.FC<PredCarouselProps> = ({ response }) => {
  if (!response || (Array.isArray(response) && response.length === 0)) {
    return (
      <Card className="mt-4">
        <CardContent className="flex flex-col sm:flex-row justify-around items-center">
          <ImageUpIcon size={48} className="mt-4" />
          <p className="mt-4">Upload Image from above to see results.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Carousel className="mt-4">
      <CarouselPrevious>
        <Button className="p-4 bg-gray-100 rounded-full">
          <ArrowLeftIcon size={24} />
        </Button>
      </CarouselPrevious>
      <CarouselContent className="flex flex-row">
        {response instanceof Array && response.map((item: FormDataType, index: number) => {
          return (
            <CarouselItem key={item?.data?.name || index}>
              <Card className="flex justify-around">
                <CarouselItemContent item={item} />
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext>
        <Button className="p-4 bg-gray-100 rounded-full">
          <ArrowRightIcon size={24} />
        </Button>
      </CarouselNext>
    </Carousel>
  );
};

export default PredCarousel;
