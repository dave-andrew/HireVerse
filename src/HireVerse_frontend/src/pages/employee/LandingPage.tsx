import FrontPageLayout from "../../layouts/FrontPageLayout";
import HeaderSection from "../../components/landing/HeaderSection";
import BenefitSection from "../../components/landing/BenefitSection";
import {useRef} from "react";
import SponsorSection from "../../components/landing/SponsorSection";
import FooterSection from "../../components/landing/FooterSection";
import {Parallax, ParallaxLayer} from "@react-spring/parallax";
import {LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid} from "react-icons/lia";
import RandomCircleBackground from "../../components/landing/RandomCircleBackground";

export default function LandingPage() {
    const parentRef = useRef(null);

    return (
        <FrontPageLayout>
            {/*<WorldMap />*/}

            <div ref={parentRef}
                 className="relative flex h-[100vh] snap-y snap-mandatory flex-col overflow-scroll bg-gradient-to-br from-cyan-100 via-white to-pink-200">
                <RandomCircleBackground parentRef={parentRef}/>
                <HeaderSection parentRef={parentRef}/>
                {/*<button*/}
                {/*    className="cursor-pointer sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-10 ms-auto text-xl animate-bounce">*/}
                {/*    <LiaLongArrowAltUpSolid*/}
                {/*        className="h-10 w-10"/>*/}
                {/*    <div className="rotate-90 pb-1 text-base w-24">*/}
                {/*        Scroll Up*/}
                {/*    </div>*/}
                {/*</button>*/}
                <BenefitSection parentRef={parentRef}/>

                {/*<div*/}
                {/*    className="sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-0 left-9 text-xl animate-bounce">*/}
                {/*    <div className="rotate-90 pb-1 text-base">*/}
                {/*        Scroll Down*/}
                {/*    </div>*/}
                {/*    <LiaLongArrowAltDownSolid*/}
                {/*        className="h-10 w-10" />*/}
                {/*</div>*/}
                <SponsorSection parentRef={parentRef}/>
                <FooterSection/>
            </div>
        </FrontPageLayout>
    );
}
