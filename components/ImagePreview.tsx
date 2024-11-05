import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react"

const ImagePreview: React.FC<{ url: string }> = ({ url }) => {
  const [ loading, setLoading ] = useState(false);
  const [ imageURL, setImageURL ] = useState(`/api/image?fileName=${url}`);

  useEffect(() => {
    setLoading(true);
    if (!url) {
      console.debug("No image URL provided.");
      return;
    }
    setImageURL(`/api/image?fileName=${url}`);
  }, [url]);

  return url ? (
    <div className="relative h-[400px] w-[400px]">
      {loading && (
        <div className="absolute inset-0 z-50 bg-gray-100 bg-opacity-50 flex items-center justify-center">
          <LoaderCircle size={48} className="animate-spin"/>
        </div>
      )}
      <Image
        src={imageURL} // Initial src
        onError={(e) => { e.currentTarget.src = "/chest_placeholder.jpeg"; }}
        alt="Chest Xray images probably overlapped with heatmaps for identification."
        width={400}
        height={400}
        onLoad={() => setLoading(false)}
        style={{ objectFit: "contain" }} // To maintain aspect ratio
      />
    </div>
  ) : null;
};

export default ImagePreview;
