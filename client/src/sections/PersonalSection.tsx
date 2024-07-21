import GoogleCalendar from '@/features/Calendar/GoogleCalendar'
import SlideSection from '@/features/Slides/SlideSection'
import React, { Suspense } from 'react'

function PersonalSection() {
    return (
        <>

            <div className="flex flex-col w-screen overflow-y-scroll pl-[400px]">

                <Suspense>
                    <SlideSection />
                </Suspense>
                <GoogleCalendar />
            </div>

        </>


    )
}

export default PersonalSection


