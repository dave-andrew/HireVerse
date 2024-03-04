import WrappedStarReview from "../form/WrappedStarReview";
import { FaCheck } from "react-icons/fa";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import purifyDOM from "../../utils/purifyDOM";
import convertTimeInterval from "../../utils/convertTimeInterval";
import { ImCross } from "react-icons/im";

interface Props {
    review: Review;
}

export default function CompanyReviewItem({ review }: Props) {
    return (
        <>
            <div className="flex flex-col w-full border-[1px] border-gray-200 p-5 bg-white">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-5 items-center">
                        <h2 className="!py-0 my-0">{review.title}</h2>
                        {review.recommendToFriend ? (
                            <span className="inline-flex h-8 items-center bg-green-100 text-green-500 text-md gap-2 font-medium px-2.5 py-0.5 rounded-full">
                                <FaCheck />
                                Recommended
                            </span>
                        ) : (
                            <span className="inline-flex h-8 items-center bg-red-100 text-red-500 text-md gap-2 font-medium px-2.5 py-0.5 rounded-full">
                                <ImCross />
                                Not Recommended
                            </span>
                        )}
                    </div>
                    <div>{convertTimeInterval(review.timestamp)}</div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row gap-2 items-center">
                        <span>
                            <b>By</b> {review.userId}
                        </span>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <WrappedStarReview
                            review={review}
                            className="has-[svg]:w-32"
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <h3>Pros</h3>
                        <ol>
                            {review.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h3>Cons</h3>
                        <ol>
                            {review.cons.map((con, index) => (
                                <li key={index}>{con}</li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: purifyDOM(review.generalComments),
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
