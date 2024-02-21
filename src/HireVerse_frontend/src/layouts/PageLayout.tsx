import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode;
}

export default function PageLayout({ children }: Props) {
    return (
        <div className="w-full bg-signature-gray flex flex-col">
            <Sidebar />
            <div className="w-full bg-signature-gray rounded-xl"
                 style={{
                     "padding": "2rem",
                     "height": "calc(100vh - 4rem)",
                 }}>
                    {children}
            </div>
        </div>
    );
}
