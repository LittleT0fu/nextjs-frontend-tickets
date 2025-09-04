"use client";
import React from "react";
import { useUserRole, UserRole } from "@/context/userRoleContext";
import { getNavItems, NavItem } from "@/config/navConfig";

function Sidebar() {
    const { role, setRole } = useUserRole();
    const navItems = getNavItems(role);

    return (
        <div>
            <div>
                <h1>{role}</h1>
            </div>
            <div>
                {navItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        item={item}
                        setRole={setRole}
                    />
                ))}
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
            className="cursor-pointer flex items-center gap-2"
            onClick={() => {
                if (item.actions?.type === "switchRole") {
                    setRole(item.actions.role);
                }
            }}
        >
            {item.icon && <item.icon />}
            <span>{item.label}</span>
        </div>
    );
};
