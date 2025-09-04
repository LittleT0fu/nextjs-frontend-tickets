import { UserRole } from "@/context/userRoleContext";
import { House, LucideIcon, Inbox, RefreshCcw } from "lucide-react";
export interface NavItem {
    label: string;
    href?: string;
    icon?: LucideIcon;
    actions?: { type: string; role: UserRole };
}

export const getNavItems = (userRole: UserRole): NavItem[] => {
    const baseNavItems: NavItem[] = [];

    const roleSpecificItems = {
        admin: [
            ...baseNavItems,
            { label: "Home", href: "/", icon: House },
            { label: "History", href: "/history", icon: Inbox },
            {
                label: "Switch to User",
                icon: RefreshCcw,
                href: "/",
                actions: { type: "switchRole", role: "user" as UserRole },
            },
        ],
        user: [
            ...baseNavItems,
            {
                label: "Switch to Admin",
                icon: RefreshCcw,
                href: "/",
                actions: { type: "switchRole", role: "admin" as UserRole },
            },
        ],
    };

    return roleSpecificItems[userRole];
};
