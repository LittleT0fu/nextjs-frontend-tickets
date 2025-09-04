"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { API_URL, UserName } from "@/config/Configuraton";

interface Concert {
    _id: string;
    name: string;
    description: string;
    seat: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isUserReserved: boolean;
    isSeatFull: boolean;
}

interface ConcertContextProps {
    concertList: Concert[];
    isLoading: boolean;
    refreshConcertList: () => Promise<void>;
}

const ConcertContext = createContext<ConcertContextProps | undefined>(
    undefined
);

export const ConcertProvider = ({ children }: { children: ReactNode }) => {
    const [concertList, setConcertList] = useState<Concert[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const refreshConcertList = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(
                API_URL + `/concerts?userName=${UserName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await res.json();
            setConcertList(data);
        } catch (error) {
            console.error("Failed to fetch concert list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ConcertContext.Provider
            value={{ concertList, isLoading, refreshConcertList }}
        >
            {children}
        </ConcertContext.Provider>
    );
};

export const useConcert = () => {
    const context = useContext(ConcertContext);
    if (!context) {
        throw new Error("useConcert must be used within a ConcertProvider");
    }
    return context;
};
