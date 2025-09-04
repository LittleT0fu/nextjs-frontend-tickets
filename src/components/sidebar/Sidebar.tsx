"use client";
import React from "react";
import { useUser, UserRole } from "@/context/userContext";
import { getNavItems, NavItem } from "@/config/navConfig";
import { LogOut } from "lucide-react";
import Link from "next/link";

function Sidebar() {
    const { role, setRole } = useUser();
    const navItems = getNavItems(role);

    return (
        <div className="lg:flex lg:flex-col items-start lg:w-[200px] lg:h-screen flex flex-col gap-4 p-2 border-1 border-[#E7E7E7]">
            <div>
                <h1 className="text-2xl font-bold capitalize px-4">{role}</h1>
            </div>
            <div className="sm:flex lg:flex-col lg:h-full w-full">
                <div className="lg:flex lg:flex-col lg:h-full w-full flex flex-row gap-4">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.label}
                            item={item}
                            setRole={setRole}
                        />
                    ))}
                </div>
                <div className="">
                    <SidebarItem
                        key={"logout"}
                        item={{
                            label: "Logout",
                            icon: LogOut,
                            actions: { type: "logout", role: role },
                        }}
                        setRole={setRole}
                    />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

const SidebarItem = ({
    item,
    setRole,
}: {
    item: NavItem;
    setRole: (role: UserRole) => void;
}) => {
    return (
        <Link
            href={item.href || ""}
            className="cursor-pointer lg:w-full flex p-2 gap-2 sm:text-sm text-xs hover:bg-[#EAF5F9] rounded-lg"
            onClick={() => {
                if (item.actions?.type === "switchRole") {
                    setRole(item.actions.role);
                }
            }}
        >
            {item.icon && <item.icon size={16} />}
            <span>{item.label}</span>
        </Link>
    );
};
