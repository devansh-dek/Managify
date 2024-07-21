import GoogleCalendar from "@/features/Calendar/GoogleCalendar";
import SlideSection from "@/features/Slides/SlideSection";
import Tasks from "@/features/Tasks/Tasks";
import React, { Suspense } from "react";

function PersonalSection() {
    return (
        <div className="flex flex-col">
            <div className=" w-screen overflow-y-scroll flex gap-5 overflow-x-hidden">
                <GoogleCalendar />
                <Tasks />
            </div>
        </div>
    );
}

export default PersonalSection;
