import FrontPageLayout from "../../layouts/FrontPageLayout";
import HeaderSection from "../../components/landing/HeaderSection";
import BenefitSection from "../../components/landing/BenefitSection";
import {useRef} from "react";
import SponsorSection from "../../components/landing/SponsorSection";
import FooterSection from "../../components/landing/FooterSection";
import {LiaLongArrowAltDownSolid, LiaLongArrowAltUpSolid} from "react-icons/lia";
import RandomCircleBackground from "../../components/landing/RandomCircleBackground";

export default function LandingPage() {

    const scrollUp = () => {
        window.scrollTo({
            top: window.scrollY - 1000,
            behavior: "smooth"
        });
    }

    const scrollDown = () => {
        window.scrollTo({
            top: window.scrollY + 1000,
            behavior: "smooth"
        });
    }

    return (
        <FrontPageLayout className="bg-gradient-to-br from-cyan-100 via-white to-pink-200">
            {/*<WorldMap />*/}

            <div className="flex flex-row relative gap-2 px-4">
                <button
                    onClick={scrollDown}
                    className="cursor-pointer sticky hover:bg-gray-700 hover:bg-opacity-20 h-fit z-20 flex flex-col
                    mt-auto py-4 gap-2 place-items-center rounded-full bottom-4  ms-auto text-xl animate-bounce">
                    <div className="text-base font-bold rotate-180" style={{
                        writingMode: "vertical-rl",
                    }}>
                        Scroll Down
                    </div>
                    <LiaLongArrowAltDownSolid
                        className="h-10 w-10"/>
                </button>
                <div
                    className="grow relative flex flex-col">
                    <RandomCircleBackground/>
                    <HeaderSection/>
                    <BenefitSection/>
                    <SponsorSection/>
                </div>


                <button
                    onClick={scrollUp}
                    className="cursor-pointer sticky hover:bg-gray-700 hover:bg-opacity-20 h-fit z-0 flex flex-col
                    mt-[100vh] py-4 gap-2 place-items-center rounded-full top-28 ms-auto animate-bounce"
                >
                    <LiaLongArrowAltUpSolid className="h-10 w-10"/>
                    <div className="flex items-center">
                        <div className="">
                            <div className="text-base font-bold" style={{
                                writingMode: "vertical-rl",
                            }}>Scroll Up
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <FooterSection/>
        </FrontPageLayout>
    );
}


// export default function LandingPage() {
//     const parentRef = useRef(null);
//
//     return (
//         <FrontPageLayout>
//             {/*<WorldMap />*/}
//             <Parallax pages={4} style={{top: 0, left: 0}}
//                       className="relative flex flex-col bg-gradient-to-br from-cyan-100 via-white to-pink-200">
//                 <ParallaxLayer
//                     offset={0}
//                     speed={0.5}>
//                     <HeaderSection/>
//                 </ParallaxLayer>
//                 <ParallaxLayer
//                     offset={1}
//                     speed={0.5}>
//                     <BenefitSection/>
//                 </ParallaxLayer>
//                 <ParallaxLayer
//                     offset={2}
//                     speed={0.5}>
//                     <SponsorSection/>
//                 </ParallaxLayer>
//                 <ParallaxLayer
//                     offset={3}
//                     speed={0.5}>
//                     <FooterSection/>
//                 </ParallaxLayer>
//             </Parallax>
//             {/*<RandomCircleBackground />*/}
//
//
//             {/*<div*/}
//             {/*    className="sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-0 left-9 text-xl animate-bounce">*/}
//             {/*    <div className="rotate-90 pb-1 text-base">*/}
//             {/*        Scroll Down*/}
//             {/*    </div>*/}
//             {/*    <LiaLongArrowAltDownSolid*/}
//             {/*        className="h-10 w-10" />*/}
//             {/*</div>*/}
//
//
//             <button
//                 className="cursor-pointer sticky z-0 flex flex-col gap-10 place-items-center rounded-full top-10 ms-auto text-xl animate-bounce">
//                 <LiaLongArrowAltUpSolid
//                     className="h-10 w-10"/>
//                 <div className="rotate-90 pb-1 text-base w-24">
//                     Scroll Up
//                 </div>
//             </button>
//         </FrontPageLayout>
//     );
// }
