"use client"

import { useFormState } from "react-dom";
import UploadCard from "@/components/UploadCard";
import Disclaimer from "@/components/Disclaimer";
import UploadForm from "@/components/UploadForm";
import PredCarousel from "@/components/PredCarousel";
import { uploadImage } from "@/app/actions";
import { FormDataType } from "@/lib/definitions";

const initialState: FormDataType[] = [];

const Predict = () => {

  const [ state, dispatch ] = useFormState(uploadImage, initialState);

  return (
    <main className="w-2/3 mt-10 mx-auto">
      <UploadCard>
        <Disclaimer />
        <UploadForm dispatch={dispatch} />
      </UploadCard>
      <PredCarousel response={state} />
    </main>
  )
}

export default Predict;