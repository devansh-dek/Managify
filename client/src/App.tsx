import { Suspense } from "react";

import GoogleCalendar from "./features/Calendar/GoogleCalendar.tsx";
import SlideSection from "./features/Slides/SlideSection.tsx";

import Annoucements from "./features/Annoucements/Annoucements.tsx";

import Sidebar from "./sections/Sidebar";
import HeadingSection from "./sections/HeadingSection";
import PersonalSection from "./sections/PersonalSection";
import CompanySection from "./sections/CompanySection";

function App() {
  return (
    <div className="h-screen w-screen flex overflow-x-hidden bg-[#292c3c] gap-2">
      <Sidebar />

      <div className="pl-[400px] w-screen">
        <HeadingSection />
        <PersonalSection />
        <CompanySection />
      </div>
    </div>
  );
}

export default App;
