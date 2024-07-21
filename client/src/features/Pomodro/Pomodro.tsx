import React, { useState, useEffect } from "react";
import Icon from "../../assets/pomodoro-technique.png";
const PomodoroClock: React.FC = () => {
  const [time, setTime] = useState<number>(1500);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [tab, settab] = useState<number>(1);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }
    if (time === 0) {
      clearInterval(interval!);
      setIsBreak(!isBreak);
      setTime(isBreak ? 1500 : 300);
    }
    return () => clearInterval(interval!);
  }, [isActive, time, isBreak]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const setPomodro = (num: number) => {
    if (num == 1 && tab != 1) {
      settab(1);
      setTime(1500); // Set time for Pomodoro
      setIsBreak(false);
      setIsActive(false);
    } else if (num == 2 && tab != 2) {
      settab(2);
      setTime(300);
      setIsBreak(true);
      setIsActive(false);
    } else if (num == 3 && tab != 3) {
      settab(3);
      setTime(900);
      setIsActive(false);
      setIsBreak(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100px] w-[350px] bg-[#292c3c] m-5 mt-10 mb-10 rounded-[10px] p-5 ">
      <img src={Icon} className="h-12" />
      <div className="flex flex-row justify-evenly items-center font-roboto font-semibold text-sm text-center">
        <div
          className={`m-2 p-2 cursor-pointer  rounded-xl ${
            tab === 1 ? "bg-[#e5c890] text-gray-800" : "text-white"
          }`}
          onClick={() => setPomodro(1)}
        >
          Pomodoro
        </div>
        <div
          className={`m-2 p-2 cursor-pointer rounded-xl ${
            tab === 2 ? "bg-[#e5c890] text-gray-800" : "text-white"
          }`}
          onClick={() => setPomodro(2)}
        >
          Short Break
        </div>
        <div
          className={`m-2 p-2 cursor-pointer rounded-xl ${
            tab === 3 ? "bg-[#e5c890] text-gray-800" : "text-white"
          }`}
          onClick={() => setPomodro(3)}
        >
          Long Break
        </div>
      </div>
      <h2 className="text-[60px] font-[500] text-gray-300 font-roboto mb-4">
        {formatTime(time)}
      </h2>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white font-roboto font-semibold rounded-[8px] hover:bg-white hover:text-gray-700 transition-all"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className="px-4 py-2 bg-[#e78284] text-grey-500 rounded-[8px] hover:bg-white hover:text-[#e78284] transition-all font-roboto font-semibold"
          onClick={() => setTime(isBreak ? 300 : 1500)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroClock;
