import {RefObject, useEffect, useRef} from "react";

export default function RandomCircleBackground({parentRef}: { parentRef: RefObject<HTMLElement> }) {
    const circleSetRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    function handleScroll() {
        const viewportHeight = parentRef?.current?.clientHeight || 0;

        Array.from(circleSetRef?.current?.children || []).map((child: Element) => {
            const scrollSpeed = child.classList.contains("circle1") ? 0.002 :
                child.classList.contains("circle2") ? 0.0015 :
                   -0.001;

            const newTop = (parentRef?.current?.scrollTop || 0) * scrollSpeed * viewportHeight;
            (child as HTMLElement).style.transform = `translateY(${newTop}px)`;
        });
    }

    useEffect(() => {
        parentRef?.current?.addEventListener("scroll", handleScroll);
        return () => parentRef?.current?.removeEventListener("scroll", handleScroll);
    }, [circleSetRef]);

    return (
        <div className="absolute h-[3000px] w-full z-0 overflow-hidden"
             ref={circleSetRef}>
            <div
                className="circle1 relative left-[10vw] top-20 z-50 h-96 w-96 rounded-full bg-gradient-to-bl from-pink-300 to-purple-950 opacity-30 blur-md">
            </div>
            <div
                className="circle2 relative left-[1400px] top-[-30vh] z-50 h-72 w-72 rounded-full bg-gradient-to-bl from-blue-300 to-blue-200 opacity-60 blur-xl"></div>
            <div
                className="circle3 relative left-[20vw] top-[-30vh] z-50 h-[600px] w-[600px] rounded-[15rem] bg-gradient-to-bl from-orange-300 to-yellow-200 opacity-20 blur-lg"></div>
        </div>
    )
}