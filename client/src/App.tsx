import { Suspense } from "react";
import GoogleCalendar from "./features/Calendar/GoogleCalendar.tsx";
import Sidebar from "./sections/Sidebar.tsx";
import SlideSection from "./features/Slides/SlideSection.tsx";

import PersonalSection from "./sections/PersonalSection.tsx";
import CompanySection from "./sections/CompanySection.tsx";

function App() {
  return (
    <div className="h-screen w-screen flex overflow-x-hidden bg-[#303446]">
      <Sidebar />
      <PersonalSection />
      <CompanySection />
    </div>
  );
}

export default App;
