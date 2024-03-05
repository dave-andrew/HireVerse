import { Typewriter } from "react-simple-typewriter";
import useAuth, { AuthState } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import useMobile from "../../hooks/useMobile";


export default function HeaderSection({ parentRef }: { parentRef: React.MutableRefObject<HTMLElement | null> }) {
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

    const triggerPoint = 100;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = parentRef?.current?.scrollTop || 0;
            setIsVisible(scrollY <= triggerPoint);
        };
        handleScroll();
        parentRef?.current?.addEventListener("scroll", handleScroll);
        return () => parentRef?.current?.removeEventListener("scroll", handleScroll);
    }, [triggerPoint, parentRef]);

    const fadeAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        from: { opacity: 0 },
        config: { duration: 200 },
    });

    const flyAnimation = useSpring({
        from: { transform: "translateY(75%) translateX(-75%)" },
        to: { transform: "translateY(0%) translateX(0%)" },
        config: { duration: 700 },
    });

    const { isMobile } = useMobile();

    return (
        <animated.div style={fadeAnimation}
                      className={`snap-center grid z-10 ${isMobile ? "grid-cols-1" : "grid-cols-2"} place-items-center justify-center gap-16 py-32 px-[10vh] 2xl:px-[35vh] transition-all ease-in-out duration-1000`}>
            <div className="flex flex-col gap-12 w-full">
                <div className="flex flex-col gap-6 w-full">
                    <div className="h-44 text-black text-start font-bebas text-8xl">
                        Easier to <Typewriter
                        words={["Find Jobs", "Review Company", "Manage Jobs", "Find Talent", "Hire!"]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000} />
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
            {!isMobile &&
                <animated.img
                    style={flyAnimation}
                    className="w-[28rem]"
                    src="/storyset/work-landing.svg"
                    alt=""
                />
            }
        </animated.div>
    );
}