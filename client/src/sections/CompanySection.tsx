import Annoucements from "@/features/Annoucements/Annoucements";
import Poll from "@/features/Poll/Poll";
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
                <Poll />
            </div>
        </div>
    );
}

export default CompanySection;
