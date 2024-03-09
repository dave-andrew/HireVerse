import React, {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function FrontPageLayout({children, className}: Props) {
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
        // Update state based on page changes (e.g., using React Router)
        setCurrentPage(window.location.pathname);
    }, []);

    useLayoutEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (currentPage === "/") {
            body.style.scrollSnapType = "y mandatory";
            html.style.scrollSnapType = "y mandatory";
        } else {
            body.style.scrollSnapType = "auto"
            html.style.scrollSnapType = "auto";
        }
    }, [currentPage]);

    return (
        <>
            <ToastContainer/>
            <div className="bg-signature-gray h-fit flex w-full flex-col">
                <Navbar/>
                <div className={`mt-16 w-full rounded-xl bg-white ${className}`}>{children}</div>
            </div>
        </>
    );
}
