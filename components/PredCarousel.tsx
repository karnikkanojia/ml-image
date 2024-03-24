import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";
import PredTable from "@/components/PredTable";
import { useState } from "react";
import { FormDataType } from "@/lib/definitions";
import { ImageUpIcon, CircleX} from "lucide-react";

type PredCarouselProps = {
  response: FormDataType[];
};

const PredCarousel: React.FC<PredCarouselProps> = ({ response }) => {
  const [gradImage, setGradImage] = useState<string | undefined>(undefined);
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
      <CarouselContent>
        {response.map((item, index) => {
          const errorMessage: string | Error = item?.error;
          return (
            <CarouselItem key={item?.data?.name || index}>
              <Card className="flex-col lg:flex lg:flex-row justify-around">
                {!errorMessage && (
                  <CardHeader className="justify-evenly">
                    <ImagePreview
                      originalImage={item?.data?.name}
                      gradImage={gradImage}
                    />
                    <Button onClick={() => setGradImage(undefined)}>
                      Show Original
                    </Button>
                  </CardHeader>
                )}
                <CardContent className="pt-6">
                  {errorMessage ? (
                    <div className="text-center">
                      <CircleX color="red" className="inline mr-2" />
                      Error: {errorMessage.toString()}
                    </div>
                  ) : (
                    <PredTable
                      data={item?.data?.predictions}
                      setGradImage={setGradImage}
                    />
                  )}
                </CardContent>
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
