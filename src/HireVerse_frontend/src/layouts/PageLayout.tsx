import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode;
}

export default function PageLayout({ children }: Props) {
    return (
        <div className="w-full bg-signature-gray min-h-screen flex flex-row">
            <Sidebar />
            <div className="w-full bg-signature-gray m-4 rounded-xl">
                {children}
            </div>
        </div>
    );
}
