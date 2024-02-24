import React from "react";
import { Rating } from "@smastrom/react-rating";
import Pie from "../form/CircularRating";

export default function CompanyReviewSummary() {
    const [rating, setRating] = React.useState(3);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col items-center gap-3">
                    <h3 className="text-5xl font-bold">{rating.toFixed(1)}</h3>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        halfFillMode="svg"
                        className="has-[svg]:w-24"
                    />
                    <p>
                        <b>23</b> ratings in total
                    </p>
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <Pie
                        percentage={50}
                        colour="lightgray"
                    />
                    <p className="w-4/5 text-center">
                        Rate salary as high or average
                    </p>
                </div>

                <div className="flex flex-col gap-3 items-center">
                    <Pie
                        percentage={50}
                        colour="lightgray"
                    />
                    <p className="w-4/5 text-center">
                        Employee recommends the company to friends
                    </p>
                </div>
            </div>
            <div className="flex flex-row justify-evenly">
                <div className="w-1/2">
                    <h3 className="text-3xl font-bold py-5">Positives</h3>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <p className="text-gray-500">The company has a nobol</p>
                    ))}
                </div>
                <div className="w-1/2">
                    <h3 className="text-3xl font-bold py-5">Negatives</h3>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <p className="text-gray-500">
                            The company has a vincent tanjaya
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
