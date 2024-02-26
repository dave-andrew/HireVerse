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
    }, []);

    return (
        <FrontPageLayout>
            {principal ? (
                <p className="text-3xl font-bold text-center pt-5">
                    Logged in as: {principal.toText()}
                </p>
            ) : (
                <p className="text-3xl font-bold text-center pt-5">
                    Not logged in
                </p>
            )}
            <div className="flex flex-col justify-center place-items-center mb-5">
                <button
                    className="px-5 py-3 rounded-md mt-5 font-bold bg-green-500 hover:bg-green-600 w-fit"
                    onClick={() => clickHandler()}>
                    Login
                </button>
            </div>
            <WorldMap />
        </FrontPageLayout>
    );
}
