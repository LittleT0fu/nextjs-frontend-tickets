"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "user";

interface UserContextProps {
    role: UserRole;
    setRole: (role: UserRole) => void;
    username: string;
    setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>("user"); //default role
    const [username, setUsername] = useState<string>("");

    return (
        <UserContext.Provider value={{ role, setRole, username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

//custom hook to use the user role context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
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
