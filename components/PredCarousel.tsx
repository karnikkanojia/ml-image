import {
  ImageUpIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCustom as CarouselNext,
  CarouselPreviousCustom as CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import CarouselItemContent from "@/components/CarouselItemContent"
import { useOnborda } from "onborda";
import { FormDataType } from "@/lib/definitions";

type PredCarouselProps = {
  response: FormDataType[];
};

const PredCarousel: React.FC<PredCarouselProps> = ({ response }) => {
  const { isOnbordaVisible } = useOnborda();

  if (isOnbordaVisible) {
    return (
      <Carousel className="w-10/12 mx-auto min-w-fit">
        <CarouselContent className="flex flex-row">
          <CarouselItem id="pred-carousel">
            <Card className="w-full">
              <CarouselItemContent item={undefined} demo={true} />
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );
  }

  if (!response || (!response[0]?.data && !response[0]?.error)) {
    return (
      <div className="grid place-items-center">
        <ImageUpIcon size={48} className="mt-4" />
        <p className="mt-4">Upload Image from above to see results.</p>
      </div>
    );
  }
  return (
    <Carousel className="w-8/12 lg:ml-8 mx-auto md:mx-0">
      <CarouselContent className="flex flex-row">
        {response instanceof Array &&
          response.map((item: FormDataType, index: number) => {
            return (
              <CarouselItem key={item?.data?.name || index} className="overflow-auto">
                <Card>
                  <CarouselItemContent item={item} />
                </Card>
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <div className="grid grid-cols-[1fr_1fr] mt-4 gap-x-4">
        <CarouselPrevious variant="secondary" size="lg">
          Previous
        </CarouselPrevious>
        <CarouselNext variant="secondary" size="lg">
          Next
        </CarouselNext>
      </div>
    </Carousel>
  );
};

export default PredCarousel;
