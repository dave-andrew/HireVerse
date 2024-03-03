// For pages that are only accessible to unauthenticated users -> Login page
import useAuth, { AuthState } from "../../hooks/useAuth";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../layouts/ManagementPageLayout";
import useToaster from "../../hooks/useToaster";

export default function UnauthenticatedProtectedRoutes({
    children,
}: {
    children?: React.ReactNode;
}) {
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

    return authState === AuthState.Authenticated ||
        authState === AuthState.Loading ||
        authState === AuthState.Unauthenticated ? (
        children ?? <Outlet />
    ) : (
        <LoadingPagePlaceholder />
    );
}
