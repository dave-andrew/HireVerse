import useService from "../../hooks/useService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { CreateReviewInput, Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import useToaster from "../../hooks/useToaster";

/**
 * useAddReview function
 * Handles the addition of a review
 * @returns {object} - The mutation object from react-query
 */
export function useAddReview() {
    const queryClient = useQueryClient();
    const { getReviewService } = useService();
    const { successToast } = useToaster();
    return useMutation({
        /**
         * mutationFn function
         * Handles the mutation of the review
         * @param {CreateReviewInput} newReview - The new review to be added
         * @returns {Promise<string | null>} - The ID of the company for which the review was added, or null if the operation was not successful
         */
        mutationFn: async (newReview: CreateReviewInput) => {
            const response = await getReviewService()
                .then((s) => s.addReview(newReview))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return newReview.companyId;
            }

            return null;
        },

        /**
         * onSuccess function
         * Handles the success of the mutation
         * @param {string | null} data - The ID of the company for which the review was added
         */
        onSuccess: (data) => {
            successToast({
                message: "Review added successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["reviews", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["company", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["reviewSummary", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["selfReview", data],
            });
        },
    });
}

export function useUpdateReview() {
    const { getReviewService } = useService();
    const queryClient = useQueryClient();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async (review: Review) => {
            const response = await getReviewService()
                .then((s) => s.updateReview(review))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return review.companyId;
            }

            return null;
        },
        onSuccess: (data) => {
            successToast({
                message: "Review updated successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["reviews", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["company", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["reviewSummary", data],
            });
            queryClient.invalidateQueries({
                queryKey: ["selfReview", data],
            });
        },
    });
}
