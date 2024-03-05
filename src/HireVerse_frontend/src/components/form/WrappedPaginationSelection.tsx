import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import React from "react";

export interface Pagination {
    totalPage: number;
    currentPage: number;
    amountPerPage: number;
}

interface Props {
    pagination: Pagination;
    setPagination: (nextPage: number) => void;
}

export default function WrappedPaginationSelection({
    pagination: { currentPage, totalPage, amountPerPage },
    setPagination,
}: Props) {
    const getPaginationNumbers = (i: number) => {
        const PaginationNumber = () => {
            const shownNumber = startPage + i + 1;
            return (
                <li onClick={() => setPagination(shownNumber)}>
                    <div
                        className={`flex items-center cursor-pointer justify-center px-4 h-10 ${currentPage == shownNumber ? "bg-signature-yellow" : "hover:bg-gray-200 hover:text-gray-700"} leading-tight text-gray-500 bg-white border border-gray-300`}>
                        {shownNumber}
                    </div>
                </li>
            );
        };

        let startPage = currentPage - 3;
        let endPage = currentPage + 2;

        if (startPage < 1) {
            endPage -= startPage - 1;
            startPage = 0;
        }

        if (endPage > totalPage) {
            startPage -= endPage - totalPage;
        }

        startPage = Math.max(startPage, 0);

        if (i < 5) {
            return <PaginationNumber key={i} />;
        }
    };

    return (
        <>
            <nav className="flex flex-row items-center justify-center w-full text-base">
                <ul className="flex flex-row items-center h-10 text-base *:list-none gap-1">
                    <li>
                        <button
                            disabled={currentPage == 1}
                            onClick={() => setPagination(currentPage - 1)}
                            className={`${currentPage == 1 ? "cursor-not-allowed" : "hover:bg-gray-200 hover:text-gray-700"} flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg`}>
                            <span className="sr-only">Previous</span>
                            <MdArrowBackIos />
                        </button>
                    </li>
                    {Array.from({
                        length: totalPage,
                    }).map((_, i) => getPaginationNumbers(i))}
                    <li>
                        <button
                            disabled={currentPage == totalPage}
                            onClick={() => setPagination(currentPage + 1)}
                            className={`${currentPage == totalPage ? "cursor-not-allowed" : "hover:bg-gray-200 hover:text-gray-700"} flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg`}>
                            <span className="sr-only">Next</span>
                            <MdArrowForwardIos />
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

function PaginationNumber() {}
