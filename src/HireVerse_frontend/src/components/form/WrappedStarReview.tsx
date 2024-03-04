import { ItemStyles, Rating, Star } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import RatingBar from "../rating/RatingBar";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";

interface Props {
    className?: string;
    textValues?: string[];
    itemstyles?: ItemStyles;
    readOnly?: boolean;
    review: Review | undefined | null;
}

interface Rating {
    cultureRating: number;
    seniorManagementRating: number;
    workLifeBalanceRating: number;
    averageRating: number;
}

const defaultItemStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "#ffb800",
    inactiveFillColor: "#ffffff",
    activeStrokeColor: "#ffc245",
    inactiveStrokeColor: "#d2d2d2",
};

export default function WrappedStarReview({
    className,
    textValues,
    itemstyles = defaultItemStyles,
    readOnly,
    review,
}: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [rating, setRating] = useState<Rating>({
        cultureRating: 0,
        seniorManagementRating: 0,
        workLifeBalanceRating: 0,
        averageRating: 0,
    });

    useEffect(() => {
        if (review) {
            setRating({
                cultureRating: Number(review.cultureRating),
                seniorManagementRating: Number(review.seniorManagementRating),
                workLifeBalanceRating: Number(review.workLifeBalanceRating),
                averageRating:
                    (Number(review.cultureRating) +
                        Number(review.seniorManagementRating) +
                        Number(review.workLifeBalanceRating)) /
                    3,
            });
        }
    }, [review]);

    return (
        <div className="flex flex-row items-center gap-2 relative">
            <div>{rating.averageRating.toFixed(1)}/5</div>
            <div
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <Rating
                    value={rating.averageRating}
                    halfFillMode="svg"
                    className={className}
                    itemStyles={itemstyles}
                    isDisabled={readOnly}
                    readOnly={true}
                />
            </div>
            <Transition
                show={isHovered}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div
                    id="tooltip-right"
                    role="tooltip"
                    className={`absolute z-10 min-w-80 -translate-y-1/2 inline-block px-3 py-2 pb-1 text-sm font-medium text-black bg-white border-[1px] border-gray-200 rounded-lg shadow-sm tooltip`}>
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
            </Transition>
        </div>
    );
}
