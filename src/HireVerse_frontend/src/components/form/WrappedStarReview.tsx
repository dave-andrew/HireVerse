import { Control, Controller } from "react-hook-form";
import { Rating, Star } from "@smastrom/react-rating";
import React from "react";

interface Props {
    name: string;
    control: Control<any>;
    className?: string;
    textValues?: string[];
}

export default function WrappedStarReview({
    name,
    control,
    className,
    textValues,
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
                            itemStyles={{
                                itemShapes: Star,
                                itemStrokeWidth: 2,
                                activeFillColor: "#ffb800",
                                inactiveFillColor: "#ffffff",
                                activeStrokeColor: "#ffc245",
                                inactiveStrokeColor: "#d2d2d2",
                            }}
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
