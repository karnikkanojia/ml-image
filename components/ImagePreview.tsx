/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";

const ImagePreview: React.FC<{ url: string }> = ({ url }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!url) {
      console.debug("No image URL provided.");
      return;
    }
    
    if (imageRef.current) {
      imageRef.current.src = `/api/image?fileName=${url}`;
    }
  }, [url]);

  return url ? (
    <div className="relative h-[400px] w-[400px]">
      <img
        ref={imageRef}
        src={`/image?fileName=${url}`} // Initial src
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
