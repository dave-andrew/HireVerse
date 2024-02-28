// For pages that are only accessible to unauthenticated users -> Complete Registration
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth, { AuthState } from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {defaultToastOptions} from "../../layouts/ManagementPageLayout";

export default function UnregisteredProtectedRoutes({ children }: { children?: React.ReactNode }) {
    const { authState } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            // console.log("Unauthenticated");
            toast.warn("You must be logged in to use this feature", defaultToastOptions);
            navigate("/");
        } else if (authState === AuthState.Authenticated) {
            // console.log("Authenticated");
            toast.warn("You are already registered as a user", defaultToastOptions);
            navigate("/find-job");
        }
    }, [authState]);

    return (
            children ?? <Outlet/>
    );
}