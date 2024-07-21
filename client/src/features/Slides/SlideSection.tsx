import React, { useEffect, useState } from "react";
import GoogleSlides from "./GoogleSlides";

import { Button } from "@/components/ui/button";
import Icon from "../../assets/google_slides.png";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";

function SlideSection() {
  const defaultSlides: string | null = localStorage.getItem("slideLinks");
  const [slides, setSlides] = useState<string[]>([]);
  const [reload, setReload] = useState(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [slideLink, setSlideLink] = useState("");

  useEffect(() => {
    if (defaultSlides) {
      setSlides(JSON.parse(defaultSlides));
    }
  }, []);

  function addSlide() {
    try {
      let newSlides: string[] = slides;
      newSlides.push(slideLink);
      localStorage.setItem("slideLinks", JSON.stringify(slides));
      setSlides(newSlides);
      setIsPopoverOpen(false);
    } catch (error) {
      toast("Invalid Slide Link");
    }
  }

  function deleteSlide(index: number) {
    try {
      let slidesArray = slides;
      slidesArray.splice(index, 1);
      setSlides(slidesArray);
      setReload(reload + 1);
      localStorage.setItem("slideLinks", JSON.stringify(slidesArray));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 bg-[#51576D] m-2 rounded-[20px]">
      <div className="w-full text-lg text-white font-regular font-roboto p-3">
        <img src={Icon} className="h-20"></img>
      </div>
      {slides?.length
        ? slides.map((slideLink, i) => {
            return (
              <div key={i}>
                <GoogleSlides src={slideLink} />
                <Button
                  className="bg-[#e78284] ml-5 mb-5 text-white rounded-[10px] hover:text-[#838ba7] hover:bg-white font-semibold "
                  onClick={() => {
                    deleteSlide(i);
                  }}
                >
                  Delete Slide
                </Button>
              </div>
            );
          })
        : ""}
      {slides.length >= 3 ? (
        ""
      ) : (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <Button
              variant="default"
              className="bg-[#a6d189] text-gray-500 rounded-[10px] hover:text-gray-900 hover:bg-white font-semibold m-3"
            >
              Add Slide
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-none">
            <div className="w-96  justify-center justify-items-center bg-gray-700 rounded-[10px]">
              <input
                className="m-5 border bg-gray-500 px-5 py-2 rounded-[10px]"
                placeholder="Enter the slides embed src link"
                value={slideLink}
                onChange={(e) => setSlideLink(e.target.value)}
              />
              <Button
                onClick={addSlide}
                className="bg-[#a6d189] text-gray-500 rounded-[10px] hover:text-gray-900 hover:bg-white font-semibold m-3"
              >
                Add Slide
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default SlideSection;
