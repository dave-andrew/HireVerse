import { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function FrontPageLayout({ children, className }: Props) {
    return (
        <div className="bg-signature-gray flex h-full w-full flex-col">
            <Navbar />
            <div className={`mt-16 w-full rounded-xl bg-white ${className}`}>
                {children}
            </div>
        </div>
    );
}
