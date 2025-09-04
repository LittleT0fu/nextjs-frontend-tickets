import React from "react";
import { User } from "lucide-react";
import { useUser, UserRole } from "@/context/userContext";
import { Trash2 } from "lucide-react";

const tempConcertList = [
    {
        _id: "68b7b18e13e469ac4852c9d2",
        name: "So_Hungry",
        description: "i can fly",
        seat: 25,
        createdAt: "2025-09-03T03:10:06.887Z",
        updatedAt: "2025-09-03T11:51:26.794Z",
        __v: 0,
        isUserReserved: true,
        isSeatFull: false,
    },
    {
        _id: "68b7f76fe2f98df47ca12fd4",
        name: "So_Hungry3",
        description: "i can fly",
        seat: 10,
        createdAt: "2025-09-03T08:08:15.304Z",
        updatedAt: "2025-09-04T01:39:25.121Z",
        __v: 0,
        isUserReserved: false,
        isSeatFull: true,
    },
];

export default function Overview() {
    const { role } = useUser();
    return (
        <div className="flex flex-col gap-6">
            {tempConcertList.map((concert) => (
                <ConcertCard key={concert._id} concert={concert} role={role} />
            ))}
        </div>
    );
}

const ConcertCard = ({
    concert,
    role,
}: {
    concert: (typeof tempConcertList)[0];
    role: UserRole;
}) => {
    const buttonStyle =
        "text-white px-3 py-2 rounded-sm flex gap-1 items-center";
    return (
        <div
            key={concert._id}
            className="flex flex-col gap-4 p-6 rounded-lg bg-white border-1 border-[#C2C2C2]"
        >
            <h1 className="text-[#1692EC] text-2xl font-semibold">
                {concert.name}
            </h1>
            <hr className="border-[#C2C2C2]" />
            <span>{concert.description}</span>
            <div className="flex justify-between">
                <span className="flex items-center gap-2">
                    <User size={18} strokeWidth={1} />
                    {concert.seat}
                </span>
                <div id="button-section" className="flex gap-2">
                    {role === "admin" && (
                        <button className={`bg-[#E84E4E] ${buttonStyle}`}>
                            <Trash2 size={18} strokeWidth={1} />
                            Delete
                        </button>
                    )}
                    {role === "user" &&
                        !concert.isUserReserved &&
                        !concert.isSeatFull && (
                            <button className={`bg-[#1692EC] ${buttonStyle}`}>
                                Reserve
                            </button>
                        )}
                    {role === "user" && concert.isUserReserved && (
                        <button className={`bg-[#E84E4E] ${buttonStyle}`}>
                            Cancel
                        </button>
                    )}
                    {concert.isSeatFull && (
                        <button className={`bg-gray-400 ${buttonStyle}`}>
                            Full
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
