import React, {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import Navbar from "../components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
    children: ReactNode;
    className?: string;
}

export default function FrontPageLayout({ children, className }: Props) {
    const [currentPage, setCurrentPage] = useState('home');

    useEffect(() => {
        // Update state based on page changes (e.g., using React Router)
        setCurrentPage(window.location.pathname);
    }, []);

    useLayoutEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        body.style.height = 'auto';
        body.style.overflow = 'auto';
        html.style.height = 'auto';
        html.style.overflow = 'auto';
        console.log(currentPage)

        if (currentPage === '/') {
            body.style.height = '100vh';
            body.style.overflow = 'hidden';
            html.style.height = '100vh';
            html.style.overflow = 'hidden';
        }
    }, [currentPage]);

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
