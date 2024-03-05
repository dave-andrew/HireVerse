import FrontPageLayout from "../../layouts/FrontPageLayout";
import useAuth, {AuthState} from "../../hooks/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Typewriter from "../../components/Typewriter";
import {FaArrowDownLong} from "react-icons/fa6";
import {LiaLongArrowAltDownSolid} from "react-icons/lia";

export default function Landing() {
    const {user, authState, login, logout} = useAuth();
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
            <div className="relative flex flex-col bg-gradient-to-br from-cyan-100 to-pink-50 via-white">
                <div
                    className="absolute z-[1] h-96 w-96 rounded-full bg-gradient-to-bl from-pink-300 to-purple-950 opacity-30 blur-md top-20 left-52"></div>
                <div
                    className="absolute z-[1] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-orange-300 to-yellow-200 opacity-20 blur-lg top-40 left-80"></div>
                <div
                    className="absolute z-[1] h-72 w-72 rounded-full bg-gradient-to-bl from-blue-300 to-blue-200 opacity-60 blur-xl top-24 right-80"></div>
                <div
                    className="absolute z-[1] flex flex-col gap-10 place-items-center rounded-full top-[740px] left-9 text-xl animate-bounce">
                    <div className="rotate-90 pb-1 text-base">
                        Scroll Down
                    </div>
                    <LiaLongArrowAltDownSolid
                        className="h-10 w-10"/>
                </div>
                <div className="grid z-10 grid-cols-2 place-items-center justify-center gap-16 py-24 px-80">
                    <div className="flex flex-col gap-12 w-full">
                        <div className="flex flex-col gap-6 w-full">
                            <div className="h-72 text-black text-start font-bebas text-8xl">
                                <Typewriter
                                    texts={["Find a skilled individual to do the Job", "Search for work opportunities in your area" , "Leave Honest Review for the company you worked in"]}
                                    speed={100}/>
                            </div>
                            <div className="text-start align-middle text-xl text-gray-600 px-2">
                                Hireverse empowers job seeker with straight from the source insights to make the best career decisions and helps employers find the best talent.
                            </div>
                        </div>
                        {authState === AuthState.Unauthenticated && (
                            <button
                                className="skew-x-[-12deg] trapezoid-border w-fit rounded-sm bg-white px-8 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out text-black font-bebas text-2xl"
                                onClick={() => clickHandler()}>
                                <div className="skew-x-12">
                                    Start Here
                                </div>
                            </button>
                        )}
                    </div>
                    <iframe
                        className="w-[400px] h-[400px]"
                        src="https://lottie.host/embed/0ecd5b53-c72f-491c-b93e-3d016ec43aeb/7wGwl9KBRm.json"></iframe>
                </div>
            </div>
        </FrontPageLayout>
    );
}
