import { Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";
import useToaster from "../../hooks/useToaster";
import useAuth from "../../hooks/useAuth";
import { AuthState } from "../context/AuthContext";

export default function AuthorizedProtectedRoutes({ children }: { children?: ReactNode }) {
    const { authState } = useAuth();
    const { warnToast } = useToaster();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            warnToast({
                message: "You must be logged in to use this feature",
                onCloseActions: () => navigate("/"),
            });
        } else if (authState === AuthState.Unregistered) {
            console.log("Unregistered");
            warnToast({
                message: "You must complete your registration first",
                onCloseActions: () => navigate("/complete-registration"),
            });
        }
        console.log("Protection for: ", authState);
    }, [authState]);

    return authState === AuthState.Loading || authState == AuthState.Authenticated ? children ?? <Outlet /> : <LoadingPagePlaceholder />;
}
