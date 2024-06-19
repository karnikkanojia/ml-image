import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";
import { zfd } from "zod-form-data";


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
