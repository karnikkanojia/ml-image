import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export type PredictionsDict = {
  [disease: string]: number;
};

export type CamDict = {
  [method: string]: {
    [disease: string]: string;
  };
};

export type PredictionRow = {
  pathology: string;
  prediction: string;
  gradcam: string;
};

export type DiagnosisPredictions = {
  predictions: PredictionsDict;
  cam: CamDict;
  name: string;
};

export type FormDataType =
  | {
      data: DiagnosisPredictions | any;
      error: Error | any | null;
    }
  | undefined;

export const FormSchema = z.object({
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024),
      {
        message: "File size must be less than 5MB",
      }
    )
    .max(5, "Maximum of 5 files allowed.")
    .min(1, "At least one file is required."),
  gradcamMethods: z
    .array(z.string())
    .min(1, "Select at least one Grad-CAM method."),
  numberInput: z.string().min(1, "Number must be greater than 0."),
});

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
            <ArrowUpDown className="ml-2 h-4 w-4 inline" />
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
