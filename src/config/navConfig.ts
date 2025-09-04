import { UserRole } from "@/context/userRoleContext";

export interface NavItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    actions?: { type: string; role: UserRole };
}

export const getNavItems = (userRole: UserRole): NavItem[] => {
    const baseNavItems: NavItem[] = [];

    const roleSpecificItems = {
        admin: [
            ...baseNavItems,
            { label: "Home", href: "/" },
            { label: "History", href: "/history" },
            {
                label: "Switch to User",
                actions: { type: "switchRole", role: "user" as UserRole },
            },
        ],
        user: [
            ...baseNavItems,
            {
                label: "Switch to Admin",
                actions: { type: "switchRole", role: "admin" as UserRole },
            },
        ],
    };

    return roleSpecificItems[userRole];
};
