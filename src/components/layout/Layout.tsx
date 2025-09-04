import React from "react";
import Sidebar from "../sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex lg:flex-row flex-col h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
