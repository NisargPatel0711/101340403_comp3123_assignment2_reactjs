import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" />;
    }
    return children;
}
