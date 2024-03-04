import React, { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import CircularRating from "../rating/CircularRating";
import { useQueryReviewSummary } from "../../datas/queries/reviewQueries";
import RatingBar from "../rating/RatingBar";

interface Props {
    companyId: string;
}

interface Rating {
    cultureRating: number;
    seniorManagementRating: number;
    workLifeBalanceRating: number;
    averageRating: number;
    recommendPercentage: number;
    totalRating: number;
}

export default function CompanyReviewSummary({ companyId }: Props) {
    const { data: reviewSummary } = useQueryReviewSummary(companyId);
    const [rating, setRating] = useState<Rating>({
        cultureRating: 0,
        seniorManagementRating: 0,
        workLifeBalanceRating: 0,
        averageRating: 0,
        recommendPercentage: 0,
        totalRating: 0,
    });

    useEffect(() => {
        if (!reviewSummary) {
            return;
        }

        const totalReviews = Number(reviewSummary?.totalReviews ?? 0);
        const cultureRating =
            Number(reviewSummary?.cultureRating ?? 0) / totalReviews;
        const seniorManagementRating =
            Number(reviewSummary?.seniorManagementRating ?? 0) / totalReviews;
        const workLifeBalanceRating =
            Number(reviewSummary?.workLifeBalanceRating ?? 0) / totalReviews;
        const recommendPercentage =
            Number(reviewSummary?.recommendToFriend ?? 0) / totalReviews;

        const total =
            cultureRating + seniorManagementRating + workLifeBalanceRating;

        setRating({
            cultureRating,
            seniorManagementRating,
            workLifeBalanceRating,
            averageRating: total / 3,
            recommendPercentage: recommendPercentage,
            totalRating: totalReviews,
        });
    }, [reviewSummary]);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
                    <h3 className="text-5xl font-bold">
                        {rating.averageRating.toFixed(1)}
                    </h3>
                    <Rating
                        value={rating.averageRating}
                        readOnly={true}
                        halfFillMode="svg"
                        className="has-[svg]:w-32"
                    />
                    <p>
                        <b>{rating.totalRating}</b> ratings in total
                    </p>
                </div>
                <div className="flex min-w-[40%] flex-1 flex-col gap-2 p-5">
                    <RatingBar
                        value={rating.cultureRating}
                        text="Culture"
                    />
                    <RatingBar
                        value={rating.seniorManagementRating}
                        text="Senior Management"
                    />
                    <RatingBar
                        value={rating.workLifeBalanceRating}
                        text="Work Life Balance"
                    />
                </div>
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
                    <CircularRating
                        percentage={rating.recommendPercentage}
                        hasReview={!!reviewSummary}
                    />
                    <p className="w-4/5 text-center">
                        Employee recommends the company to friends
                    </p>
                </div>
            </div>
        </div>
    );
}
