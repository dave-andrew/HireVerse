import useAuth, { AuthState } from "../../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AuthorizedProtectedRoutes({children} : {children?: React.ReactNode}) {
    const { authState } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            console.log("Unauthenticated");
            navigate("/");
        } else if (authState === AuthState.Unregistered) {
            console.log("Unregistered");
            navigate("/complete-registration");
        }
    }, [authState]);

    return (
        children ?? <Outlet />
    );
}