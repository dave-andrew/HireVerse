import { ContainerScroll } from "./ContainerScrollAnimation";
import { WavyBackground } from "./WavyBackground";
import { MutableRefObject } from "react";

export default function SponsorSection({ parentRef }: { parentRef: MutableRefObject<HTMLElement | null> }) {
    return (
        <WavyBackground className="flex flex-col">
            <ContainerScroll
                parentRef={parentRef}
                titleComponent={
                    <>
                        <h1 className="snap-center pb-8 text-4xl font-semibold text-black dark:text-white">
                            Supported in Web3.0 using
                            <br />
                            <span className="mt-1 flex flex-row place-items-end gap-8 text-4xl font-bold leading-none md:text-[6rem] ">
                                <img
                                    src="default/internet-computer-icp-logo.png"
                                    alt="Internet Computer"
                                    className="h-24 w-24"
                                />
                                Internet Computer
                            </span>
                        </h1>
                    </>
                }
            />
        </WavyBackground>
    );
}

