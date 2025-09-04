"use client";
import React from "react";
import { useState } from "react";
import Overview from "./overView/Overview";
import CreateConcert from "./createConcert/CreateConcert";

const tabNavigationStyle = "";

const tabList = [
    {
        label: "Overview",
        value: "overview",
        content: <Overview />,
    },
    {
        label: "Create",
        value: "create-concert",
        content: <CreateConcert />,
    },
];

function tabContent() {
    const [activeTab, setActiveTab] = useState<string>("overview");
    return (
        <div className="flex flex-col lg:gap-4 gap-2">
            <div
                id="tab-navigation"
                className="flex overflow-x-auto whitespace-nowrap"
            >
                {tabList.map((tab) => (
                    <button
                        key={tab.value}
                        className={`px-3 py-2 text-base ${
                            activeTab === tab.value
                                ? "text-[#1692EC] border-b-2 border-[#1692EC]"
                                : "text-[#5C5C5C]"
                        }`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div id="tab-content" className="flex-1">
                {tabList.find((tab) => tab.value === activeTab)?.content}
            </div>
        </div>
    );
}

export default tabContent;
