import Image from "next/image";
import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";

interface ImagePreviewProps {
  originalImage: File | string | undefined;
  gradImage?: File | string | undefined;
  demo?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  gradImage,
  demo
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const imageToUse = gradImage || originalImage;
    if (!imageToUse) return;
    setIsLoading(true);

    if (imageToUse instanceof File) {
      const url = URL.createObjectURL(imageToUse);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(`/image?fileName=${imageToUse}`);
    }
  }, [originalImage, gradImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };


  if (demo) {
    return (
      <div className="image-preview-container relative">
        <Image
          src="/demo_chest.webp"
          alt="Preview"
          height={360}
          width={360}
          loading="eager"
          quality={30}
        />
      </div>
    );
  }

  return (
    <div className="image-preview-container relative">
      {isLoading && (
        <div className="loader-overlay">
          <Loader2Icon size={48} className="loader-icon" />
        </div>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Preview"
          height={360}
          width={360}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default ImagePreview;
