import CompanySlide from "@/features/Slides/CompanySlide";
import Tasks from "@/features/Tasks/Tasks";
import React from "react";

function HeadingSection() {
  return (
    <div className="flex flex-col w-full">
      <div className="text-[#ef9f76] font-bold p-10 text-3xl">
        Heading Section
      </div>
      <div className="flex">
        <CompanySlide />
        <Tasks />
      </div>
    </div>
  );
}

export default HeadingSection;
