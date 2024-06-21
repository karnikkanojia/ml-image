import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PredTableProps = {
  data: {
    pathology: string;
    prediction: string;
    gradcam: string;
  }[];
  setGradImage: React.Dispatch<React.SetStateAction<any>>;
};

export const PredTable: React.FC<PredTableProps> = ({
  data,
  setGradImage,
}) => {
  return (
    <div className="rounded-md border mt-4 min-w-56 max-h-fit max-w-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pathology</TableHead>
            <TableHead>Prediction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((item, index) => {
                return (
                    <TableRow key={index} onClick={() => setGradImage(item.gradcam)}>
                    <TableCell>{item.pathology}</TableCell>
                    <TableCell>{item.prediction}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
