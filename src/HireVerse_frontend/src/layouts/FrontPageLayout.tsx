import { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function FrontPageLayout({ children, className }: Props) {
    return (
        <div className="w-full bg-signature-gray flex h-full flex-col">
            <Navbar />
            <div className={`w-full bg-white rounded-xl mt-16 ${className}`}>
                {children}
            </div>
        </div>
    );
}
