"use client";

import Disclaimer from "@/components/Disclaimer";
import UploadForm from "@/components/UploadForm";
import DisplayPanel from "@/components/DisplayPanel";
import BenchmarkTable from "@/components/BenchmarkTable";
import { DataProvider } from "@/context/data-provider";


const Page = () => {

  return (
    <DataProvider>
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
          <UploadForm />
          <section className="md:grid md:place-items-center p-6">
            <DisplayPanel />
          </section>
        </div>
        <BenchmarkTable />
        <Disclaimer />
    </DataProvider>
  )
}

export default Page