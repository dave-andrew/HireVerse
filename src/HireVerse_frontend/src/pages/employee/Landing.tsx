import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";


export default function Landing() {
    const [principal, setPrincipal] = useState<Principal | null>(null);

    const clickHandler = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                identityProvider: 'https://identity.ic0.app',
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    useEffect(() => {
        // Login button handler
        const fetchPrincipal = async () => {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                const identity = authClient.getIdentity().getPrincipal();
                // @ts-ignore
                setPrincipal(identity);
            }
        };
        fetchPrincipal();
    }, [clickHandler]);

    return (
        <div>
            {principal ? (
                <p>Logged in as: {principal.toText()}</p>
            ) : (
                <p>Not logged in</p>
            )}
            <button onClick={() => clickHandler()}>Login</button>
        </div>
    );
}