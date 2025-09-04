import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useUser, UserRole } from "@/context/userContext";
import { Trash2, CircleX } from "lucide-react";
import { API_URL, UserName } from "@/config/Configuraton";
import { useConcert } from "@/context/concertContext";

import { toast } from "react-hot-toast";

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
    const { concertList, isLoading, refreshConcertList } = useConcert();

    useEffect(() => {
        refreshConcertList();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {concertList.map((concert) => (
                <ConcertCard
                    key={concert._id}
                    concert={concert}
                    role={role}
                    onRefresh={refreshConcertList}
                />
            ))}
        </div>
    );
}

const ConcertCard = ({
    concert,
    role,
    onRefresh,
}: {
    concert: any;
    role: UserRole;
    onRefresh: () => void;
}) => {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const handleDelete = async () => {
        const loadingToast = toast.loading("Deleting concert...");
        const res = await fetch(API_URL + `/concerts/${concert._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        toast.dismiss(loadingToast);
        setIsDeleteConfirmOpen(false);
        if (res.ok) {
            toast.success("Concert deleted successfully!");
            await onRefresh();
        } else {
            toast.error("Failed to delete concert.");
        }
    };

    const handleReserve = async () => {
        const loadingToast = toast.loading("Reserving concert...");
        const res = await fetch(API_URL + `/concerts/${concert._id}/reserve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        toast.dismiss(loadingToast);
        if (res.ok) {
            toast.success("Concert reserved successfully!");
            await onRefresh();
        } else {
            toast.error("Failed to reserve concert.");
        }
    };

    const handleCancel = async () => {
        const loadingToast = toast.loading("Canceling concert...");
        const res = await fetch(API_URL + `/concerts/${concert._id}/reserve`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        toast.dismiss(loadingToast);
        if (res.ok) {
            toast.success("Concert canceled successfully!");
            await onRefresh();
        } else {
            toast.error("Failed to cancel concert.");
        }
    };

    const buttonStyle =
        "text-white px-3 py-2 rounded-sm flex gap-1 items-center cursor-pointer";
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
                        <button
                            onClick={() => setIsDeleteConfirmOpen(true)}
                            className={`bg-[#E84E4E] hover:bg-[#c73e3e] ${buttonStyle}`}
                        >
                            <Trash2 size={18} strokeWidth={1} />
                            Delete
                        </button>
                    )}
                    {isDeleteConfirmOpen && (
                        <ConfirmDeletePopup>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center">
                                    <CircleX
                                        size={44}
                                        strokeWidth={2}
                                        color="white"
                                        fill="red"
                                    />
                                </div>
                                <div
                                    id="content-cnfirm-delete"
                                    className="font-bold flex flex-col justify-center text-center"
                                >
                                    <span>Are you sure to delete?</span>
                                    <span>"{concert.name}"</span>
                                </div>
                                <div
                                    id="button-confirm-delete"
                                    className="flex gap-2 justify-center"
                                >
                                    <button
                                        onClick={() =>
                                            setIsDeleteConfirmOpen(false)
                                        }
                                        className={`bg-white hover:bg-gray-100 text-black border-1 border-[#C2C2C2]${buttonStyle}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className={`bg-[#E84E4E] hover:bg-[#c73e3e] ${buttonStyle}`}
                                    >
                                        Yes,Delete
                                    </button>
                                </div>
                            </div>
                        </ConfirmDeletePopup>
                    )}
                    {role === "user" &&
                        !concert.isUserReserved &&
                        !concert.isSeatFull && (
                            <button
                                onClick={handleReserve}
                                className={`bg-[#1692EC] hover:bg-[#1282d4] ${buttonStyle}`}
                            >
                                Reserve
                            </button>
                        )}
                    {role === "user" && concert.isUserReserved && (
                        <button
                            onClick={handleCancel}
                            className={`bg-[#E84E4E] hover:bg-[#c73e3e] ${buttonStyle}`}
                        >
                            Cancel
                        </button>
                    )}
                    {concert.isSeatFull && (
                        <button
                            className={`bg-gray-400 cursor-none ${buttonStyle}`}
                        >
                            Full
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const ConfirmDeletePopup = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
                {children}
            </div>
        </div>
    );
};
