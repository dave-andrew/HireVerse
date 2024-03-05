import FrontPageLayout from "../../layouts/FrontPageLayout";
import HeaderSection from "../../components/landing/HeaderSection";
import Section2 from "../../components/landing/Section2";
import { useRef } from "react";
import Section3 from "../../components/landing/Section3";
import FooterSection from "../../components/landing/FooterSection";

export default function LandingPage() {
    const parentRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    return (
        <FrontPageLayout>
            {/*<WorldMap />*/}

            <div
                ref={parentRef}
                className="relative flex h-[100vh] snap-y snap-mandatory flex-col overflow-scroll bg-gradient-to-br from-cyan-100 via-white to-pink-200">
                <div className="absolute left-52 top-20 z-0 h-96 w-96 rounded-full bg-gradient-to-bl from-pink-300 to-purple-950 opacity-30 blur-md"></div>
                <div className="absolute left-80 top-40 z-0 h-[600px] w-[600px] rounded-[15rem] bg-gradient-to-bl from-orange-300 to-yellow-200 opacity-20 blur-lg"></div>
                <div className="absolute right-80 top-24 z-0 h-72 w-72 rounded-full bg-gradient-to-bl from-blue-300 to-blue-200 opacity-60 blur-xl"></div>
                <HeaderSection parentRef={parentRef} />
                {/*<div*/}
                {/*    className="sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-10 ms-auto text-xl animate-bounce">*/}
                {/*    <LiaLongArrowAltUpSolid*/}
                {/*        className="h-10 w-10" />*/}
                {/*    <div className="rotate-90 pb-1 text-base">*/}
                {/*        Scroll Up*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Section2 parentRef={parentRef} />
                {/*<div*/}
                {/*    className="sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-0 left-9 text-xl animate-bounce">*/}
                {/*    <div className="rotate-90 pb-1 text-base">*/}
                {/*        Scroll Down*/}
                {/*    </div>*/}
                {/*    <LiaLongArrowAltDownSolid*/}
                {/*        className="h-10 w-10" />*/}
                {/*</div>*/}
                <Section3 parentRef={parentRef} />
                <FooterSection />
            </div>
        </FrontPageLayout>
    );
}
