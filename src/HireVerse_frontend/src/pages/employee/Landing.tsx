import FrontPageLayout from "../../layouts/FrontPageLayout";
import useAuth, { AuthState } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorldMap from "../../components/WorldMap";
import {toast} from "react-toastify";
import {defaultToastOptions} from "../../layouts/ManagementPageLayout";

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
            <WorldMap />
            <div className="absolute h-full w-full z-[1] bg-black bg-opacity-60"></div>
            <div className="z-10 flex flex-col relative">
                <div className="flex flex-col h-screen justify-center place-items-center gap-16">
                    <div className="flex flex-col">
                        <div className="text-blue-primary text-center align-middle font-bebas text-8xl">
                            HIREVERSE
                        </div>
                        <div className="text-white text-center align-middle font-bold text-2xl">
                            Secure your job.
                        </div>
                    </div>
                    {/*{user ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}*/}
                    {authState === AuthState.Unauthenticated &&
                        <button className="bg-white py-2 px-6 w-fit rounded-sm" onClick={() => clickHandler()}>
                            Start Here
                        </button>
                    }

                    {/*<button onClick={() => logout()}>Logout</button>*/}
                </div>
            </div>
        </FrontPageLayout>
    );
}
