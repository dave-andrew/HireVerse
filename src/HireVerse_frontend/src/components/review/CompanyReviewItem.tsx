import WrappedStarReview from "../form/WrappedStarReview";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import purifyDOM from "../../utils/purifyDOM";
import { ImCross } from "react-icons/im";
import { convertTimeInterval } from "../../utils/convertTimeInterval";
import { getUserName } from "../../datas/queries/authQueries";

interface Props {
    review: Review;
    setEditable?: (value: Review) => void;
}

export default function CompanyReviewItem({ review, setEditable }: Props) {
    const { data: username } = getUserName(review.userId);
    return (
        <>
            <div className="flex w-full flex-col rounded-lg border-[1px] border-gray-200 bg-white p-12">
                <div className="flex w-full flex-row items-center justify-between gap-5">
                    <div className="flex w-full flex-row items-center justify-between gap-5">
                        <div className="flex flex-row items-center gap-5">
                            <h2 className="my-0 !py-0 text-4xl">{review.title}</h2>
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
                    {setEditable && (
                        <div>
                            <button
                                onClick={() => setEditable(review)}
                                className="text-md text-black-500 flex h-8 flex-row items-center justify-center gap-2 rounded-full px-2.5 py-0.5 font-medium hover:bg-gray-200">
                                <FaRegEdit />
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-row items-center gap-2">
                        <span>
                            By<b> {review.userId === "Anonymous" ? "Anonymous" : username}</b>
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
                <div className="grid grid-cols-2 pb-5">
                    <div>
                        <h3>Pros</h3>
                        <ol className="m-0 pl-5">
                            {review.pros.map((pro, index) => (
                                <li key={index}>{pro}</li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <h3>Cons</h3>
                        <ol className="m-0 pl-5">
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
