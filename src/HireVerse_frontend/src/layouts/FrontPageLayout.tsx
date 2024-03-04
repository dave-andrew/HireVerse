import React, { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function FrontPageLayout({ children, className }: Props) {
    return (
        <>
            <ToastContainer />
            <div className="bg-signature-gray flex h-full w-full flex-col">
                <Navbar />
                <div
                    className={`mt-16 w-full rounded-xl bg-white ${className}`}>
                    {children}
                </div>
            </div>
        </>
    );
}
