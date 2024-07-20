import { User2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import PomodoroClock from '@/features/Pomodro/Pomodro';
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

function Sidebar() {
  const [date,setDate] = useState(new Date());
  const [spotifyLink, setSpotifyLink] = useState('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=a7b105a5efab4fc3');

  function makeEmbedLink(link: string) {
    const linkparts = link.split('playlist');
    const linkend = linkparts[1].split('si');
    const embedLink = linkparts[0]+'embed/playlist'+linkend[0]+'utm_source=generator';
    return embedLink;
  }
    
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000 );

    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  return (
    <div className='rounded-r-lg h-full w-[400px] border-r'>
        <div className='pt-5 pb-1 pl-7 flex gap-3 items-center justify-start'>
            <User2Icon className='border rounded-full h-7 w-7' />
            <span className='text-md text-gray-500 font-semibold font-roboto'>Agnish Bhattacharya</span>
        </div>
        <div className='pl-7 justify-start flex flex-col'>
          <div className='text-[60px] text-gray-600 font-[100] font-regular'>{date.getHours()}<span className='relative top-[-4px]'>:</span>{date.getMinutes()}</div>
          <div className='font-roboto text-lg pl-1 font-semibold text-gray-600'>{days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</div>
        </div>
        <PomodoroClock />
        <div className='flex flex-col items-center'>
          <iframe className='rounded-[12px] m-6 mt-0 mb-3' src={makeEmbedLink(spotifyLink)} width="87%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          <Popover>
            <PopoverTrigger>
              <Button variant='default' className='bg-gray-700 text-white rounded-[10px] hover:text-gray-700 font-semibold'>Change playlist</Button>            
            </PopoverTrigger>
            <PopoverContent className='p-0 border-none'>
              <div className='bg-gray-700 rounded-[10px] '>
                <input className='m-5 border bg-gray-500 px-5 py-2 rounded-[10px]' placeholder='Enter the playlist link' value={spotifyLink} onChange={(e) => {setSpotifyLink(e.target.value)}}></input>
              </div>
            </PopoverContent>
          </Popover>
        </div>
    </div>
  )
}

export default Sidebar;