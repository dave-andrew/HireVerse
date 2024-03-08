import React, {ReactNode} from "react";
import NavbarSkeleton from "../components/navbar/NavbarSkeleton";

interface Props {
    children: ReactNode;
    className?: string;
}


export default function FrontPageSkeleton({ children, className }: Props) {
    return (
        <div className="bg-signature-gray h-fit flex w-full flex-col animate-pulse">
            <NavbarSkeleton/>
            <div className={`mt-16 w-full rounded-xl bg-white`}>{children}</div>
        </div>);
}