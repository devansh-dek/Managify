import { useEffect, useState } from "react";

interface propsObj {
  src: string;
}

function GoogleSlides(props: propsObj) {
  const st: string = props.src;
  const [slideLink, setSlideLink] = useState<string>(st);

  useEffect(() => {
    setSlideLink(props.src);
    console.log(slideLink);
  }, [props]);

  return (
    <div className="relative flex overflow-hidden w-[500px] h-[280px] p-10 m-5 ml-10">
      <iframe
        src={props.src}
        frameBorder="0"
        allowFullScreen={true}
        className="absolute left-[-30px] w-[calc(100% + 60px)] w-[calc(100% + 40px)]"
      />
    </div>
  );
}

export default GoogleSlides;
