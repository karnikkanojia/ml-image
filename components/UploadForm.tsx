import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import { UploadIcon, Loader2, Paperclip } from "lucide-react";
import { useRef, useTransition } from "react";

const gradcamOptions = [
  { value: "gradcam", label: "Grad-CAM" },
  { value: "gradcampp", label: "Grad-CAM++" },
  { value: "xgradcam", label: "XGrad-CAM" },
  { value: "layercam", label: "Layer-CAM" },
];

interface UploadFormProps {
  dispatch: (data: FormData) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ dispatch }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const formHook = useForm<z.infer<typeof FormSchema>>({
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gradcamMethods: [],
      numberInput: "5",
      files: [],
    },
  });

  const dropzone = {
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  };

  return (
    <div
      className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden md:h-screen md:w-96"
      id="upload-form"
    >
      <div className="p-6">
        <div className="space-y-4">
          <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Upload your files
          </h3>
          <p className="text-sm text-muted-foreground">
            CXR will be processed on secure servers
          </p>
          <Form {...formHook}>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                formHook.handleSubmit((data) => {
                  const formData = new FormData();
                  formData.append("number", data.numberInput);
                  data.gradcamMethods.map((method) =>
                    formData.append("methods", method)
                  );
                  data.files.map((file) => formData.append("file", file));
                  startTransition(() => {
                    dispatch(formData);
                  });
                })(e);
              }}
            >
              <FormField
                control={formHook.control}
                name="gradcamMethods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select methods" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {gradcamOptions.map((option) => (
                            <MultiSelectorItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formHook.control}
                name="numberInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <Input
                      type="text"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter a number"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formHook.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      dropzoneOptions={dropzone}
                      reSelect={true}
                      className="bg-background p-2 w-full flex flex-col items-start justify-center gap-x-2 mt-6 rounded-md outline outline-1 outline-border px-2 pb-1"
                    >
                      <FileInput className="outline-dashed outline-1 outline-white">
                        <div className="flex items-center justify-center flex-col pt-3 pb-4">
                          <FileSvgDraw />
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {field.value &&
                          field.value.length > 0 &&
                          field.value.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                aria-disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={14} />
                    Loading
                  </>
                ) : (
                  <>
                    <UploadIcon className="mr-2" size={14} />
                    Upload
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

export default UploadForm;
