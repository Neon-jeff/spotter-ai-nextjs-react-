import { GetIP } from "@/actions/ip";
import EldGraph from "@/components/chart";
import RouteForm from "@/components/form";
import OutputMap from "@/components/map";
import { Suspense } from "react";


export default async function Home() {

  return (
    <div className=" min-h-screen lg:px-10 px-4 bg-gray-100/60  py-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex xl:h-[90vh] min-h-[90vh] items-center max-xl:flex-col w-full lg:w-11/12 mx-auto gap-10 bg-white lg:p-10 p-3 py-10 rounded-4xl justify-center">
      <RouteForm/>
      <Suspense fallback={<div>Loading...</div>}>
      <OutputMap />
      </Suspense>
      {/* <EldGraph/> */}
      </div>
    </div>
  );
}
