import React from 'react';
import Icon from '../../assets/google_calendar.png';

function GoogleCalendar() {
  return (
    <div className='bg-[#51576D] w-fit p-5 m-3 rounded-[20px] shadow-widget'>
        <div className='flex gap-2 items-center mb-3'>
            <img src={Icon} className='h-12' /><span className='text-[#232121] text-2xl font-[500] font-roboto'>Google <span className='font-normal'>Calendar</span></span>
        </div>
        <iframe className='rounded-[20px] shadow-widget' src="https://calendar.google.com/calendar/embed?src=sukla.baruipur2%40gmail.com&ctz=UTC&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showTz=0&showCalendars=0" width="600" height="500" frameBorder="0" scrolling="no"></iframe>
    </div>
  )
}

export default GoogleCalendar;