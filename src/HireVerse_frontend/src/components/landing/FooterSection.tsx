import { TextRevealCard } from "./TextRevealCard";

export default function FooterSection() {
    return (
        <div className="flex flex-col items-center justify-center h-[1000px] rounded-2xl w-full snap-center">
            <div className="h-48 w-full bg-gradient-to-t from-[#1d1c20] to-transparent">

            </div>
            <TextRevealCard
                text="Codefest Hackathon 2024"
                revealText="Codefest Hackathon 2024"
            >
            </TextRevealCard>
        </div>
    );
}