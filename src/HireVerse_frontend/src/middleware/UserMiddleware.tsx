import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
// import { HireVerse_backend } from "../../../declarations/HireVerse_backend";

export const Authenticated = () => {
    // const actor = HireVerse_backend;
    const [principal, setPrincipal] = useState<Principal | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<number>(0);

    const nav = useNavigate();

    useEffect(() => {
        const fetchPrincipal = async () => {
            // const authClient = await AuthClient.create();
            // if (await authClient.isAuthenticated()) {
            //     const identity = authClient.getIdentity().getPrincipal();
            //     // @ts-ignore
            //     setPrincipal(identity);
            //
            //     // @ts-ignore
            //     if(!principal) {
            //         nav("/login", { replace: true });
            //         return;
            //     }
            //
            //     // @ts-ignore
            //     if (!await actor.getUser(principal)) {
            //         console.log("User Not registered");
            //         nav("/register", { replace: true });
            //         return;
            //     }
            //
            //     nav("/", { replace: true });
            //     return;
            // }
        };
        fetchPrincipal();
    }, []);

    return <Outlet />;
};
