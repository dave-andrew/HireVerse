import { IoMdAdd } from "react-icons/io";
import CompanyReviewSummary from "./CompanyReviewSummary";
import CardLayout from "../../layouts/CardLayout";
import TextDropdown from "../form/TextDropdown";
import { CONSTANTS } from "../../utils/constants";
import CompanyReviewItem from "./CompanyReviewItem";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IReviewSortForm } from "../../pages/employee/CompanyDetailPage";
import { useQueryGetSelfReview, useQueryReviews } from "../../datas/queries/reviewQueries";
import WrappedPaginationSelection, { Pagination } from "../form/WrappedPaginationSelection";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";

interface Props {
    companyId: string;
    onCreateReviewClick?: () => void;
    setEditable: (value: Review) => void;
}

export default function CompanyDetailReview({ companyId, onCreateReviewClick, setEditable }: Props) {
    const [pagination, setPagination] = useState<Pagination>({
        totalPage: 1,
        currentPage: 1,
        amountPerPage: 10,
    });
    const { control, getValues: getFilters } = useForm<IReviewSortForm>({
        defaultValues: {
            orderBy: "Newest",
        },
    });
    const { data: reviews, refetch: refetchReviews } = useQueryReviews(companyId, getFilters);
    const { data: myReview } = useQueryGetSelfReview(companyId);

    const getReviewStart = () => (pagination.currentPage - 1) * pagination.amountPerPage;
    const getReviewEnd = () => pagination.currentPage * pagination.amountPerPage;
    const changePage = (nextPage: number) => setPagination({ ...pagination, currentPage: nextPage });

    useEffect(() => {
        if (reviews) {
            setPagination({
                ...pagination,
                totalPage: Math.ceil(reviews.length / pagination.amountPerPage),
            });
        }
    }, [reviews]);

    return (
        <>
            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-lg p-10">
                <div className="flex w-full flex-row justify-between">
                    <h3 className="m-0 flex flex-row justify-between p-0 text-4xl font-semibold">Reviews</h3>
                    {onCreateReviewClick && !myReview && (
                        <button
                            onClick={onCreateReviewClick}
                            className="bg-signature-yellow hover:bg-signature-yellow flex w-fit flex-row items-center justify-center gap-3 rounded-md px-5 py-3 text-lg font-semibold text-black transition-colors">
                            <IoMdAdd />
                            <span>Create Review</span>
                        </button>
                    )}
                </div>

                <div>
                    <CompanyReviewSummary companyId={companyId} />
                </div>
            </CardLayout>

            {reviews && reviews.length > 0 && (
                <CardLayout className="flex flex-row items-center justify-between gap-5 rounded-lg p-4">
                    <div>
                        <span className="text-xl font-semibold">Review Selections</span>
                        <p>Showing 10 reviews</p>
                    </div>
                    <span className="flex flex-row items-center gap-4">
                        Order By
                        <TextDropdown
                            states={CONSTANTS.REVIEWS.ORDER_BY}
                            control={control}
                            name="orderBy"
                            onChange={() => refetchReviews()}
                        />
                    </span>
                </CardLayout>
            )}

            <div className="flex flex-1 flex-row">
                <div className="flex w-full flex-col gap-2">
                    {myReview && (
                        <CompanyReviewItem
                            review={myReview}
                            setEditable={setEditable}
                        />
                    )}
                    {reviews?.slice(getReviewStart(), getReviewEnd()).map((review, i) => {
                        if (review.id === myReview?.id) return;
                        return (
                            <CompanyReviewItem
                                key={i}
                                review={review}
                            />
                        );
                    })}
                    {reviews && reviews.length > 10 && (
                        <WrappedPaginationSelection
                            pagination={pagination}
                            setPagination={changePage}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
