import React from "react";
import { User, Award, XCircle } from "lucide-react";

export default function DetailBox() {
    const box =
        "flex-1 rounded-lg flex flex-col justify-center items-center sm:h-[234px] h-[144px] gap-4";
    return (
        <div
            id="detail-box"
            className="flex items-center justify-between lg:gap-[35px] sm:gap-4 gap-2 text-white"
        >
            <div id="totalseat" className={`bg-[#0070A4] ${box}`}>
                <User size={44} strokeWidth={1} />
                <span>Total of seats</span>
                <span className="sm:text-4xl">500</span>
            </div>
            <div id="reserve" className={`bg-[#00A58B] ${box}`}>
                <Award size={44} strokeWidth={1} />
                <span>Reserve</span>
                <span className="sm:text-4xl">120</span>
            </div>
            <div id="cancle" className={`bg-[#E84E4E] ${box}`}>
                <XCircle size={44} strokeWidth={1} />
                <span>Cancle</span>
                <span className="sm:text-4xl">12</span>
            </div>
        </div>
    );
}
