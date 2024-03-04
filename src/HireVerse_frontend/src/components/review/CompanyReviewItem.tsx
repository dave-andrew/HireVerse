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
            <div className="flex w-full flex-col border-[1px] border-gray-200 bg-white p-5">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <h2 className="my-0 !py-0">{review.title}</h2>
                        {review.recommendToFriend ? (
                            <span className="text-md inline-flex h-8 items-center gap-2 rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-500">
                                <FaCheck />
                                Recommended
                            </span>
                        ) : (
                            <span className="text-md inline-flex h-8 items-center gap-2 rounded-full bg-red-100 px-2.5 py-0.5 font-medium text-red-500">
                                <ImCross />
                                Not Recommended
                            </span>
                        )}
                    </div>
                    <div>{convertTimeInterval(review.timestamp)}</div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row items-center gap-2">
                        <span>
                            <b>By</b> {review.userId}
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-3">
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
