import {ToastContainer} from "react-toastify";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

export default function LoadingPagePlaceholder() {
    return (
        <>
            <ToastContainer/>
            <div className="bg-signature-gray flex h-full w-full flex-col ease-in opacity-10">
                <div
                    className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white md:ps-12 ps-6 shadow-md">
                    <div
                        className="bg-gray-300 animate-pulse w-32 rounded-md h-8 text-blue-primary pt-1 text-center align-middle font-bebas lg:text-5xl md:text-4xl">
                    </div>
                    <div
                        className="absolute left-1/2 flex h-full lg:w-5/12 md:w-7/12 min-w-96 translate-x-[-50%] transform flex-row place-items-center justify-center px-8">
                        {[1, 2, 3].map((menu, index) => {
                            return (
                                <div
                                    className="flex h-full w-full place-items-center justify-center lg:text-base md:text-sm"
                                    key={index}>
                                    <div
                                        key={index}
                                        className={`text-s rounded-md bg-gray-300 mx-8 flex h-6 w-24 place-items-center justify-center border-b-2 border-transparent transition-colors hover:border-gray-400 xl:text-base `}>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex h-full flex-row place-items-center">
                        <div
                            className="h-6 animate-pulse rounded-md bg-gray-500 hover:border-blue-primary mr-6 flex w-24 cursor-pointer items-center justify-center border-b-2 border-transparent transition-colors">
                        </div>
                        <div className="border-l-2 px-4 h-10 w-10 bg-gray-400 animate-pulse mr-5 rounded-full">
                        </div>
                    </div>
                </div>
                <div className={`animate-pulse w-screen h-screen bg-gray-800`}>
                </div>
            </div>
        </>
    );
}