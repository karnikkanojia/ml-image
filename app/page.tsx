"use client"

import UploadCard from "@/components/UploadCard";
import UploadForm from "@/components/UploadForm";
import PredCarousel from "@/components/PredCarousel";
import { useFormState } from "react-dom";
import { uploadImage } from "@/app/actions";
import { FormDataType } from "@/lib/definitions";
import { useEffect } from "react";

const initialState: FormDataType[] = [];


export default function Home() {
  const [ state, dispatch ] = useFormState(uploadImage, initialState);

  return (
    <main className="w-2/3 mt-10 mx-auto">
        <UploadCard>
          <UploadForm dispatch={dispatch} />
        </UploadCard>
        <PredCarousel response={state} />
    </main>
  );
}
