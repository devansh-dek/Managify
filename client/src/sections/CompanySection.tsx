import Annoucements from "@/features/Annoucements/Annoucements";
import Poll from "@/features/Poll/Poll";
import CompanySlide from "@/features/Slides/CompanySlide";
import SlideSection from "@/features/Slides/SlideSection";
import React from "react";

function CompanySection() {
    return (
        <div>
            {/* <CompanySlide /> */}
            <div className="flex flex-row w-full">
                <Poll />
                <SlideSection />
            </div>
        </div>
    );
}

export default CompanySection;
