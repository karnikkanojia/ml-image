import { useEffect, useRef } from "react";
import Image from "next/image";

const ImagePreview: React.FC<{ url: string }> = ({ url }) => {
  const imageURL = useRef<string>(`/api/image?fileName=${url}`);

  useEffect(() => {
    if (!url) {
      console.debug("No image URL provided.");
      return;
    }
    imageURL.current = "/api/image?fileName=" + url;
  }, [url]);

  return url ? (
    <div className="relative h-[400px] w-[400px]">
      <Image
        src={imageURL.current} // Initial src
        onError={(e) => { e.currentTarget.src = "/chest_placeholder.jpeg"; }}
        alt="Chest Xray images probably overlapped with heatmaps for identification."
        width={400}
        height={400}
        style={{ objectFit: "contain" }} // To maintain aspect ratio
      />
    </div>
  ) : null;
};

export default ImagePreview;
