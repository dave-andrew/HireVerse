<<<<<<< HEAD
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import CircularRating from "../rating/CircularRating";
import RatingBar from "../rating/RatingBar";

interface Props {
    companyId: string;
}

export default function CompanyReviewSummary({ companyId }: Props) {
    const [rating, setRating] = useState(3);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
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
                <div className="flex min-w-[50%] flex-1 flex-col gap-2 p-5">
                    <RatingBar />
                    <RatingBar />
                    <RatingBar />
                </div>
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
                    <CircularRating
                        percentage={50}
                        colour="lightgray"
                    />
                    <p className="w-4/5 text-center">
                        Employee recommends the company to friends
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-row justify-evenly">
                <div className="w-1/2">
                    <h3 className="py-5 text-3xl font-bold">Positives</h3>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <p
                            key={i}
                            className="text-gray-500">
                            The company has a nobol
                        </p>
                    ))}
                </div>
                <div className="w-1/2">
                    <h3 className="py-5 text-3xl font-bold">Negatives</h3>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <p
                            key={i}
                            className="text-gray-500">
                            The company has a vincent tanjaya
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
=======
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import CircularRating from "../rating/CircularRating";
import RatingBar from "../rating/RatingBar";

interface Props {
    companyId: string;
}

export default function CompanyReviewSummary({ companyId }: Props) {
    const [rating, setRating] = useState(3);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
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
                <div className="flex min-w-[50%] flex-1 flex-col gap-2 p-5">
                    <RatingBar />
                    <RatingBar />
                    <RatingBar />
                </div>
                <div className="flex flex-1 flex-col items-center gap-3 p-5">
                    <CircularRating
                        percentage={50}
                        colour="lightgray"
                    />
                    <p className="w-4/5 text-center">
                        Employee recommends the company to friends
                    </p>
                </div>
            </div>
        </div>
    );
}
>>>>>>> e4d20068a3e2559e5807abc9ca0b522b2e6cdd3c
