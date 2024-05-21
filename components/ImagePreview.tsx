import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { ImageIcon, Loader2Icon } from "lucide-react";

interface ImagePreviewProps {
  originalImage: File | string | undefined;
  gradImage?: File | string | undefined;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  gradImage,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const imageToUse = gradImage || originalImage;

    if (!imageToUse) {
      setImageUrl(undefined);
      return;
    }

    if (imageToUse instanceof File) {
      const url = URL.createObjectURL(imageToUse);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(`/image?fileName=${imageToUse}`);
    }
  }, [originalImage, gradImage]);

  return (
    <div className="image-preview-container">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt="Preview"
            height={360}
            width={360}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPElEQVR4nAXBMRUAQAQAUE+Ay2CyeCJIoIbZLI8akpnc/4CIqsrM7z2ICBExM3cHM6uqmSEi6O7dvbvM/DlOEjdqzoFrAAAAAElFTkSuQmCC"
          />
        </>
      ) : (
        <ImageIcon size={48} className="mt-6" />
      )}
    </div>
  );
};

export default ImagePreview;
