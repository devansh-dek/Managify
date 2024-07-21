import Announcements from "@/features/Annoucements/Annoucements";
import CompanySlide from "@/features/Slides/CompanySlide";

function HeadingSection() {
    return (
        <div className="flex flex-col w-full">
            <div className="text-[#ef9f76] font-bold p-10 pt-0 text-3xl">
                Important Notice and announcements
            </div>
            <div className="flex border border-gray-600 rounded-[10px] ml-3 mr-10 mb-10">
                <CompanySlide />
                <Announcements />
            </div>
        </div>
    );
}

export default HeadingSection;
