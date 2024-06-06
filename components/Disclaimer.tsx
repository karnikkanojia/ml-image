import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="fixed z-50 right-3 bottom-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Disclaimer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg max-h-96 overflow-scroll">
          <DialogHeader>
            <AlertCircle color="#f00" className="inline"/>
              <DialogTitle>Disclaimer</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>
              This web application is intended solely as a tool to assist medical
              professionals in the analysis of X-ray images and does not replace
              the professional judgment of qualified doctors. The information
              provided by this application does not constitute a medical diagnosis
              and should not be interpreted as such. It is imperative that any
              diagnosis and subsequent therapeutic decisions are not based solely
              on the digitally generated results of this application. The
              probabilities of diseases provided by the application are merely
              estimates based on artificial intelligence and cannot guarantee
              accuracy or correctness in individual cases. Users of this
              application are urged to critically examine all findings and results
              and, in every instance, seek the opinion of a specialist. By using
              this application, users acknowledge that the developers bear no
              responsibility for any direct, indirect, incidental, special,
              exemplary, or consequential damages arising from reliance on the
              information provided here. Furthermore, users are responsible for
              ensuring that the images uploaded do not contain any personal
              sensitive data or identifiers before submission. It is the user&apos;s
              responsibility to comply with all applicable privacy and data
              protection laws, including the anonymization of images to remove any
              information that could potentially identify an individual. By
              proceeding to use this application, users agree to this
              responsibility and to the terms outlined above.
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Disclaimer;
