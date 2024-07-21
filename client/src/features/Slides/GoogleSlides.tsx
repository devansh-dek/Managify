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
  }, [props])
  return (
    <div className="m-5 mt-0 mx-2">
      <iframe
        className="rounded-[15px] "
        src={slideLink}
        frameBorder="0"
        width="300"
        height="200"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default GoogleSlides;
