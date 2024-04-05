import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
// import Modal from "@/components/ImageModal";

interface ImagePreviewProps {
  originalImage: File | string | undefined;
  gradImage?: File | string | undefined;
}

const getAzureStorageUrl = (fileName: string) => {
  const azureAccount = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
  const sasKey = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCESS_KEY;
  const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
  const hostUrl = `https://${azureAccount}.blob.core.windows.net/${containerName}/${fileName}?${sasKey}`;
  return hostUrl;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({
  originalImage,
  gradImage,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  // const [isModalOpen, setIsModalOpen] = useState(false);

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
      setImageUrl(getAzureStorageUrl(imageToUse));
    }
  }, [originalImage, gradImage]);

  // const openModal = () => setIsModalOpen(true);

  return (
    <div className="image-preview-container" /*onClick={openModal}*/>
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
          {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Image src={imageUrl} alt="Zoomed Preview" width={480} height={480} quality={100}  />
          </Modal> */}
        </>
      ) : (
        <ImageIcon size={48} className="mt-6" />
      )}
    </div>
  );
};

export default ImagePreview;
