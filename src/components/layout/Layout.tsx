import React from "react";
import Sidebar from "../sidebar/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:flex">
            <Sidebar />
            <main className="bg-gray-200">{children}</main>
        </div>
    );
}
