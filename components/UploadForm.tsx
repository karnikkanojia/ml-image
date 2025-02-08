import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadIcon, Paperclip } from "lucide-react";
import { FormValues, FormSchema, DataState } from "@/lib/definitions";
import { DataContext, DataStateActions } from "@/context/data-provider";

const gradcamOptions = [
  { value: "gradcam", label: "Grad-CAM" },
  { value: "gradcampp", label: "Grad-CAM++" },
  { value: "xgradcam", label: "XGrad-CAM" },
  { value: "layercam", label: "Layer-CAM" },
];

const UploadForm = () => {
  const formHook = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cam: ["layercam"],
      topk: "5",
      files: [],
    },
  });

  const dropzone = {
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
  };

  const { dispatch } = useContext(DataContext);

  return (
    <aside
      className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden lg:h-screen lg:w-96"
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
              onSubmit={(e) => {
                e.preventDefault();
                formHook.handleSubmit((data) => {
                  let dataArr = data.files.map(
                    (file) =>
                      ({
                        file: file,
                        topk: parseInt(data.topk),
                        camMethods: data.cam,
                        predictions: {},
                        name: file.name,
                        fetched: false,
                        data: {},
                      } as DataState)
                  );
                  for (const data of dataArr) {
                    dispatch({
                      type: DataStateActions.ADD_DATA,
                      payload: data,
                      name: data.name,
                    });
                  }
                })(e);
              }}
            >
              <FormField
                control={formHook.control}
                name="cam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <Input
                      id="method"
                      value={["layercam"]}
                      readOnly
                      className="bg-gray-900 border-gray-700 cursor-not-allowed"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formHook.control}
                name="topk"
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
              <Button type="submit" className="mt-4 w-full">
                <UploadIcon className="mr-2" size={14} />
                Upload
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </aside>
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
