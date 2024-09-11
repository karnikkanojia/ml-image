import { useContext, useEffect, useState, useTransition } from "react";
import { useErrorBoundary } from "react-error-boundary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PredictionTable from "@/components/PredictionTable";
import ImagePreview from "@/components/ImagePreview";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DataState } from "@/lib/definitions";
import { ApiResponse } from "@/lib/definitions";
import { fetchData } from "@/lib/fetchData";
import { Trash2 } from "lucide-react";
import { DataContext, DataStateActions } from "@/context/data-provider";

const DisplayCarouselContent = ({ state }: { state: DataState }) => {
  const [data, setData] = useState<DataState>(state);
  const [gradMethod, setGradMethod] = useState<string>("");
  const [camImageUrl, setCamImageUrl] = useState<string>("");
  const [methodsAvailable, setMethodsAvailable] = useState<string[]>([]);
  const [isLoading, startTransition] = useTransition();
  const { dispatch } = useContext(DataContext);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    startTransition(async () => {
      let response: ApiResponse = state.data;
      if (!state.fetched) {
        response = await fetchData(state);
      }
      if (response.hasOwnProperty("error") && response.error) {
        showBoundary({ message: response.error, state });
        return;
      }
      setCamImageUrl(response.name || "/chest_placeholder.jpeg");
      setData({
        ...state,
        fetched: true,
        data: response,
      });
      const methodsAvailable = Object.keys(response?.cam || {});
      setMethodsAvailable(methodsAvailable);
      setGradMethod(methodsAvailable[0]);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4 mt-8">
        <div className="flex flex-col">
          <Skeleton className="h-[400px] w-[400px] rounded-xl" />
          <Skeleton className="mt-4 h-6 w-[400px] rounded-xl" />
        </div>
        <div className="space-y-2 ml-8 h-full">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>
    );
  }

  if (methodsAvailable.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex justify-between">
        <span>
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Filename
          </h1>
          <p className="text-lg text-muted-foreground inline-block">
            {data.name}
          </p>
        </span>
        <Button
          onClick={() => {
            dispatch({
              type: DataStateActions.DELETE_DATA,
              payload: {
                file: data.file,
                camMethods: data.camMethods,
              }
            })}
          }
          className="my-auto"
          variant="destructive"
          size="icon"
        >
          <Trash2 />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly mt-8">
        <div className="flex flex-col items-center">
          <ImagePreview url={camImageUrl} />
          <Button
            className="mt-4 w-full"
            onClick={() => setCamImageUrl(data?.name || "")}
          >
            Show Original
          </Button>
        </div>
        <div className="mx-auto sm:mx-0 mt-4">
          <Select value={gradMethod} onValueChange={setGradMethod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{gradMethod}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {methodsAvailable.map((methodVal) => (
                <SelectItem key={methodVal} value={methodVal}>
                  {methodVal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <PredictionTable
            data={data.data}
            camMethod={gradMethod}
            setCamImageUrl={setCamImageUrl}
          />
        </div>
      </div>
    </>
  );
};

export default DisplayCarouselContent;
