import { ReactNode } from "react";
import ManagementBars from "../components/sidebar/ManagementBars";

interface Props {
    children: ReactNode;
}

export default function ManagementPageLayout({ children }: Props) {
    return (
        <div className="bg-signature-gray flex h-full flex-row">
            <ManagementBars>{children}</ManagementBars>
        </div>
    );
}
