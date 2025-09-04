"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "admin" | "user";

interface UserRoleContextProps {
    role: UserRole;
    setRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(
    undefined
);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>("user"); //default role

    return (
        <UserRoleContext.Provider value={{ role, setRole }}>
            {children}
        </UserRoleContext.Provider>
    );
};


//custom hook to use the user role context
export const useUserRole = () => {
    const context = useContext(UserRoleContext);
    if (!context) {
        throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return context;
};


//? How to use
// "use client";
// import { useUserRole } from "@/context/UserRoleContext";

// export default function Dashboard() {
//     const { role, setRole } = useUserRole();

//     return (
//         <div>
//             <h1>Current role: {role}</h1>
//             <button onClick={() => setRole("admin")}>Switch to Admin</button>
//             <button onClick={() => setRole("user")}>Switch to User</button>
//         </div>
//     );
// }
