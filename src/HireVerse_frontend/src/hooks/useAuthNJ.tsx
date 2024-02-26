import { AuthClient } from "@dfinity/auth-client";
import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { HireVerse_backend } from "../../../declarations/HireVerse_backend";
import { User } from "../../../../.dfx/local/canisters/HireVerse_backend/service.did";

export default function useAuthNJ() {

    // Authentication State:
    // 0: Not authenticated with Internet Identity
    // 1: Authenticated with Internet Identity but not with the app
    // 2: Authenticated with Internet Identity and with the app

    const backend_service = HireVerse_backend;
    const [isAuthenticated, setIsAuthenticated] = useState(0);
    const [userData, setUserData] = useState<null | [] | User>(null);
    const [principal, setPrincipal] = useState(null);

    const fetchUserData = async () => {
        // Fetch user data from the backend -> Returns user data and automatically sets the state
        // @ts-ignore
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity().getPrincipal();
            console.log("Logged in as", identity);

            // @ts-ignore
            setPrincipal(identity);

            const data = await backend_service.getUser(identity);
            if(data && data.length > 0 && typeof (data.at(0)) !== 'undefined') {
                setUserData(data.at(0)!);
                setIsAuthenticated(2);
                return data.at(0)!;
            } else {
                setIsAuthenticated(1);
                return null;
            }

        } else {
            setIsAuthenticated(0);
            return null;
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { isAuthenticated, userData, fetchUserData};
}