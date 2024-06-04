import { useEffect, useState } from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImagePreview from "@/components/ImagePreview";
import DataTable from "@/components/DataTable";
import { CircleX } from "lucide-react";
import { FormDataType, PredictionsDict, columns } from "@/lib/definitions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CarouselItemContentProps = {
  item: FormDataType;
};

const CarouselItemContent: React.FC<CarouselItemContentProps> = ({ item }) => {
  const [gradImage, setGradImage] = useState<string | undefined>(undefined);
  const [method, setMethod] = useState(
    item?.data?.cam ? Object.keys(item.data.cam)[0] : ""
  );

  const isDataUnavailable = item?.error || !item?.data?.predictions;
  const errorMessage: string = item?.error?.toString() || "Data not available";

  useEffect(() => {
    if (method && item?.data?.cam[method]) {
      setGradImage(item?.data?.cam[method]);
    }
  }, [method, item?.data?.cam]);

  if (isDataUnavailable) {
    return (
      <CardContent className="flex flex-col lg:flex-row min-w-52">
        <div className="text-center mt-6">
          <CircleX color="red" className="inline mr-2" />
          {errorMessage}
        </div>
      </CardContent>
    );
  }

  const predictions: PredictionsDict = item?.data?.predictions ?? {};
  const methodsAvailable = Object.keys(item.data.cam);

  const predictionArray = Object.entries(predictions).map(
    ([pathology, prediction]: [string, number]) => {
      const gradcam = item?.data?.cam[method]?.[pathology];
      return {
        pathology,
        prediction: prediction.toFixed(10), // Assuming prediction is a number
        gradcam,
      };
    }
  );

  return (
    <CardContent className="flex flex-col lg:flex-row min-w-52">
      <>
        <CardHeader className="flex justify-evenly">
          <ImagePreview
            originalImage={item?.data?.name} // Pass the original image path here
            gradImage={gradImage}
          />
          <Button onClick={() => setGradImage(undefined)}>Show Original</Button>
        </CardHeader>
        <div className="md:mt-6">
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

          <DataTable
            data={predictionArray}
            setGradImage={setGradImage}
            columns={columns}
          />
        </div>
      </>
    </CardContent>
  );
};

export default CarouselItemContent;
