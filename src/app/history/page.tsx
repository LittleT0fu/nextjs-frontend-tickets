"use client";
import React from "react";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/Configuraton";

function page() {
    const [isLoading, setIsLoading] = useState(false);
    const [ReserveList, setReserveList] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);
        try {
            getReservationList();
        } catch (error) {
            console.error("Failed to fetch concert list:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getReservationList = async () => {
        const res = await fetch(API_URL + `/concerts/reserve`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        setReserveList(data.reservations);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                Loading
            </div>
        );
    }

    const thStyle =
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b";

    const tdStyle = "px-6 py-4 whitespace-nowrap text-sm text-gray-900";

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-50">
                    <tr>
                        <th className={thStyle}>Date Time</th>
                        <th className={thStyle}>Username</th>
                        <th className={thStyle}>Concert Name</th>
                        <th className={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {ReserveList.map((reserve, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className={tdStyle}>{reserve.reservedAt}</td>
                            <td className={tdStyle}>{reserve.userName}</td>
                            <td className={tdStyle}>{reserve.concertName}</td>
                            <td className={tdStyle}>{reserve.action}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default page;
