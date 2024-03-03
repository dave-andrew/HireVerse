import useService from "../../hooks/useService";
import { useMutation } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { CreateReviewInput } from "../../../../declarations/HireVerse_review/HireVerse_review.did";

export function useAddReview() {
    const { getReviewService } = useService();
    return useMutation({
        mutationFn: async (newReview: CreateReviewInput) => {
            const response = await getReviewService().then((s) =>
                s.addReview(newReview),
            );

            if (isOk(response)) {
                return null;
            }
            return null;
        },
    });
}
