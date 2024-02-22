import { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";

interface Props {
    children: ReactNode;
}

export default function FrontPageLayout({ children }: Props) {
    return (
        <div className="w-full bg-signature-gray flex flex-col">
            <Navbar />
            <div className="w-full bg-white rounded-xl mt-16">{children}</div>
        </div>
    );
}
