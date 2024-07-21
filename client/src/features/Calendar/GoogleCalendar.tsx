import React from "react";
import Icon from "../../assets/google-calendar.png";

function GoogleCalendar() {
  return (
    <div className="bg-[#232634] w-fit p-8 m-3  rounded-[20px] ml-[25px]">
      <div className="flex gap-2 items-center mb-3">
        <img src={Icon} className="h-10 " />
        <span className="text-white text-xl font-[500]">Google Calender</span>
      </div>
      <iframe
        className="rounded-[20px] "
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&bgcolor=%23ffffff&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=c3VrbGEuYmFydWlwdXIyQGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTA5MTEyNTIzNTUyMDcxMzk0NzAxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043&color=%23202124"
        width="500"
        height="450"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}

export default GoogleCalendar;
