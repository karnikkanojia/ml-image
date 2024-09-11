import { z } from "zod";

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
  cam: z.array(z.string()).min(1, "Select at least one Grad-CAM method."),
  topk: z.string().min(1, "Number must be greater than 0."),
});

export type FormValues = z.infer<typeof FormSchema>;

const ResponseSchema = z.object({
  predictions: z.record(z.number()).optional(),
  cam: z.record(z.record(z.string())).optional(),
  name: z.string().optional(),
  error: z.string().optional(),
});

const CacheKeySchema = z.object({
  file: z.instanceof(File),
  camMethods: z.array(z.string()),
});

const DataStateSchema = z.object({
  name: z.string(),
  file: z.instanceof(File),
  topk: z.number().max(18).min(1),
  camMethods: z.array(z.string()),
  fetched: z.boolean().default(false),
  data: ResponseSchema.default({}),
});

export type ApiResponse = z.infer<typeof ResponseSchema>;
export type DataState = z.infer<typeof DataStateSchema>;
export type CacheKey = z.infer<typeof CacheKeySchema>;
