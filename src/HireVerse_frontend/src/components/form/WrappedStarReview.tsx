import { ItemStyles, Rating, Star } from "@smastrom/react-rating";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import RatingBar from "../rating/RatingBar";

interface Props {
    className?: string;
    textValues?: string[];
    itemstyles?: ItemStyles;
    disabled?: boolean;
    value: number;
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
    disabled,
    value,
}: Props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex flex-row items-center gap-2 relative">
            <div>{value}/5</div>
            <div
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <Rating
                    value={value}
                    halfFillMode="svg"
                    className={className}
                    itemStyles={itemstyles}
                    isDisabled={disabled}
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
                    <RatingBar />
                    <RatingBar />
                    <RatingBar />
                </div>
            </Transition>
        </div>
    );
}