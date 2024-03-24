import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon, CircleX } from "lucide-react";
// import Modal from "@/components/ImageModal";

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
          <Image src={imageUrl} alt="Preview" height={480} width={480} />
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
