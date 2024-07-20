import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Spotify() {
  const [spotifyLink, setSpotifyLink] = useState('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=a7b105a5efab4fc3');
  const [embedLink, setEmbedLink] = useState('https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const makeEmbedLink = (link: string) => {
    try {
      const linkparts = link.split('playlist');
      const linkend = linkparts[1].split('si');
      return linkparts[0] + 'embed/playlist' + linkend[0] + 'utm_source=generator';
    } catch (error) {
      console.error(error);
      toast("Enter Valid Playlist Link!");
      return embedLink;
    }
  };

  const changePlayList = () => {
    try {
      const newEmbedLink = makeEmbedLink(spotifyLink);
      if (newEmbedLink !== embedLink) {
        setEmbedLink(newEmbedLink);
      }
      else {
        // toast("Enter Valid Playlist Link!");
      }
      setIsPopoverOpen(false);
    } catch (error) {
      toast("Enter Valid Playlist Link!");
    }
  };

  return (
    <div className='flex flex-col items-center'>

      <iframe
        className='rounded-[12px] m-6 mt-0 mb-3'
        src={embedLink}
        width="87%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe> 

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          <Button variant='default' className='bg-gray-700 text-white rounded-[10px] hover:text-gray-700 font-semibold'>Change playlist</Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 border-none'>
          <div className='bg-gray-700 rounded-[10px]'>
            <input
              className='m-5 border bg-gray-500 px-5 py-2 rounded-[10px]'
              placeholder='Enter the playlist link'
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
            />
            <Button onClick={changePlayList} className=' bg-green-500 text-white rounded-[10px]'>Update Playlist</Button>
          </div>
        </PopoverContent>
      </Popover>
      <ToastContainer />
    </div>
  );
}

export default Spotify;
