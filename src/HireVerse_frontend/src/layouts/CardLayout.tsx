import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function CardLayout({ children, className }: Props) {
    return <div className={`bg-white rounded-xl drop-shadow-md ${className}`}>{children}</div>;
}
