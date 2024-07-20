import { Suspense } from "react";
import GoogleCalendar from "./features/Calendar/GoogleCalendar.tsx";
import Sidebar from "./sections/Sidebar.tsx"
import SlideSection from "./features/Slides/SlideSection.tsx";

function App() {
  return (
    <div className='h-screen w-screen flex overflow-x-hidden'>

      <Sidebar />
      <div className="flex flex-col w-screen overflow-y-scroll pl-[400px]">
        <Suspense>
          <SlideSection />
        </Suspense>
        <GoogleCalendar />
      </div>
    </div>
  )
}

export default App;
