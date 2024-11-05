"use client";

import Disclaimer from "@/components/Disclaimer";
import UploadForm from "@/components/UploadForm";
import DisplayPanel from "@/components/DisplayPanel";
import BenchmarkTable from "@/components/BenchmarkTable";
import OnbordaCard from "@/components/OnbordaCard";
import { DataProvider } from "@/context/data-provider";
import { useOnborda } from "onborda";
import { useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { Onborda } from "onborda";
import { tour } from "@/lib/onborda-steps";


const Page = () => {

  const { startOnborda } = useOnborda();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    startOnborda("X-Ray Demo");
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      tour[0].steps[0].side = "bottom";
      tour[0].steps[1].side = "top";
    } else {
      tour[0].steps[0].side = "right";
      tour[0].steps[1].side = "left";
    }
  }, [windowWidth]);

  return (
    <DataProvider>
      <Onborda steps={tour} cardComponent={OnbordaCard} shadowOpacity="0.8">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
          <UploadForm />
          <section className="md:grid md:place-items-center p-6">
            <DisplayPanel />
          </section>
        </div>
        <BenchmarkTable />
        <Disclaimer />
      </Onborda>
    </DataProvider>
  )
}

export default Page