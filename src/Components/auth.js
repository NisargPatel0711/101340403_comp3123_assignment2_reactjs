import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("employee-system"));

    const login = (user) => {
        setUser(user);
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("employee-system")
        sessionStorage.removeItem("employee-system")
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}
