import { Control, Controller } from "react-hook-form";
import { ItemStyles, Rating, Star } from "@smastrom/react-rating";
import React from "react";

interface Props {
    control: Control<any>;
    name: string;
    className?: string;
    textValues?: string[];
    itemstyles?: ItemStyles;
}

const defaultItemStyles = {
    itemShapes: Star,
    itemStrokeWidth: 2,
    activeFillColor: "#ffb800",
    inactiveFillColor: "#ffffff",
    activeStrokeColor: "#ffc245",
    inactiveStrokeColor: "#d2d2d2",
};

export default function WrappedControlledStarReview({
    control,
    name,
    className,
    textValues,
    itemstyles = defaultItemStyles,
}: Props) {
    return (
        <>
            <Controller
                render={({ field }) => (
                    <>
                        <Rating
                            {...field}
                            halfFillMode="svg"
                            className={className}
                            // onHoverChange={(value) => {
                            //     // handleHoverChange(value).then(() =>
                            //     //     setHoveredRating(value),
                            //     // );
                            // }}
                            itemStyles={itemstyles}
                        />
                        <div>
                            {textValues ? textValues[field.value - 1] : ""}
                        </div>
                    </>
                )}
                name={name}
                control={control}
            />
        </>
    );
}
