import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PredictionsDict } from "@/lib/definitions";

interface PredTableProps {
  data: PredictionsDict | undefined,
  setGradImage: React.Dispatch<React.SetStateAction<any>>;
}

const PredTable: React.FC<PredTableProps> = ({ data, setGradImage }) => {
  if (!data) return (
    <Table className="mt-4 mx-auto max-w-fit w-full max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Pathology</TableHead>
          <TableHead>Prediction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>No data</TableCell>
          <TableCell>No data</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  const handleClick = (gradcam: any) => () => setGradImage(gradcam);

  const predData = Object.entries(data);
  return (
    <Table className="mt-4 mx-auto max-w-fit w-full max-h-full">
      <TableHeader>
        <TableRow>
          <TableHead>Pathology</TableHead>
          <TableHead>Prediction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {predData.map(([pathology, { prediction, gradcam }]) => (
          <TableRow key={pathology} onClick={handleClick(gradcam)} role="button" tabIndex={0}>
            <TableCell>{pathology}</TableCell>
            <TableCell>{prediction}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredTable;
