import { Button } from "@/components/ui/button";
import { UploadIcon, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface UploadFormProps {
  dispatch: (data: FormData) => void;
}


const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4" aria-disabled={pending}>
      {
        pending ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={14} />
            Loading
          </>
        ) : (
          <>
            <UploadIcon className="mr-2" size={14} />
            Upload
          </>
        )
      }
    </Button>
  )
}

const UploadForm: React.FC<UploadFormProps> = ({ dispatch }) => {

  return (
    <form action={dispatch} className="block">
      <input type="file" name="image" multiple required />
      <SubmitButton />
    </form>
  );
};

export default UploadForm;
