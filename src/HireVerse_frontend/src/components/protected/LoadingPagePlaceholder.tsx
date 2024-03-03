import { ToastContainer } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

export default function LoadingPagePlaceholder() {
    return (
        <>
            <ToastContainer />
            <div className="bg-signature-gray flex h-full w-full flex-col opacity-10 ease-in">
                <div className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white ps-6 shadow-md md:ps-12">
                    <div className="text-blue-primary h-8 w-32 animate-pulse rounded-md bg-gray-300 pt-1 text-center align-middle font-bebas md:text-4xl lg:text-5xl"></div>
                    <div className="absolute left-1/2 flex h-full w-fit translate-x-[-50%] transform flex-row place-items-center justify-center px-8 md:w-7/12 lg:w-5/12">
                        {[1, 2, 3].map((menu, index) => {
                            return (
                                <div
                                    className="flex h-full w-full place-items-center justify-center md:text-sm lg:text-base"
                                    key={index}>
                                    <div
                                        key={index}
                                        className={`text-s mx-8 flex h-6 w-24 place-items-center justify-center rounded-md border-b-2 border-transparent bg-gray-300 transition-colors hover:border-gray-400 xl:text-base `}></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex h-full flex-row place-items-center">
                        <div className="hover:border-blue-primary mr-6 flex h-6 w-24 animate-pulse cursor-pointer items-center justify-center rounded-md border-b-2 border-transparent bg-gray-500 transition-colors"></div>
                        <div className="mr-5 h-10 w-10 animate-pulse rounded-full border-l-2 bg-gray-400 px-4"></div>
                    </div>
                </div>
                <div
                    className={`h-screen w-screen animate-pulse bg-gray-800`}></div>
            </div>
        </>
    );
}
