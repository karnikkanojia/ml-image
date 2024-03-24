import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface UploadCardProps {
  children: React.ReactNode;
}

const UploadCard: React.FC<UploadCardProps> = ({ children }) => {
  
  return (
    <Card className="max-w-max mx-auto">
      <CardHeader>
        <CardTitle>Upload your files</CardTitle>
        <CardDescription>
          CXR will be processed on secure servers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default UploadCard;
