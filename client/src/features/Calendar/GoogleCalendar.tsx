import React from "react";
import Icon from "../../assets/google_calendar.png";

function GoogleCalendar() {
  return (
    <div className="bg-[#414559] w-fit p-5 m-3 rounded-[20px]">
      <div className="flex gap-2 items-center mb-3">
        <img src={Icon} className="h-12" />
        <span className="text-[#232121] text-2xl font-[500] font-roboto">
          Google <span className="font-normal">Calendar</span>
        </span>
      </div>
      <iframe
        className="rounded-[20px] "
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&bgcolor=%23616161&showTitle=0&showDate=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=a3VtYXJhbnViaGF2MjAwMjZAZ21haWwuY29t&src=Y2xhc3Nyb29tMTEzMDUxNjAwNzQwNzMxOTAwNjc1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y2xhc3Nyb29tMTExNDMzOTg3Njc4Nzg3OTI5MDAzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23007b83&color=%2333B679&color=%230047a8&color=%230B8043"
        width="400"
        height="400"
        frameborder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}

export default GoogleCalendar;
