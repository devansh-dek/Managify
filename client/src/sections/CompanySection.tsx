import Annoucements from '@/features/Annoucements/Annoucements'
import CompanySlide from '@/features/Slides/CompanySlide'
import React from 'react'




function CompanySection() {
    return (
        <div>
            {/* <CompanySlide /> */}
            <div className="flex flex-col w-screen overflow-y-scroll pl-[400px] overflow-x-hidden">
                <Annoucements />
                <h1>Company Section</h1>
            </div>
        </div>
    )
}

export default CompanySection