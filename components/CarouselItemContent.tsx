import { useState } from 'react';
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ImagePreview from "@/components/ImagePreview";
import PredTable from "@/components/PredTable";
import { CircleX } from "lucide-react";
import { FormDataType } from "@/lib/definitions";

type CarouselItemContentProps = {
  item: FormDataType;
};

const CarouselItemContent: React.FC<CarouselItemContentProps> = ({ item }) => {
  const [gradImage, setGradImage] = useState<string | undefined>(undefined);
  const errorMessage: string | Error = item?.error;

  return (
    <CardContent className="flex flex-col lg:flex-row min-w-52">
      {errorMessage ? (
        <div className="text-center mt-6">
          <CircleX color="red" className="inline mr-2" />
          Error: {errorMessage.toString()}
        </div>
      ) : (
        <>
          <CardHeader className="flex justify-evenly">
            <ImagePreview
              originalImage={item?.data?.name}
              gradImage={gradImage}
            />
            <Button onClick={() => setGradImage(undefined)}>Show Original</Button>
          </CardHeader>
          <PredTable
            data={item?.data?.predictions}
            setGradImage={setGradImage}
          />
        </>
      )}
    </CardContent>
  );
};

export default CarouselItemContent;
