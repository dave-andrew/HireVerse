import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function CardLayout({ children, className, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className={`rounded-lg border-[1px] border-gray-200 bg-white ${className}`}>
            {children}
        </div>
    );
}
