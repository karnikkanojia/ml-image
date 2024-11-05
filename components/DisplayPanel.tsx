import { ErrorBoundary } from 'react-error-boundary';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCustom as CarouselNext,
  CarouselPreviousCustom as CarouselPrevious,
} from "@/components/ui/carousel";
import DisplayCarouselContent from "@/components/DisplayCarouselContent";
import CarouselError from "@/components/CarouselError";
import { DataContext } from "@/context/data-provider";
import CarouselDemo from "@/components/CarouselDemo";
import { DataState } from "@/lib/definitions";
import { ImageUpIcon } from "lucide-react";
import { useContext } from "react";
import { useOnborda } from "onborda";

const DisplayPanel = () => {
  const { state } = useContext(DataContext);
  const { isOnbordaVisible } = useOnborda();

  if (isOnbordaVisible) {
    return (
      <CarouselDemo />
    )
  }

  if (state.length === 0) {
    return (
      <div className="h-full flex justify-center items-center">
        <ImageUpIcon size={32} className="mr-4 mt-4" />
        <p className="mt-4">Upload Image from above to see results.</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-screen-md">
      <CarouselContent>
        {state.map((item: DataState, index: number) => (
          <CarouselItem key={`${item.name}-${index}`}>
            <ErrorBoundary FallbackComponent={CarouselError}>
              <DisplayCarouselContent state={item} />
            </ErrorBoundary>
          </CarouselItem>
        ))}
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

export default DisplayPanel;
