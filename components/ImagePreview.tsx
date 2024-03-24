import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";

interface ImagePreviewProps {
  originalImage: File | string | undefined,
  gradImage?: File | string | undefined,
}

const getAzureStorageUrl = (fileName: string) => {
  const azureAccount = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
  const sasKey = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCESS_KEY;
  const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
  const hostUrl = `http://127.0.0.1:10000/${azureAccount}/${containerName}/${fileName}?${sasKey}`;
  return hostUrl;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, gradImage }) => {
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
      return () => URL.revokeObjectURL(url); // Cleanup blob URL when component unmounts or image changes
    } else {
      setImageUrl(getAzureStorageUrl(imageToUse));
    }
  }, [originalImage, gradImage]);

  return (
    <div className="flex mx-auto justify-center w-96">
      {imageUrl ? (
        <Image
          className="w-full h-full"
          src={imageUrl}
          alt="Preview"
          height={224}
          width={224}
        />
      ) : (
        <ImageIcon size={48} className="mt-6" />
      )}
    </div>
  );
};

export default ImagePreview;
