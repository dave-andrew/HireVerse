import React, { ReactNode } from "react";
import ManagementBars from "../components/sidebar/ManagementBars";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    children: ReactNode;
}

export const defaultToastOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

export default function ManagementPageLayout({ children }: Props) {
    return (
        <div className="bg-signature-gray flex h-full flex-row">
            <ManagementBars>{children}</ManagementBars>
            <ToastContainer />
        </div>
    );
}
