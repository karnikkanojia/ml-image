import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CarouselDemo = () => {
  return (
    <div
      id="pred-carousel"
      className="flex flex-col sm:flex-row justify-evenly mt-8"
    >
      <div className="flex flex-col items-center mr-0 lg:mr-4">
        <Image
          src="/demo_chest_gradcam.webp"
          alt="Demo image with heatmap on the XRay"
          width={400}
          height={400}
          quality={25}
        />
        <Button id="show-original-btn" className="mt-4 w-full">
          Show Original
        </Button>
      </div>
      <div className="mx-auto sm:mx-0 mt-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Method"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gradcam">GradCAM</SelectItem>
            <SelectItem value="gradcampp">GradCAMpp</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border mt-4 min-w-56 max-h-fit max-w-fit">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pathology</TableHead>
                <TableHead>Prediction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Atelectasis</TableCell>
                <TableCell>0.238293</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pneumonia</TableCell>
                <TableCell>0.329238</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Nodule</TableCell>
                <TableCell>0.732322</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CarouselDemo;
