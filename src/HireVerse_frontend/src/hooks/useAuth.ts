import useLocalStorage from "./useLocalStorage";
import { User } from "../../../../.dfx/local/canisters/HireVerse_backend/service.did";
import { AuthClient } from "@dfinity/auth-client";
import { useCallback, useEffect } from "react";
import { Agent, HttpAgent } from "@dfinity/agent";
import useService from "./useService";

export enum AuthState {
    Authenticated = "Authenticated",
    Unauthenticated = "Unauthenticated",
    Loading = "Loading",
    Unregistered = "Unregistered",
}

export default function useAuth() {
    const { backendService } = useService();
    const [authState, setAuthState] = useLocalStorage<AuthState>(
        "authState",
        AuthState.Loading,
    );
    const [user, setUser] = useLocalStorage<User | null>("user", null);

    const fetchUserData = useCallback(async () => {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        if (
            (await authClient.isAuthenticated()) &&
            identity.getPrincipal().toText() !== "2vxsx-fae"
        ) {
            if (!backendService) return;

            setAuthState(AuthState.Loading);

            // @ts-ignore
            const agent = new HttpAgent({ identity: identity }) as Agent;

            // const actor = createActor(
            //     companyCanisterId,
            //     // @ts-ignore
            //     { agent },
            // );
            //
            // // console.log(
            // //     await actor.addManager("fdb86206-89e5-4fc6-9161-acd9521b744d"),
            // // );

            const userData = await backendService.getUser(
                identity.getPrincipal(),
            );

            console.log("User Data: ", userData);

            console.log(
                "All registered users: ",
                await backendService.getAllUsers(),
            );
            if (userData.length > 0) {
                setUser(userData[0]!);
                setAuthState(AuthState.Authenticated);
                console.log("User found");
                return;
            }

            if (identity) {
                setAuthState(AuthState.Unregistered);
                console.log("User not registered");

                return;
            }

            // const tempUser: User = {
            //     internet_identity: identity,
            //     first_name: "Ronald",
            //     last_name: "McDonald",
            //     // @ts-ignore
            //     timestamp: Date.now(),
            //     company_ids: [],
            //     birth_date: "",
            //     email: "Ronald@gmail.com",
            //     selected_company_id: [],
            // };
            // setUser(tempUser);
            setAuthState(AuthState.Authenticated);
            console.log(user);
            // setUser(null);
            // setAuthState(AuthState.Unregistered);
            // console.log("User not found");
            return;
        }
        setUser(null);
        setAuthState(AuthState.Unauthenticated);
        console.log("User not authenticated");
    }, [backendService]);

    const register = useCallback(
        async (
            first_name: string,
            last_name: string,
            email: string,
            date: string,
        ) => {
            const returnValue = await backendService.register(
                first_name,
                last_name,
                email,
                date,
            );
            await fetchUserData();
            console.log("Return value dari register: ", returnValue);
        },
        [],
    );

    const getPrincipal = useCallback(async () => {
        const authClient = await AuthClient.create();
        return authClient.getIdentity().getPrincipal();
    }, []);

    const getIdentity = useCallback(async () => {
        const authClient = await AuthClient.create();
        return authClient.getIdentity();
    }, []);

    const login = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                identityProvider:
                    "http://bnz7o-iuaaa-aaaaa-qaaaa-cai.localhost:4943/",
                // identityProvider: `http://${internetIdentityCanisterId}.localhost:4943/`,
                // "https://identity.ic0.app/",
                onSuccess: () => fetchUserData(),
            });
            console.log("Logged in as", authClient.getIdentity());
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setUser(null);
        setAuthState(AuthState.Unauthenticated);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return {
        user,
        authState,
        getPrincipal,
        getIdentity,
        login,
        logout,
        register,
    };
}
