import { useState } from 'react';
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ImagePreview from "@/components/ImagePreview";
import DataTable from '@/components/DataTable';
import { CircleX } from "lucide-react";
import { FormDataType, columns } from "@/lib/definitions";

type CarouselItemContentProps = {
  item: FormDataType;
};

const CarouselItemContent: React.FC<CarouselItemContentProps> = ({ item }) => {
  const [gradImage, setGradImage] = useState<string | undefined>(undefined);
  const errorMessage: string | Error = item?.error;

  if(errorMessage) {
    <CardContent className="flex flex-col lg:flex-row min-w-52">
      <div className="text-center mt-6">
          <CircleX color="red" className="inline mr-2" />
          {errorMessage.toString()}
        </div>
    </CardContent>
  }


  const predictionArray = Object.entries(item?.data?.predictions).map(([pathology, { prediction, gradcam }]) => (
    { pathology, prediction, gradcam }
  ));
  return (
    <CardContent className="flex flex-col lg:flex-row min-w-52">
        <>
          <CardHeader className="flex justify-evenly">
            <ImagePreview
              originalImage={item?.data?.name}
              gradImage={gradImage}
            />
            <Button onClick={() => setGradImage(undefined)}>Show Original</Button>
          </CardHeader>
          <DataTable
            data={predictionArray}
            setGradImage={setGradImage}
            columns={columns}
          />
        </>
    </CardContent>
  );
};

export default CarouselItemContent;
