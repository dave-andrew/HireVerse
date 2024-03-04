import useService from "../../hooks/useService";
import { useMutation } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { CreateReviewInput } from "../../../../declarations/HireVerse_review/HireVerse_review.did";

export function useAddReview() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (newReview: CreateReviewInput) => {
            console.log("hahahah", newReview);
            try {
                const response = await getCompanyService().then((s) =>
                    s.addReview(newReview),
                );
                console.log(response);

                if (isOk(response)) {
                    return null;
                }
            } catch (error) {
                console.log(error);
            }

            return null;
        },
    });
}
