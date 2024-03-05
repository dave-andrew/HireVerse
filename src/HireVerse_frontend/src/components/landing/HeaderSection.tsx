import {Typewriter} from "react-simple-typewriter";
import useAuth, {AuthState} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {animated, useSpring} from "@react-spring/web";


export default function HeaderSection() {
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

    const triggerPoint = 100;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY <= triggerPoint);
        };
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerPoint]);

    const fadeAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        from: {opacity: 0},
        config: {duration: 200}
    });

    return (
        <animated.div style={fadeAnimation}
            className={`grid z-10 grid-cols-2 place-items-center justify-center gap-16 py-32 px-[10vh] 2xl:px-[40vh] transition-all ease-in-out duration-1000`}>
            <div className="flex flex-col gap-12 w-full">
                <div className="flex flex-col gap-6 w-full">
                    <div className="h-44 text-black text-start font-bebas text-8xl">
                        Easier to <Typewriter
                        words={['Find Jobs', 'Review Company', 'Manage Job Posting', 'Find Talent', 'Hire!']}
                        loop={5}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}/>
                    </div>
                    <div className="text-start align-middle text-xl text-gray-600 px-2">
                        Hireverse empowers job seeker with straight from the source insights to make the best
                        career decisions and helps employers find the best talent.
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
            <img
                className="w-[28rem]"
                src="/storyset/work-landing.svg"
                alt=""
            />
        </animated.div>
    )
}