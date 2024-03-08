import { ContainerScroll } from "./ContainerScrollAnimation";
import { WavyBackground } from "./WavyBackground";

export default function SponsorSection({ parentRef }: { parentRef: React.MutableRefObject<HTMLElement | null> }) {
    return (
        <WavyBackground className="flex flex-col">
            <ContainerScroll
                parentRef={parentRef}
                titleComponent={
                    <>
                        <h1 className="snap-start py-8 text-4xl font-semibold text-black">
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

