"use client";

import UploadForm from "@/components/UploadForm";
import PredCarousel from "@/components/PredCarousel";
import { useFormState } from "react-dom";
import { uploadImage } from "@/app/actions";
import { Onborda, useOnborda } from "onborda";
import { useEffect } from "react";
import { steps } from "@/lib/onborda-steps";
import OnbordaCard from "@/components/OnbordaCard";
import { useWindowWidth } from "@react-hook/window-size";
import { FormDataType } from "@/lib/definitions";



export default function Analyse() {
  const initialState: FormDataType[] = [{
    data: undefined,
    error: undefined,
  }];
  const [state, dispatch] = useFormState(uploadImage, initialState);
  const { startOnborda } = useOnborda();
  const windowWidth = useWindowWidth();

  useEffect(() => startOnborda(), []);

  useEffect(() => {
    if (windowWidth < 768) {
      steps[0].side = "bottom";
      steps[1].side = "top";
    } else {
      steps[0].side = "right";
      steps[1].side = "left";
    }
  }, [windowWidth]);

  return (
    <Onborda steps={steps} cardComponent={OnbordaCard} shadowOpacity="0.8">
      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] h-full">
        <UploadForm dispatch={dispatch} />
        <div className="my-auto">
          <PredCarousel response={state} />
        </div>
      </div>
    </Onborda>
  );
}