<<<<<<< HEAD
import useAuth, {AuthState} from "../../hooks/useAuth";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LoadingPagePlaceholder from "./LoadingPagePlaceholder";


export default function AuthorizedProtectedRoutes({children}: { children?: React.ReactNode }) {
    const {authState} = useAuth();
=======
import useAuth, { AuthState } from "../../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AuthorizedProtectedRoutes({children} : {children?: React.ReactNode}) {
    const { authState } = useAuth();
>>>>>>> 3c99d1d9b145ae96278fa1092f28957ef3557148

    const navigate = useNavigate();

    useEffect(() => {
        if (authState === AuthState.Unauthenticated) {
            console.log("Unauthenticated");
            navigate("/");
        } else if (authState === AuthState.Unregistered) {
            console.log("Unregistered");
            navigate("/complete-registration");
        }
<<<<<<< HEAD
        console.log("Protection for: ", authState);
    }, [authState]);

    return (
        authState === AuthState.Loading || authState == AuthState.Authenticated ? (
            children ?? <Outlet/>
        ) : (
            <LoadingPagePlaceholder />
        )
=======
    }, [authState]);

    return (
        children ?? <Outlet />
>>>>>>> 3c99d1d9b145ae96278fa1092f28957ef3557148
    );
}