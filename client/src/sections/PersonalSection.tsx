<<<<<<< HEAD
import GoogleCalendar from '@/features/Calendar/GoogleCalendar'
import Poll from '@/features/Poll/Poll'
import SlideSection from '@/features/Slides/SlideSection'
import Tasks from '@/features/Tasks/Tasks'
import React, { Suspense } from 'react'

function PersonalSection() {
    return (
        <div className='flex flex-col'>
            <h1>Perosnal section</h1>
            <div className=" w-screen overflow-y-scroll overflow-x-hidden">
                <Poll />
                <Suspense>
                    <SlideSection />
                </Suspense>
                <GoogleCalendar />
            </div>

        </div>


    )
=======
import GoogleCalendar from "@/features/Calendar/GoogleCalendar";
import SlideSection from "@/features/Slides/SlideSection";
import Tasks from "@/features/Tasks/Tasks";
import React, { Suspense } from "react";

function PersonalSection() {
  return (
    <div className="flex flex-col">
      <h1 className="text-[#ef9f76] font-bold p-10 text-3xl">
        Perosnal section
      </h1>
      <div className=" w-screen overflow-y-scroll overflow-x-hidden">
        <Suspense>
          <SlideSection />
        </Suspense>
        <GoogleCalendar />
      </div>
    </div>
  );
>>>>>>> 95f22bb (On branch master)
}

export default PersonalSection;
