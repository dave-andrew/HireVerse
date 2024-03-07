import WrappedModal from "../form/WrappedModal";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import WrappedRichText from "../form/WrappedRichText";
import useRichTextEditor from "../../hooks/useRichTextEditor";
import DynamicInputBox from "../form/DynamicInputBox";
import { MdAdd } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import WrappedControlledStarReview from "../form/WrappedControlledStarReview";
import { CONSTANTS } from "../../utils/constants";
import WrappedRadioGroup from "../form/WrappedRadioGroup";
import useToaster from "../../hooks/useToaster";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import { useUpdateReview } from "../../datas/mutations/reviewMutations";

interface IEditReviewForm {
    title: string;
    pros: {
        message: string;
        placeholder: string;
    }[];
    cons: {
        message: string;
        placeholder: string;
    }[];
    cultureRating: number;
    workLifeBalanceRating: number;
    seniorManagementRating: number;
    recommendToFriend: string | null;
    anonymous: boolean;
}

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    review: Review | null;
}

const defaultValues: IEditReviewForm = {
    title: "",
    pros: [{ message: "", placeholder: "e.g. The company culture is great" }],
    cons: [{ message: "", placeholder: "e.g. The toilet is dirty" }],
    cultureRating: 0,
    workLifeBalanceRating: 0,
    seniorManagementRating: 0,
    recommendToFriend: null,
    anonymous: false,
};

export default function EditReviewModal({ isOpen, setIsOpen, review }: Props) {
    const mutation = useUpdateReview();
    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IEditReviewForm>({ defaultValues });
    const {
        fields: fieldsPros,
        append: appendPros,
        remove: removePros,
    } = useFieldArray({
        name: "pros",
        control,
    });
    const {
        fields: fieldsCons,
        append: appendCons,
        remove: removeCons,
    } = useFieldArray({
        name: "cons",
        control,
    });
    const editor = useRichTextEditor({
        content: review?.generalComments ?? "",
    });
    const { errorToast } = useToaster();

    useEffect(() => {
        if (review) {
            setValue("title", review.title);
            editor?.commands.setContent(review.generalComments);
            setValue(
                "pros",
                review.pros.map((pro) => ({ message: pro, placeholder: "e.g. The company culture is great" })),
            );
            setValue(
                "cons",
                review.cons.map((con) => ({ message: con, placeholder: "e.g. The toilet is dirty" })),
            );
            setValue("cultureRating", Number(review.cultureRating));
            setValue("workLifeBalanceRating", Number(review.workLifeBalanceRating));
            setValue("seniorManagementRating", Number(review.seniorManagementRating));
            setValue("recommendToFriend", review.recommendToFriend ? (review.recommendToFriend ? "Yes" : "No") : null);
            setValue("anonymous", review.isAnonymous);
        }
    }, [review]);

    const checkError = () => {
        for (const error in errors) {
            const errorMessage = errors[error as keyof IEditReviewForm]?.message;

            if (errorMessage) {
                errorToast({
                    message: errorMessage ?? "",
                });
                break;
            }
        }
    };

    const updateReview = async (data: IEditReviewForm) => {
        const generalComments = editor?.getHTML();
        if (!review) {
            return;
        }
        if (generalComments === "<p></p>" || generalComments === undefined) {
            errorToast({
                message: "General comments is required",
            });
            return;
        }

        for (const pro of data.pros) {
            if (pro.message === "") {
                errorToast({
                    message: "Pros must not be empty",
                });
                return;
            }
        }
        for (const con of data.cons) {
            if (con.message === "") {
                errorToast({
                    message: "Cons must not be empty",
                });
                return;
            }
        }
        if (data.cultureRating === 0) {
            setError("cultureRating", {
                type: "manual",
                message: "Culture rating is required",
            });
            errorToast({
                message: "Culture rating is required",
            });
            return;
        }
        if (data.workLifeBalanceRating === 0) {
            setError("workLifeBalanceRating", {
                type: "manual",
                message: "Work life balance rating is required",
            });
            errorToast({
                message: "Work life balance rating is required",
            });
            return;
        }
        if (data.seniorManagementRating === 0) {
            setError("seniorManagementRating", {
                type: "manual",
                message: "Senior management rating is required",
            });
            errorToast({
                message: "Senior management rating is required",
            });
            return;
        }
        if (data.recommendToFriend === null) {
            setError("recommendToFriend", {
                type: "manual",
                message: "Recommendation is required",
            });
            errorToast({
                message: "Recommendation is required",
            });
            return;
        }

        const updatedReview: Review = {
            ...review,
            title: data.title,
            generalComments: generalComments,
            pros: data.pros.map((pro) => pro.message) ?? [],
            cons: data.cons.map((con) => con.message) ?? [],
            isAnonymous: data.anonymous,
            cultureRating: BigInt(data.cultureRating),
            workLifeBalanceRating: BigInt(data.workLifeBalanceRating),
            seniorManagementRating: BigInt(data.seniorManagementRating),
            recommendToFriend: data.recommendToFriend === "Yes",
        };

        mutation.mutate(updatedReview);

        reset();
        setIsOpen(false);
    };

    const handleSubmitForm = () => {
        handleSubmit(updateReview)();
        checkError();
    };

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[52vw] !p-10 !mt-20"
            title={
                <div className="flex w-full flex-row items-center justify-between pb-5">
                    <div className="text-4xl font-semibold">Update current review</div>
                    <button
                        className="h-fit w-fit rounded-full text-end text-xl"
                        type="button"
                        onClick={() => setIsOpen(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}>
            <div className="flex flex-col">
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">Review Title</div>
                    <div className="h-full rounded-md">
                        <input
                            {...register("title", {
                                required: "Title is required",
                            })}
                            type="text"
                            placeholder="e.g. My experience at Google"
                            className="focus:ring-signature-primary h-full min-h-12 w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">General Comments</div>
                    <div className="has-[:focus]:ring-signature-primary relative h-full rounded-md has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                        <WrappedRichText
                            editor={editor}
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] p-2 px-3 transition-all *:min-h-32 *:outline-0 focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex h-full flex-col rounded-md">
                        <div className="pb-2 font-semibold">Pros</div>
                        <DynamicInputBox
                            key="pros"
                            fields={fieldsPros}
                            register={register}
                            remove={removePros}
                            className="flex flex-row items-center justify-center gap-2"
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            inputObject="pros"
                            inputName="message"
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="hover:input-signature-gray flex flex-row items-center justify-end gap-2 rounded-lg p-2 font-semibold"
                                        onClick={() =>
                                            appendPros({
                                                message: "",
                                                placeholder: "e.g. The company culture is great",
                                            })
                                        }>
                                        <MdAdd className="bg-blue-primary rounded-full text-white" />
                                        <span>Add New Pro</span>
                                    </button>
                                </div>
                            }
                            removeButton={
                                <button className="flex h-full w-full items-center justify-center rounded-md border-2 border-red-500 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                                    <FaRegTrashCan size="1.1rem" />
                                </button>
                            }
                        />
                    </div>
                    <div className="flex h-full flex-col rounded-md">
                        <div className="pb-2 font-semibold">Cons</div>
                        <DynamicInputBox
                            key="cons"
                            fields={fieldsCons}
                            register={register}
                            remove={removeCons}
                            className="flex flex-row items-center justify-center gap-2 "
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            inputObject="cons"
                            inputName="message"
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="hover:input-signature-gray flex flex-row items-center justify-end gap-2 rounded-lg p-2 font-semibold"
                                        onClick={() =>
                                            appendCons({
                                                message: "",
                                                placeholder: "e.g. The toilet is dirty",
                                            })
                                        }>
                                        <MdAdd className="bg-blue-primary rounded-full text-white" />
                                        <span>Add New Con</span>
                                    </button>
                                </div>
                            }
                            removeButton={
                                <button className="flex h-full w-full items-center justify-center rounded-md border-2 border-red-500 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                                    <FaRegTrashCan size="1.1rem" />
                                </button>
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">Rate the company culture</div>
                    <div className="flex h-full flex-row items-center gap-3 rounded-md">
                        <WrappedControlledStarReview
                            control={control}
                            name="cultureRating"
                            textValues={CONSTANTS.REVIEWS.CULTURE}
                            className="gap-2 has-[svg]:w-72 [&_div:hover]:bg-gray-200 [&_div]:rounded-md [&_div]:border-[1px] [&_div]:border-gray-200 [&_div]:p-1.5 [&_div]:transition-colors"
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">Rate the company work-life balance</div>
                    <div className="flex h-full flex-row items-center gap-3 rounded-md">
                        <WrappedControlledStarReview
                            control={control}
                            name="workLifeBalanceRating"
                            textValues={CONSTANTS.REVIEWS.WORKLIFE_BALANCE}
                            className="gap-2 has-[svg]:w-72 [&_div:hover]:bg-gray-200 [&_div]:rounded-md [&_div]:border-[1px] [&_div]:border-gray-200 [&_div]:p-1.5 [&_div]:transition-colors"
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">Rate the company senior management</div>
                    <div className="flex h-full flex-row items-center gap-3 rounded-md">
                        <WrappedControlledStarReview
                            control={control}
                            name="seniorManagementRating"
                            textValues={CONSTANTS.REVIEWS.SENIOR_MANAGEMENT}
                            className="gap-2 has-[svg]:w-72 [&_div:hover]:bg-gray-200 [&_div]:rounded-md [&_div]:border-[1px] [&_div]:border-gray-200 [&_div]:p-1.5 [&_div]:transition-colors"
                        />
                    </div>
                </div>
                <div className="flex flex-col py-5">
                    <div className="pb-2 font-semibold">Would you recommend this company to a friend?</div>
                    <div className="flex h-full flex-row items-center gap-3 rounded-md">
                        <WrappedRadioGroup
                            values={CONSTANTS.REVIEWS.RECOMMEND_TO_FRIEND}
                            className="grid w-full grid-cols-2 gap-4 !p-0"
                            selectionClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="recommendToFriend"
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-center gap-2 pb-10 pt-10">
                <input
                    {...register("anonymous")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label className="font-medium text-black">Be Anonymous (your name will not be shown)</label>
            </div>
            <div className="flex w-full items-center justify-center gap-2 pt-5">
                <button
                    onClick={handleSubmitForm}
                    className="bg-signature-yellow hover:bg-signature-yellow w-fit rounded-md px-10 py-3 text-lg font-semibold text-black transition-colors">
                    Post Review
                </button>
            </div>
        </WrappedModal>
    );
}
