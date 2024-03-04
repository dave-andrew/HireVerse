// For pages that are only accessible to unauthenticated users -> Complete Registration
import { Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import useAuth, { AuthState } from "../../hooks/useAuth";
import useToaster from "../../hooks/useToaster";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";

export default function UnregisteredProtectedRoutes({
    children,
}: {
    children?: ReactNode;
}) {
    const { authState } = useAuth();
    const { warnToast } = useToaster();
    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            warnToast({
                message: "You must be logged in to use this feature",
                onCloseActions: () => navigate("/"),
            });
        } else if (authState === AuthState.Authenticated) {
            warnToast({
                message: "You are already registered as a user",
                onCloseActions: () => navigate("/find-job"),
            });
        }
    }, [authState]);

    return authState == AuthState.Unregistered ||
        authState == AuthState.Loading ? (
        children ?? <Outlet />
    ) : (
        <LoadingPagePlaceholder />
    );
}
