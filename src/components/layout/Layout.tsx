import React from "react";
import Sidebar from "../sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex lg:flex-row flex-col">
            <Sidebar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
