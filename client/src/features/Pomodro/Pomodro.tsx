import React, { useState, useEffect } from 'react';

const PomodoroClock: React.FC = () => {
    const [time, setTime] = useState<number>(1500); // 25 minutes in seconds
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);

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
            setTime(isBreak ? 1500 : 300); // 25 mins work, 5 mins break
        }
        return () => clearInterval(interval!);
    }, [isActive, time, isBreak]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">
                {isBreak ? 'Break Time!' : 'Work Time!'}
            </h1>
            <h2 className="text-6xl font-mono mb-8">{formatTime(time)}</h2>
            <div className="flex space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setTime(isBreak ? 300 : 1500)}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PomodoroClock;
