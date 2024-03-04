import FrontPageLayout from "../../layouts/FrontPageLayout";
import useAuth, { AuthState } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const { user, authState, login, logout } = useAuth();
    const navigate = useNavigate();

    const clickHandler = async () => {
        await login();
    };

    useEffect(() => {
        if (authState === AuthState.Unregistered) {
            console.log("Unregistered");
            navigate("/complete-registration");
        }
        console.log(`stateChanged: ${authState}`);
    }, [authState]);

    return (
        <FrontPageLayout>
            {/*<WorldMap />*/}
            <div className="absolute z-[1] h-full w-full bg-black bg-opacity-60"></div>
            <div className="relative z-10 flex flex-col">
                <div className="flex h-screen flex-col place-items-center justify-center gap-16">
                    <div className="flex flex-col">
                        <div className="text-blue-primary text-center align-middle font-bebas text-8xl">
                            HIREVERSE
                        </div>
                        <div className="text-center align-middle text-2xl font-bold text-white">
                            Secure your job.
                        </div>
                    </div>
                    {/*{user ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}*/}
                    {authState === AuthState.Unauthenticated && (
                        <button
                            className="w-fit rounded-sm bg-white px-6 py-2"
                            onClick={() => clickHandler()}>
                            Start Here
                        </button>
                    )}

                    {/*<button onClick={() => logout()}>Logout</button>*/}
                </div>
            </div>
        </FrontPageLayout>
    );
}
