import DetailBox from "@/components/DetailBox";
import TabContent from "@/components/tabContent/tabContent";

export default function Home() {
    return (
        <div className="bg-[#fbfbfb] h-full glow flex-1">
            <div
                id="wrapper"
                className="w-full sm:px-10 lg:py-16 px-2 py-3 flex flex-col lg:gap-11 gap-4"
            >
                <DetailBox />
                <TabContent />
            </div>
        </div>
    );
}
