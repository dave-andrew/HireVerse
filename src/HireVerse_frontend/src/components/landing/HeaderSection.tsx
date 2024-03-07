import { Typewriter } from "react-simple-typewriter";
import useAuth, { AuthState } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

    const { isMobile } = useMobile();

    return (
        <animated.div
            style={fadeAnimation}
            className={`z-10 grid snap-center ${isMobile ? "grid-cols-1" : "grid-cols-2"} place-items-center justify-center gap-4 px-[10vh] py-32 transition-all duration-1000 ease-in-out 2xl:px-[35vh]`}>
            <div className="flex w-full flex-col gap-12">
                <div className="flex w-full flex-col gap-6">
                    <div className="h-44 text-start font-bebas text-8xl text-black">
                        Easier to{" "}
                        <Typewriter
                            words={["Find Jobs", "Review Company", "Manage Jobs", "Find Talent", "Hire!"]}
                            loop={5}
                            cursor
                            cursorStyle="_"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </div>
                    <div className="px-2 text-start align-middle text-xl text-gray-600">
                        Hireverse empowers job seeker with straight from the source insights to make the best career decisions and helps employers find the best
                        talent.
                    </div>
                </div>
                {authState === AuthState.Unauthenticated && (
                    <button
                        className="trapezoid-border w-fit skew-x-[-12deg] rounded-sm border border-black bg-white px-8 py-2 font-bebas text-2xl text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
                        onClick={() => clickHandler()}>
                        <div className="skew-x-12">Start Here</div>
                    </button>
                )}
            </div>
            {!isMobile && (
                <iframe
                    className="h-[24rem] w-[24rem]"
                    src="https://lottie.host/embed/0ecd5b53-c72f-491c-b93e-3d016ec43aeb/7wGwl9KBRm.json"></iframe>
            )}
        </animated.div>
    );
}
