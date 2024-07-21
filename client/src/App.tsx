
import Sidebar from "./sections/Sidebar.tsx";
        

import { Suspense } from "react";

import GoogleCalendar from "./features/Calendar/GoogleCalendar.tsx";
<<<<<<< HEAD
=======

>>>>>>> 95f22bb (On branch master)
import SlideSection from "./features/Slides/SlideSection.tsx";

import Annoucements from "./features/Annoucements/Annoucements.tsx";

<<<<<<< HEAD

=======
import Sidebar from "./sections/Sidebar";
>>>>>>> 95f22bb (On branch master)
import HeadingSection from "./sections/HeadingSection";
import PersonalSection from "./sections/PersonalSection";
import CompanySection from "./sections/CompanySection";
import Login from "./sections/Login.tsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <div className="h-screen w-screen flex overflow-x-hidden bg-[#292c3c] gap-2">
      <Sidebar />

      <div className="pl-[400px] w-screen">
        <Login />
        <HeadingSection />
        <PersonalSection />
        <CompanySection />
      </div>
    </div>
    </RecoilRoot>
  );
}

export default App;
