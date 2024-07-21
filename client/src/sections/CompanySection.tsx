<<<<<<< HEAD
import Annoucements from '@/features/Annoucements/Annoucements'
import CompanySlide from '@/features/Slides/CompanySlide'
import React from 'react'



function CompanySection() {
    return (
        <div>
            {/* <CompanySlide /> */}
            <div className="flex flex-col w-screen overflow-y-scroll pl-[400px] overflow-x-hidden">


                <Annoucements />



            </div>
        </div>
    )
=======
import Annoucements from "@/features/Annoucements/Annoucements";
import CompanySlide from "@/features/Slides/CompanySlide";
import React from "react";

function CompanySection() {
  return (
    <div>
      {/* <CompanySlide /> */}
      <h1 className="text-[#ef9f76] font-bold p-10 text-3xl">
        Company Section
      </h1>
      <div className="flex flex-col w-full">
        <Annoucements />
      </div>
    </div>
  );
>>>>>>> 95f22bb (On branch master)
}

export default CompanySection;
