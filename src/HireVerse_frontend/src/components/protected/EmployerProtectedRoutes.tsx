import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../layouts/ManagementPageLayout";
import useAuth from "../../hooks/useAuth";
import { AuthState } from "../context/AuthContext";

export default function EmployerProtectedRoutes({ children }: { children?: React.ReactNode }) {
    const { authState } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            toast.warn("You must be logged in to use this feature", defaultToastOptions);
            navigate("/");
        } else if (authState === AuthState.Unregistered) {
            toast.warn("Please complete your registration first", defaultToastOptions);
            navigate("/complete-registration");
        }
    }, [authState]);

    return authState === AuthState.Loading || authState == AuthState.Authenticated ? children ?? <Outlet /> : <LoadingPagePlaceholder />;
}
