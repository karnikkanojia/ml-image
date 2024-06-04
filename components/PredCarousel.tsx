import { ImageUpIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
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

type PredCarouselProps = {
  response: FormDataType[];
};

const PredCarousel: React.FC<PredCarouselProps> = ({ response }) => {

  if (!response || response.length === 0) {
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
        {response.map((item, index) => {
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
