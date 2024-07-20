import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Spotify() {
    const [spotifyLink, setSpotifyLink] = useState('https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=a7b105a5efab4fc3');

    function makeEmbedLink(link: string) {
        const linkparts = link.split('playlist');
        const linkend = linkparts[1].split('si');
        const embedLink = linkparts[0]+'embed/playlist'+linkend[0]+'utm_source=generator';
        return embedLink;
    }

    return (
        <div className='flex flex-col items-center'>
          {spotifyLink?.length ? 
          <iframe className='rounded-[12px] m-6 mt-0 mb-3' src={makeEmbedLink(spotifyLink)} width="87%" height="152" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> :
          <div className='font-semibold font-lg p-10'>No valid playlist</div>
          }
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
    )
}

export default Spotify;