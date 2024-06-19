import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const PredictionRowSchema = z.object({
  pathology: z.string(),
  prediction: z.string(),
  gradcam: z.string(),
});


export const DiagnosisPredictionsSchema = z.object({
  predictions: z.record(z.number()),
  cam: z.record(z.record(z.string())),
  name: z.string(),
});


export const FormSchema = zfd.formData({
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

export const columns: ColumnDef<z.infer<typeof PredictionRowSchema>>[] = [
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
            <ArrowUpDown size={12} className="mx-auto inline" />
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
