import React, { useEffect, useState } from 'react'
import GoogleSlides from './GoogleSlides'

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from 'react-toastify';

function SlideSection() {
    const defaultSlides: string | null = localStorage.getItem('slideLinks');
    const [slides, setSlides] = useState<string[]>([]);
    const [reload, setReload] = useState(0);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [slideLink, setSlideLink] = useState('');

    useEffect(() => {
        if (defaultSlides) {
            setSlides(JSON.parse(defaultSlides));
        }
    }, []);

    function addSlide() {
        try {
            let newSlides: string[] = slides;
            newSlides.push(slideLink);
            localStorage.setItem('slideLinks', JSON.stringify(slides));
            setSlides(newSlides);
            setIsPopoverOpen(false);
        } catch (error) {
            toast('Invalid Slide Link');
        }
    }

    function deleteSlide(index: number) {
        try { 
            let slidesArray = slides;
            slidesArray.splice(index, 1);
            setSlides(slidesArray);
            setReload(reload+1);
            localStorage.setItem('slideLinks', JSON.stringify(slidesArray));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex gap-2'>
            {slides?.length ? slides.map((slideLink, i) => {
                return(
                    <div key={i}>
                        <GoogleSlides src={slideLink} />
                        <Button className='bg-gray-700 text-white rounded-[10px] hover:text-gray-700 font-semibold' onClick={() => { deleteSlide(i) }}>Delete Slide</Button>
                    </div>
                )
            }) : ''}
            {slides.length >= 3 ? '' : 
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
                <Button variant='default' className='bg-gray-700 text-white rounded-[10px] hover:text-gray-700 font-semibold m-10'>Add Slide</Button>
                </PopoverTrigger>
                <PopoverContent className='p-0 border-none'>
                <div className='bg-gray-700 rounded-[10px]'>
                    <input
                    className='m-5 border bg-gray-500 px-5 py-2 rounded-[10px]'
                    placeholder='Enter the slides embed src link'
                    value={slideLink}
                    onChange={(e) => setSlideLink(e.target.value)}
                    />
                    <Button onClick={addSlide} className=' bg-green-500 text-white rounded-[10px] m-5'>Add Slide</Button>
                </div>
                </PopoverContent>
            </Popover>}
        </div>
    )
}

export default SlideSection;