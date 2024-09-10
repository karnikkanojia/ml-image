import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiResponse } from "@/lib/definitions";

type PredictionTableProps = {
  data: ApiResponse | undefined;
  camMethod: string;
  setCamImageUrl: React.Dispatch<React.SetStateAction<string>>;
};

const PredictionTable: React.FC<PredictionTableProps> = ({ data, camMethod, setCamImageUrl }) => {

  if (!data || !data.predictions || Object.keys(data.predictions).length === 0) {
    return null;
  }

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
          {data && data.predictions && Object.entries(data.predictions).map(([key, value]) => (
            <TableRow key={key} onClick={() => {
              setCamImageUrl(data?.cam?.[camMethod][key] ?? "")
            }}>
              <TableCell>{key}</TableCell>
              <TableCell>{value.toFixed(8)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PredictionTable;