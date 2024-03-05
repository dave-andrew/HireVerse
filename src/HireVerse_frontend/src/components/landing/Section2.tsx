import {useEffect, useState} from "react";
import {animated, useSpring} from "@react-spring/web";


export default function Section2() {
    const triggerPoint = 100;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY >= triggerPoint);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerPoint]); // Re-run useEffect if triggerPoint changes

    const fadeAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        from: {opacity: 0}, // Initial state before reaching trigger point
    });


    return (
        <animated.div style={fadeAnimation}
                      className={`grid z-10 grid-cols-2 place-items-center justify-center gap-16 py-32 px-[10vh] 2xl:px-[40vh] transition-all ease-in-out duration-1000`}>
            <iframe
                className="w-[400px] h-[400px]"
                src="https://lottie.host/embed/0ecd5b53-c72f-491c-b93e-3d016ec43aeb/7wGwl9KBRm.json"></iframe>
            <div className="flex flex-col gap-12 place-items-start w-full">
                <div className="flex flex-col place-items-start w-full">
                    <div className="text-4xl font-bebas ">
                        Decentralized Hiring
                    </div>
                    <div className="text-gray-600 text-xl">
                        Embrace a faster, more cost-effective hiring experience. Cut out the middleman and take control
                        of your recruitment process with Internet Computer. This innovative technology allows you to
                        directly connect with talent, eliminating dependence on third-party platforms and ensuring your
                        data remains under your complete control.
                    </div>
                </div>
                <div className="flex flex-col place-items-start w-full">
                    <div className="text-4xl font-bebas ">
                        Credible Reviews
                    </div>
                    <div className="text-gray-600 text-xl">
                        Boost your confidence in your next career move. Our platform empowers you with credible and
                        trustworthy reviews from both employees and employers.
                        <br/>
                        <br/>
                        Internet Identity ensures the authenticity of every user, guaranteeing that the valuable
                        insights you encounter come from verified individuals with genuine experiences.
                    </div>
                </div>
                <div className="flex flex-col place-items-start w-full">
                    <div className="text-4xl font-bebas ">
                        Secure and Private
                    </div>
                    <div className="text-gray-600 text-xl">
                        Maintain complete control over your information. Internet Identity empowers you with
                        unparalleled data security and privacy. Your information remains exclusively accessible to you,
                        ensuring your personal details are never shared without your explicit consent.
                    </div>
                </div>
            </div>
        </animated.div>
    )
}