import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface propsObj {
  src: string;
}

function GoogleSlides(props: propsObj) {
  const st: string = props.src;
  const [slideLink, setSlideLink] = useState<string>(st);

  useEffect(() => {
    setSlideLink(props.src);
  }, [props]);

  const iframeStyle = {
    position: "absolute",
    top: "-0px",
    left: "-30px",
    width: "calc(100% + 60px)",
    height: "calc(100% + 40px)",
  };

  return (
    <div className="relative flex overflow-hidden w-[500px] h-[280px] p-10 m-5 ml-10">
      <iframe
        src={props.src}
        frameBorder="0"
        allowFullScreen={true}
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        style={iframeStyle}
      />
    </div>
  );
}

export default GoogleSlides;
