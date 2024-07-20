import { Button } from '@/components/ui/button'
import React from 'react';

interface propsObj {
    src: string
}

function GoogleSlides(props: propsObj) {
  return (
    <div className='m-5 mx-1'>
        <iframe className='rounded-[20px] shadow-widget' src={props.src} frameBorder="0" width="350" height="250" allowFullScreen></iframe>
    </div>
  )
}

export default GoogleSlides;