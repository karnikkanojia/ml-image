import { useState } from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImagePreview from "@/components/ImagePreview";
import { PredTable } from "@/components/PredTable";
import { CircleX } from "lucide-react";
import { FormDataType } from "@/lib/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CarouselItemContentProps = {
  item: FormDataType;
  demo?: boolean;
};

const CarouselItemContent: React.FC<CarouselItemContentProps> = ({
  item,
  demo,
}) => {
  const [gradImage, setGradImage] = useState<string | undefined>(undefined);
  const [method, setMethod] = useState(
    item?.data?.cam ? Object.keys(item.data.cam)[0] : ""
  );

  const isDataUnavailable = item?.error || !item?.data?.predictions;
  const errorMessage: string = item?.error?.toString() || "Data not available";

  if (demo) {
    // Make a prediction array with random values
    const predictionArray = [
      {
        pathology: "Pathology 1",
        prediction: "0.63533",
        gradcam: "",
      },
      {
        pathology: "Pathology 2",
        prediction: "0.53553",
        gradcam: "",
      },
      {
        pathology: "Pathology 3",
        prediction: "0.12334",
        gradcam: "",
      },
    ];

    return (
      <CardContent className="flex flex-col lg:flex-row w-fit">
        <CardHeader className="flex justify-evenly max-w-fit mx-auto lg:m-0">
          <ImagePreview
            demo={true} originalImage={undefined}
          />
          <Button id="show-original-btn">Show Original</Button>
        </CardHeader>
        <div className="lg:mt-4">
          <PredTable
            data={predictionArray}
            setGradImage={setGradImage}
          />
        </div>
      </CardContent>
    );
  }

  if (isDataUnavailable) {
    return (
      <div className="mx-auto">
        <CardContent className="flex flex-col lg:flex-row justify-center">
          <div className="text-center mt-6">
            <CircleX color="red" className="inline mr-2" />
            {errorMessage.toString()}
          </div>
        </CardContent>
      </div>
    );
  }

  const predictions: {
    [key: string]: number;
  } = item.data.predictions;
  const methodsAvailable = Object.keys(item.data.cam);
  const predictionArray = Object.entries(predictions).map(
    ([pathology, prediction]: [string, number]) => {
      const gradcam = item?.data?.cam[method]?.[pathology];
      return {
        pathology,
        prediction: prediction.toFixed(8),
        gradcam,
      };
    }
  );

  return (
    <CardContent className="flex flex-col lg:flex-row">
      <CardHeader className="flex justify-evenly max-w-fit mx-auto lg:m-0">
        <ImagePreview originalImage={item?.data?.name} gradImage={gradImage} />
        <Button onClick={() => setGradImage(undefined)}>Show Original</Button>
      </CardHeader>
      <div className="lg:mt-6 mx-auto lg:mx-0">
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{method}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {methodsAvailable.map((methodVal) => (
              <SelectItem key={methodVal} value={methodVal}>
                {methodVal}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <PredTable
          data={predictionArray}
          setGradImage={setGradImage}
        />
      </div>
    </CardContent>
  );
};

export default CarouselItemContent;
