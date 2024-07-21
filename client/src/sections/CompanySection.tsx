import Poll from "@/features/Poll/Poll";
import SlideSection from "@/features/Slides/SlideSection";

function CompanySection() {
    return (
        <div>
            {/* <CompanySlide /> */}
            <div className="flex flex-row w-full">
                <Poll />
                <SlideSection />
            </div>
        </div>
    );
}

export default CompanySection;
