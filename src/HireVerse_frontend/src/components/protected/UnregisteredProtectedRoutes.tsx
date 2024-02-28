// For pages that are only accessible to unauthenticated users -> Complete Registration
import { Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import useAuth, { AuthState } from "../../hooks/useAuth";
import useToaster from "../../hooks/useToaster";

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
                onCloseActions: () => navigate("/find-jobs"),
            });
        }
    }, [authState]);

    return children ?? <Outlet />;
}
