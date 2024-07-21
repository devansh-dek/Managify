import GoogleCalendar from "@/features/Calendar/GoogleCalendar";
import SlideSection from "@/features/Slides/SlideSection";
import Tasks from "@/features/Tasks/Tasks";
import React, { Suspense } from "react";

function PersonalSection() {
  return (
    <>
      <h1>Perosnal sections</h1>
      <div className="flex flex-col w-screen overflow-y-scroll pl-[250px] overflow-x-hidden ">
        <Suspense>
          <SlideSection />
        </Suspense>
        <div className="flex">
          <GoogleCalendar />
          <Tasks />
        </div>
      </div>
    </>
  );
}

export default PersonalSection;
