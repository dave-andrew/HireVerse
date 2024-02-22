import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function CardLayout({ children, className }: Props) {
    return (
        <div
            className={`bg-white rounded-lg border-[1px] border-gray-200 ${className}`}>
            {children}
        </div>
    );
}
