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
            {user ? <p>Logged in as: {user.email}</p> : <p>Not logged in</p>}
            <div className="flex flex-col">
                <button onClick={() => clickHandler()}>Login</button>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </FrontPageLayout>
    );
}
