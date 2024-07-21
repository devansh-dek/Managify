import { useEffect, useState } from "react";
import PomodoroClock from "@/features/Pomodro/Pomodro";
import Spotify from "@/features/Spotify/Spotify";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novermber",
  "December",
];

function Sidebar() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="rounded-r-lg h-full w-[400px] fixed z-20 bg-[#232634]">
      <div className="pl-7 pt-10 justify-start flex flex-col">
        <div className="text-[60px] text-[#E78284] font-[100] font-regular">
          {date.getHours()}
          <span className="relative top-[-4px]">:</span>
          {String(date.getMinutes()).padStart(2, "0")}
        </div>

        <div className="font-roboto text-lg pl-1 font-semibold text-[#E78284]">
          {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()},{" "}
          {date.getFullYear()}
        </div>
      </div>
      <PomodoroClock />
      <Spotify />
    </div>
  );
}

export default Sidebar;
