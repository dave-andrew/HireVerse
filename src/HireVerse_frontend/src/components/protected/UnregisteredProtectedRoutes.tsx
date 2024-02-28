// For pages that are only accessible to unauthenticated users -> Complete Registration
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import useAuth, {AuthState} from "../../hooks/useAuth";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";

export default function UnregisteredProtectedRoutes({ children }: { children?: React.ReactNode }) {
    const { authState } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            console.log("Unauthenticated");
            navigate("/");
        } else if (authState === AuthState.Authenticated) {
            console.log("Authenticated");
            navigate("/find-job");
        }
    }, [authState]);

    return (
            children ?? <Outlet/>
    );
}