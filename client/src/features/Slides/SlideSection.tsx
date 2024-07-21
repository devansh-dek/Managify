import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "../../assets/google_slides.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";

const GoogleSlides = ({ src }) => {
  const wrapperStyle = {
    position: "relative",
    overflow: "hidden",
    width: "640px",
    height: "360px",
  };

  const iframeStyle = {
    position: "absolute",
    top: "-40px",
    left: "-60px",
    width: "calc(100% + 120px)",
    height: "calc(100% + 80px)",
  };

  return (
    <div style={wrapperStyle}>
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen={true}
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        style={iframeStyle}
      />
    </div>
  );
};

function SlideSection() {
  const defaultSlides = localStorage.getItem("slideLinks");
  const [slides, setSlides] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [slideLink, setSlideLink] = useState("");

  useEffect(() => {
    if (defaultSlides) {
      setSlides(JSON.parse(defaultSlides));
    }
  }, []);

  function addSlide() {
    if (!slideLink) {
      toast("Please enter a slide link");
      return;
    }
    const newSlides = [...slides, slideLink];
    localStorage.setItem("slideLinks", JSON.stringify(newSlides));
    setSlides(newSlides);
    setIsPopoverOpen(false);
    setSlideLink("");
  }

  function deleteSlide(index) {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    localStorage.setItem("slideLinks", JSON.stringify(updatedSlides));
  }

  return (
    <div className="flex flex-wrap gap-2 bg-[#232634] m-2 rounded-[20px] px-4">
      <div className="w-full text-lg text-white font-regular font-roboto p-3">
        <img src={Icon} className="h-20" alt="Google Slides Icon" />
      </div>
      {slides.map((slideLink, i) => (
        <div key={i}>
          <GoogleSlides src={slideLink} />
          <Button
            className="bg-[#e78284] ml-5 mb-5 text-white rounded-[10px] hover:text-[#838ba7] hover:bg-white font-semibold"
            onClick={() => deleteSlide(i)}
          >
            Delete Slide
          </Button>
        </div>
      ))}
      {slides.length < 3 && (
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
            <div className="w-96 justify-center justify-items-center bg-gray-700 rounded-[10px]">
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
