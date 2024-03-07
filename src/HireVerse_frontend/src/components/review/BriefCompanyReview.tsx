import { useEffect, useState } from "react";
import { useQueryReviewSummary } from "../../datas/queries/reviewQueries";
import { Rating } from "@smastrom/react-rating";
import StarReview from "./StarReview";

interface Rating {
    cultureRating: number;
    seniorManagementRating: number;
    workLifeBalanceRating: number;
    averageRating: number;
    recommendPercentage: number;
    totalRating: number;
}

export default function BriefCompanyReview({ company_id }: { company_id: string }) {

    const { data: reviewSummary } = useQueryReviewSummary(company_id);

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
        <>
            <div>
                <StarReview company_id={company_id} />
                <div className="text-xs">
                    {rating?.totalRating.toString()}{" Reviews"}
                </div>
            </div>
        </>
    )

}