"use client";
import React from "react";
import { useUserRole, UserRole } from "@/context/userRoleContext";
import { getNavItems, NavItem } from "@/config/navConfig";
import { LogOut } from "lucide-react";

function Sidebar() {
    const { role, setRole } = useUserRole();
    const navItems = getNavItems(role);

    return (
        <div className="lg:flex lg:flex-col lg:items-start lg:w-[200px] lg:h-screen flex items-center flex-row gap-4 p-2">
            <div>
                <h1 className="text-2xl font-bold capitalize px-4">{role}</h1>
            </div>
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
        <div
            className="cursor-pointer lg:w-full flex p-2 gap-2 text-base hover:bg-[#EAF5F9] rounded-lg"
            onClick={() => {
                if (item.actions?.type === "switchRole") {
                    setRole(item.actions.role);
                }
            }}
        >
            {item.icon && <item.icon size={24} />}
            <span>{item.label}</span>
        </div>
    );
};
