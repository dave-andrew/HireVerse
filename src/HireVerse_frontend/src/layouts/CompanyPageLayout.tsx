import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode;
}

export default function CompanyPageLayout({ children }: Props) {
    return (
        <div className="h-full bg-signature-gray flex flex-row">
            <Sidebar />
            <div className="h-full bg-signature-gray rounded-xl min-h-screen">
                {children}
            </div>
        </div>
    );
}
