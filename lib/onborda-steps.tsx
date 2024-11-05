import { Tour } from "onborda/dist/types";

export const tour: Tour[] = [
  {
    tour: "X-Ray Demo",
    steps: [
      {
        icon: <>👋</>,
        title: "Step 1",
        content: (
          <>
            Here you can upload your XRay images. Please be aware that your internet
            speed has an influence on the upload time. Please do not close the tap
            or reload it while the image is being uploaded.
          </>
        ),
        selector: "#upload-form",
        side: "bottom",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 0,
      },
      {
        icon: <>📁</>,
        title: "Step 2",
        content: (
          <>
            Below, you can see two main areas. On the left, you&apos;ll find the
            image you uploaded. On the right, you&apos;ll see the estimated results
            for various illnesses, as calculated by the machine learning model. When
            you click on an illness, the image on the left will be overlaid with a
            heatmap. The red areas indicate where the model focused to reach its
            conclusion. You can click on different illnesses to update the heatmap.
          </>
        ),
        selector: "#pred-carousel",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 0,
      },
      {
        icon: <>🎉</>,
        title: "Step 3",
        content: (
          <>
            Clicking “Show original” will display the original image without the
            heatmap overlay.
          </>
        ),
        selector: "#show-original-btn",
        side: "top",
        showControls: true,
        pointerPadding: 0,
        pointerRadius: 0,
      },
    ],
  }
]
