"use client";
import DetailBox from "@/components/DetailBox";
import TabContent from "@/components/tabContent/tabContent";
import Overview from "@/components/tabContent/overView/Overview";
import { useUser } from "@/context/userContext";

export default function Home() {
    const { role } = useUser();
    return (
        <div className="bg-[#fbfbfb] h-full flex-1">
            <div
                id="wrapper"
                className="w-full sm:px-10 lg:py-8 px-2 py-3 flex flex-col lg:gap-11 gap-4 overflow-y-scroll"
            >
                {role === "admin" && <DetailBox />}
                {role === "admin" && <TabContent />}
                {role === "user" && <Overview />}
            </div>
        </div>
    );
}
