import {useEffect, useState} from "react";
import {animated, useSpring, useTrail} from "@react-spring/web";
import useMobile from "../../hooks/useMobile";
import {LiaLongArrowAltUpSolid} from "react-icons/lia";


export default function Section2({parentRef}: { parentRef: React.MutableRefObject<HTMLElement | null> }) {
    const upperTriggerPoint = 600;
    const lowerTriggerPoint = 900;
    const [open, setOpen] = useState(false);

    const {isMobile} = useMobile();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = parentRef?.current?.scrollTop || 0;
            setOpen(scrollY >= upperTriggerPoint && scrollY <= lowerTriggerPoint);
        };
        parentRef?.current?.addEventListener("scroll", handleScroll);
        return () => parentRef?.current?.removeEventListener("scroll", handleScroll);
    }, [upperTriggerPoint, parentRef, lowerTriggerPoint]);


    const benefitItem = [
        (<div className="translate-x-[10%] flex flex-col place-items-start w-full">
            <div className="text-2xl md:text-4xl font-bebas ">
                Decentralized Hiring
            </div>
            <div className="text-gray-600 text-sm md:text-lg">
                Embrace a faster, more cost-effective hiring experience. Cut out the middleman and take control
                of your recruitment process with Internet Computer. This innovative technology allows you to
                directly connect with talent, eliminating dependence on third-party platforms and ensuring your
                data remains under your complete control.
            </div>
        </div>),
        (<div className="snap-center flex flex-col place-items-start w-full mb-12">
            <div className="text-2xl md:text-4xl font-bebas ">
                Credible Reviews
            </div>
            <div className="text-gray-600 text-sm md:text-lg">
                Boost your confidence in your next career move. Our platform empowers you with credible and
                trustworthy reviews from both employees and employers. Internet Identity ensures the authenticity of
                every user, guaranteeing that the valuable
                insights you encounter come from verified individuals with genuine experiences.
            </div>
        </div>),
        (<div className="translate-x-[-10%] flex flex-col place-items-start w-full">
            <div className="text-2xl md:text-4xl font-bebas ">
                Secure and Private
            </div>
            <div className="text-gray-600 text-sm md:text-lg">
                Maintain complete control over your information. Internet Identity empowers you with
                unparalleled data security and privacy. Your information remains exclusively accessible to you,
                ensuring your personal details are never shared without your explicit consent.
            </div>
        </div>),
    ];

    const trail = useTrail(benefitItem.length, {
        config: {mass: 5, tension: 2000, friction: 200},
        opacity: open ? 1 : 0,
        x: open ? 0 : 20,
        height: open ? (isMobile ? 140 : 220) : 0,
        from: {opacity: 0, x: 20, height: 0},
    });


    const flyAnimation = useSpring({
        from: {transform: "translateY(75%) translateX(-75%)"},
        to: {transform: "translateY(0%) translateX(0%)"},
        config: {duration: 700},
    });


    return (
        <div
            className={`grow grid z-10 grid-cols-1 xl:grid-cols-2 place-items-center justify-center gap-16 py-32 px-[10vh] md:px-[20vh] transition-all ease-in-out duration-1000 min-h-[1000px] `}>

            <animated.img
                style={flyAnimation}
                className=" w-[400px] h-[400px] hidden xl:block"
                src="/storyset/work-landing.svg"
                alt=""
            />
            <div className="flex flex-col place-items-start w-full gap-5">
                {trail.map(({x, height, ...rest}, index) => (
                    <animated.div
                        key={index}
                        className="w-full"
                        style={{...rest, transform: x.to(x => `translate3d(0,${x}px,0)`)}}>
                        <animated.div style={{height}}>{benefitItem[index]}</animated.div>
                    </animated.div>
                ))}
            </div>

        </div>
    );
}