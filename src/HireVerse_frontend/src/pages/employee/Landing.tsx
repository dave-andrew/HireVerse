import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import WorldMap from "../../components/WorldMap";

export default function Landing() {
    const [principal, setPrincipal] = useState<Principal | null>(null);

    const clickHandler = async () => {
        const authClient = await AuthClient.create();
        try {
            await authClient.login({
                identityProvider:
                    "http://bnz7o-iuaaa-aaaaa-qaaaa-cai.localhost:4943/",
            });
            console.log("Logged in as", authClient.getIdentity());
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    useEffect(() => {
        // Login button handler
        const fetchPrincipal = async () => {
            const authClient = await AuthClient.create();
            if (await authClient.isAuthenticated()) {
                const identity = authClient.getIdentity().getPrincipal();
                console.log("Logged in as", identity);
                // @ts-ignore
                setPrincipal(identity);
            }
        };
        fetchPrincipal();
    }, [clickHandler]);

    return (
        <FrontPageLayout>
            <WorldMap />
            {principal ? (
                <p>Logged in as: {principal.toText()}</p>
            ) : (
                <p>Not logged in</p>
            )}
            <button onClick={() => clickHandler()}>Login</button>
        </FrontPageLayout>
    );
}
