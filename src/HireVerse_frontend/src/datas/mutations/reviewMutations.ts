import useService from "../../hooks/useService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { CreateReviewInput } from "../../../../declarations/HireVerse_review/HireVerse_review.did";

export function useAddReview() {
    const queryClient = useQueryClient();
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (newReview: CreateReviewInput) => {
            const response = await getCompanyService()
                .then((s) => s.addReview(newReview))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return newReview.companyId;
            }

            return null;
        },
        onSuccess: (data) => {
            queryClient.resetQueries({
                queryKey: ["reviews", data],
            });
            queryClient.resetQueries({
                queryKey: ["company", data],
            });
        },
    });
}
