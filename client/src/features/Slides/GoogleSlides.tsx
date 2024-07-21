import { Button } from "@/components/ui/button";
import React from "react";

interface propsObj {
  src: string;
}

function GoogleSlides(props: propsObj) {
  return (
    <div className="m-5 mt-0 mx-2">
      <iframe
        className="rounded-[15px] "
        src={props.src}
        frameBorder="0"
        width="300"
        height="200"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default GoogleSlides;
