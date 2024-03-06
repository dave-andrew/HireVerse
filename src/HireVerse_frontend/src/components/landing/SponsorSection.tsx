import { ContainerScroll } from "./ContainerScrollAnimation";
import { WavyBackground } from "./WavyBackground";

export default function SponsorSection({ parentRef }: { parentRef: React.MutableRefObject<HTMLElement | null> }) {
    return (
        <WavyBackground className="flex flex-col">
            <ContainerScroll
                parentRef={parentRef}
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                            Supported in Web3.0 using
                            <br />
                            <span
                                className="flex flex-row gap-8 text-4xl md:text-[6rem] font-bold mt-1 leading-none place-items-end">
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

