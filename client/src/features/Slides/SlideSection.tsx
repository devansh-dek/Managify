import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "../../assets/google.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";

interface srcObj {
  src: string;
}

const GoogleSlides = ({ src }: srcObj) => {
  return (
    <div className="relative overflow-hidden w-[320px] h-[180px] mx-3 p-10">
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen={true}
        className="absolute left-[-30px] w-[calc(100% + 60px)] w-[calc(100% + 40px)]"
      />
    </div>
  );
};

function SlideSection() {
  const defaultSlides = localStorage.getItem("slideLinks");
  const [slides, setSlides] = useState<string[]>([]);
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
    const newSlides:string[] = [...slides, slideLink];
    localStorage.setItem("slideLinks", JSON.stringify(newSlides));
    setSlides(newSlides);
    setIsPopoverOpen(false);
    setSlideLink("");
  }

  function deleteSlide(index: number) {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    localStorage.setItem("slideLinks", JSON.stringify(updatedSlides));
  }

  return (
    <div className="flex flex-col p-4 bg-[#232634] mx-5  rounded-[20px] px-6 w-[450px] m-[25px] ">
      <div className="w-full flex flex-wrap text-lg text-white font-regular  p-3">
        <img src={Icon} className="h-12" alt="Google Slides Icon" />
        <p className="text-white text-xl mb-10 pt-[12px] font-[500] ">
          My Slides
        </p>
      </div>
      {slides.map((slideLink, i) => (
        <div key={i}>
          <GoogleSlides src={slideLink} />
          <Button
            className="bg-[#e78284] ml-5 my-5 text-white rounded-[10px] hover:text-[#838ba7] hover:bg-white font-semibold"
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
