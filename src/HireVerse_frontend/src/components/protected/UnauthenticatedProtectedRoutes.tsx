// For pages that are only accessible to unauthenticated users -> Login page
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";
import useToaster from "../../hooks/useToaster";
import useAuth from "../../hooks/useAuth";
import { AuthState } from "../context/AuthContext";

export default function UnauthenticatedProtectedRoutes({ children }: { children?: React.ReactNode }) {
    const { authState } = useAuth();
    const navigate = useNavigate();
    const { warnToast } = useToaster();

    useEffect(() => {
        if (authState === AuthState.Unregistered) {
            warnToast({
                message: "You must complete your registration first",
                onCloseActions: () => navigate("/complete-registration"),
            });
        }
    }, [authState]);

    return authState === AuthState.Authenticated || authState === AuthState.Loading || authState === AuthState.Unauthenticated ? (
        children ?? <Outlet />
    ) : (
        <LoadingPagePlaceholder />
    );
}
