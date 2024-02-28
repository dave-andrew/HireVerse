// For pages that are only accessible to unauthenticated users -> Login page
import useAuth, {AuthState} from "../../hooks/useAuth";
import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";


export default function UnauthenticatedProtectedRoutes({children}: { children?: React.ReactNode }) {


    const {authState} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unregistered) {
            console.log("Unregistered");
            navigate("/complete-registration");
        }
    }, [authState]);


    return (
        authState === AuthState.Authenticated || authState === AuthState.Loading || authState === AuthState.Unauthenticated ? (
            children ?? <Outlet/>
        ) : (
            <LoadingPagePlaceholder/>
        )
    );
}