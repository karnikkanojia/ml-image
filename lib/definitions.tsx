import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export type FormDataType =
  | {
      data: DiagnosisPredictions | any;
      error: Error | any | null;
    }
  | undefined;

export type Prediction = {
  prediction: string;
  gradcam: string;
};

export type PredictionsDict = {
  [disease: string]: Prediction;
};

export type PredictionRow = {
  pathology: string;
  prediction: string;
  gradcam: string;
};

export type DiagnosisPredictions = {
  predictions: PredictionsDict;
  name: string;
};

export const columns: ColumnDef<PredictionRow>[] = [
  {
    accessorKey: "pathology",
    header: "Pathology",
    accessorFn: (row) => row.pathology,
  },
  {
    accessorKey: "prediction",
    header: ({ column }) => {
      return (
        <span>
          Prediction
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-2"
          >
            <ArrowUpDown
              className="ml-2 h-4 w-4 inline"
            />
          </Button>
        </span>
      );
    },
    accessorFn: (row) => row.prediction,
  },
  {
    accessorKey: "gradcam",
    header: "Gradcam",
    accessorFn: (row) => row.gradcam,
  },
];
