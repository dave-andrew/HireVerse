import useLocalStorage from "./useLocalStorage";
import { AuthClient } from "@dfinity/auth-client";
import { useCallback, useEffect } from "react";
import useService from "./useService";
import { canisterId as internetIdentityCanisterId } from "../../../declarations/internet_identity";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../../declarations/HireVerse_backend/HireVerse_backend.did";

export enum AuthState {
    Authenticated = "Authenticated",
    Unauthenticated = "Unauthenticated",
    Loading = "Loading",
    Unregistered = "Unregistered",
}

export default function useAuth() {
    const queryClient = useQueryClient();
    const { getBackendService } = useService();
    const [authState, setAuthState] = useLocalStorage<AuthState>(
        "authState",
        AuthState.Loading,
    );
    const [user, setUser] = useLocalStorage<User | null>("user", null);

    const fetchUserData = useCallback(async () => {
        // window.location.reload()
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();

        if (
            (await authClient.isAuthenticated()) &&
            identity.getPrincipal().toText() !== "2vxsx-fae"
        ) {
            if (!getBackendService) return;

            setAuthState(AuthState.Loading);

            // @ts-ignore
            // const agent = new HttpAgent({ identity: identity }) as Agent;
            // await agent.fetchRootKey();

            const getUserFunc = async () =>
                await getBackendService().then((s) =>
                    s.getUser(identity.getPrincipal()),
                );

            const userData = await queryClient.fetchQuery({
                queryKey: ["user", identity.getPrincipal()],
                queryFn: getUserFunc,
            });

            if (userData.length > 0) {
                setUser(userData[0]!);
                setAuthState(AuthState.Authenticated);
                // console.log("User found");
                return;
            }

            if (identity) {
                setAuthState(AuthState.Unregistered);
                // console.log("User not registered");

                return;
            }

            return;
        } else {
            setUser(null);
            setAuthState(AuthState.Unauthenticated);
            // console.log("User not authenticated");
        }
    }, [getBackendService]);

    const register = useCallback(
        async (
            first_name: string,
            last_name: string,
            email: string,
            date: string,
        ) => {
            const returnValue = await getBackendService().then((s) =>
                s.register(first_name, last_name, email, date),
            );

            await fetchUserData();
            return returnValue;
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
            await new Promise<void>((resolve, reject) => {
                authClient.login({
                    identityProvider: `http://${internetIdentityCanisterId}.localhost:4943/`,
                    onSuccess: () => {
                        resolve();
                        window.location.reload();
                        fetchUserData();
                    },
                    onError: reject,
                });
            });
            console.log("Login successful: ", authClient.getIdentity());
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        const authClient = await AuthClient.create();
        await authClient.logout();
        setUser(null);
        setAuthState(AuthState.Unauthenticated);
        window.location.reload();
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
