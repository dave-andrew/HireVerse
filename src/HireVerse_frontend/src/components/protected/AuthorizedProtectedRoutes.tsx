import useAuth, { AuthState } from "../../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../layouts/ManagementPageLayout";

export default function AuthorizedProtectedRoutes({
    children,
}: {
    children?: ReactNode;
}) {
    const { authState } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            // console.log("Unauthenticated");
            toast.warn(
                "You must be logged in to use this feature",
                defaultToastOptions,
            );
            setTimeout(() => {
                navigate("/");
            }, defaultToastOptions.autoClose || 3000);
        } else if (authState === AuthState.Unregistered) {
            // console.log("Unregistered");
            toast("You must complete your registration first");
            setTimeout(() => {
                navigate("/complete-registration");
            }, defaultToastOptions.autoClose || 3000);
        }
        console.log("Protection for: ", authState);
    }, [authState]);

    return authState === AuthState.Loading ||
        authState == AuthState.Authenticated ? (
        children ?? <Outlet />
    ) : (
        <LoadingPagePlaceholder />
    );
}
