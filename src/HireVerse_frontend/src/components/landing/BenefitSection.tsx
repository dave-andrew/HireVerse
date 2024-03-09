import {useEffect, useState} from "react";
import {animated, useSpring, useTrail} from "@react-spring/web";
import useMobile from "../../hooks/useMobile";

export default function BenefitSection() {
    const upperTriggerPoint = 500;
    const lowerTriggerPoint = 900;
    const [open, setOpen] = useState(false);

    const {isMobile} = useMobile();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || 0;
            setOpen(scrollY >= upperTriggerPoint && scrollY <= lowerTriggerPoint);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [upperTriggerPoint, lowerTriggerPoint]);

    const benefitItem = [
        <div className="flex w-full translate-x-[10%] flex-col place-items-start">
            <div className="font-bebas text-2xl md:text-4xl ">Decentralized Hiring</div>
            <div className="justify-center text-sm text-gray-600 2xl:text-base">
                Embrace a faster, more cost-effective hiring experience. <b>Cut out the middleman</b> and take control
                of your recruitment process with <b className="text-blue-primary">Internet
                Computer </b>. This innovative technology allows you to directly connect with talent, eliminating
                dependence
                on third-party platforms and ensuring
                your data remains under your <b> complete control </b>.
            </div>
        </div>,
        <div className="mb-12 flex w-full flex-col place-items-start justify-center">
            <div className="font-bebas text-2xl md:text-4xl ">Credible Reviews</div>
            <div className="text-sm text-gray-600 2xl:text-base">
                Boost your confidence in your next career move. Our platform empowers you with <b> credible and
                trustworthy reviews </b>from employees. <b className="text-blue-primary"> Internet
                Identity </b> ensures <b> the authenticity </b> of every user, guaranteeing that the valuable
                insights you encounter come from verified individuals with genuine experiences.
            </div>
        </div>,
        <div className="flex w-full translate-x-[-10%] flex-col place-items-start justify-center">
            <div className="font-bebas text-2xl md:text-4xl ">Secure and Private</div>
            <div className="text-sm text-gray-600 2xl:text-base">
                Maintain complete control over your information. <b className="text-blue-primary"> Internet
                Identity </b> empowers you with <b> unparalleled data security and privacy </b>. Your information
                remains exclusively accessible to you, ensuring your personal details are never shared without your
                explicit consent.
            </div>
        </div>,
    ];

    const trail = useTrail(benefitItem.length, {
        config: {mass: 5, tension: 2000, friction: 200},
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? (isMobile ? 140 : 180) : 0,
        from: {opacity: 0, x: 20, height: 0},
    });

    const fadeAnimation = useSpring({
        opacity: open ? 1 : 0,
        from: {opacity: 0},
        config: {duration: 200},
    });

    return (
        <div
            className={`z-10 grid min-h-[1000px] grow grid-cols-1 place-items-center justify-center gap-16 snap-center
            px-[10vh] py-14 transition-all duration-1000 ease-in-out md:px-[20vh] xl:grid-cols-2 `}>
            <animated.div style={fadeAnimation}>
                <iframe
                    className=" hidden h-[500px] w-[500px] xl:block"
                    src="https://lottie.host/embed/7761944a-3364-4bfe-b7db-bc3ae9475dd6/Ex2qyJXCQZ.json"
                />
            </animated.div>
            <div className="flex w-full flex-col place-items-start gap-5">
                {trail.map(({x, height, ...rest}, index) => (
                    <animated.div
                        key={index}
                        className="w-full"
                        style={{...rest, transform: x.to((x) => `translate3d(0,${x}px,0)`)}}>
                        <animated.div style={{height}}>{benefitItem[index]}</animated.div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
}