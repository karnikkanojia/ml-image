"use client"

import { useFormState } from "react-dom";
import UploadCard from "@/components/UploadCard";
import Disclaimer from "@/components/Disclaimer";
import PredCarousel from "@/components/PredCarousel";
import UploadForm from "@/components/UploadForm";
import { uploadImage } from "@/app/actions";
import { FormDataType } from "@/lib/definitions";

const initialState: FormDataType[] = [];

const Predict = () => {

  const [ state, dispatch ] = useFormState(uploadImage, initialState);

  return (
    <main className="md:w-2/3 mt-10 mx-auto space-y-4">
      <UploadCard>
        <UploadForm dispatch={dispatch} />
      </UploadCard>
      <PredCarousel response={state} />
      <Disclaimer />
    </main>
  )
}

export default Predict;