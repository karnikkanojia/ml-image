import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { FallbackProps } from "react-error-boundary";


const CarouselError: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div role="alert">
      <span>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Filename
        </h1>
        <p className="text-lg text-muted-foreground inline-block">
          {error?.state?.name}
        </p>
      </span>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <Button
        variant="secondary"
        size="sm"
        onClick={resetErrorBoundary}
        className="mt-4"
      >
        <RotateCw size={16} className="mr-2" />
        Try again
      </Button>
    </div>
  );
};

export default CarouselError;
