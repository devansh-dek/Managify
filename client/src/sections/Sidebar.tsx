import { User2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import PomodoroClock from '@/features/Pomodro/Pomodro';
import Spotify from '@/features/Spotify/Spotify';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

function Sidebar() {
  const [date,setDate] = useState(new Date());
    
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000 );

    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  return (
    <div className='rounded-r-lg h-full w-[400px] fixed z-20 bg-[#414559]'>
        <div className='pt-5 pb-1 pl-7 flex gap-3 items-center justify-start'>
            <User2Icon className='border-[2px] rounded-full h-7 w-7 text-white' />
            <span className='text-md text-gray-400 font-semibold font-roboto'>Agnish Bhattacharya</span>
        </div>
        <div className='pl-7 justify-start flex flex-col'>
          <div className='text-[60px] text-[#E78284] font-[100] font-regular'>{date.getHours()}<span className='relative top-[-4px]'>:</span>{date.getMinutes()}</div>
          <div className='font-roboto text-lg pl-1 font-semibold text-[#E78284]'>{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</div>
        </div>
        <PomodoroClock />
        <Spotify />
    </div>
  )
}

export default Sidebar;