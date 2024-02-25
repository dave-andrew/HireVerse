import useLocalStorage from "./useLocalStorage";
import { User } from "../../../../.dfx/local/canisters/HireVerse_backend/service.did";
import { AuthClient } from "@dfinity/auth-client";
import { useCallback, useEffect, useState } from "react";
import { HireVerse_backend } from "../../../declarations/HireVerse_backend";

const backendService = HireVerse_backend;

export enum AuthState {
    Authenticated = "Authenticated",
    Unauthenticated = "Unauthenticated",
    Loading = "Loading",
    Unregistered = "Unregistered",
}

export default function useAuth() {
    const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);
    const [user, setUser] = useLocalStorage<User | null>("user", null);

    const fetchUserData = useCallback(async () => {
        const authClient = await AuthClient.create();
        if ((await authClient.isAuthenticated()) && !user) {
            console.log("Fetching user data");
            setAuthState(AuthState.Loading);
            const identity = authClient.getIdentity().getPrincipal();
            const userData = await backendService.getUser(identity);

            if (userData.length > 0) {
                setUser(userData[0]!);
                setAuthState(AuthState.Authenticated);
                console.log("User found");
                return;
            }

            setUser(null);
            setAuthState(AuthState.Unregistered);
            console.log("User not found");

            return;
        }
        setUser(null);
        setAuthState(AuthState.Unauthenticated);
        console.log("User not authenticated");
    }, []);

    const register = useCallback(async (newUser: User) => {
        console.log("nyaa", newUser);
        await backendService.register(newUser);
        await fetchUserData();
        console.log("Registered");
    }, []);

    const getPrincipal = useCallback(async () => {
        const authClient = await AuthClient.create();
        return authClient.getIdentity().getPrincipal();
    }, []);

    const login = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                identityProvider:
                    "http://bnz7o-iuaaa-aaaaa-qaaaa-cai.localhost:4943/",
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
        login,
        logout,
        register,
    };
}
