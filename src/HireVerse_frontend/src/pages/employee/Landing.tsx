import FrontPageLayout from "../../layouts/FrontPageLayout";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import HeaderSection from "../../components/landing/HeaderSection";
import Section2 from "../../components/landing/Section2";
import { useRef } from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Section3 from "../../components/landing/Section3";
import FooterSection from "../../components/landing/FooterSection";

export default function Landing() {

    const parentRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    return (
        <FrontPageLayout>
            {/*<WorldMap />*/}
            <div
                ref={parentRef}
                className="relative flex flex-col bg-gradient-to-br from-cyan-100 to-pink-200 via-white snap-y snap-mandatory overflow-scroll h-[100vh]">
                <div
                    className="absolute z-0 h-96 w-96 rounded-full bg-gradient-to-bl from-pink-300 to-purple-950 opacity-30 blur-md top-20 left-52"></div>
                <div
                    className="absolute z-0 h-[600px] w-[600px] rounded-[15rem] bg-gradient-to-bl from-orange-300 to-yellow-200 opacity-20 blur-lg top-40 left-80"></div>
                <div
                    className="absolute z-0 h-72 w-72 rounded-full bg-gradient-to-bl from-blue-300 to-blue-200 opacity-60 blur-xl top-24 right-80"></div>
                <div
                    className="absolute z-0 flex flex-col gap-10 place-items-center rounded-full top-[740px] left-9 text-xl animate-bounce">
                    <div className="rotate-90 pb-1 text-base">
                        Scroll Down
                    </div>
                    <LiaLongArrowAltDownSolid
                        className="h-10 w-10" />
                </div>
                <HeaderSection parentRef={parentRef} />
                <Section2 parentRef={parentRef} />
                <Section3 parentRef={parentRef} />
                <FooterSection />
            </div>
        </FrontPageLayout>
    );
}



