import { UserRole } from "@/context/userRoleContext";
import { useUserRole } from "@/context/userRoleContext";

interface NavItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    actions?: () => void;
}

export const getNavItems = (userRole: UserRole): NavItem[] => {
    const { role, setRole } = useUserRole();

    const baseNavItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "History", href: "/history" },
    ];

    const roleSpecificItems = {
        admin: [
            ...baseNavItems,
            { label: "Switch to Admin", action: () => setRole("admin") },
        ],
        user: [
            ...baseNavItems,
            { label: "Switch to User", action: () => setRole("user") },
        ],
    };

    return roleSpecificItems[userRole];
};
