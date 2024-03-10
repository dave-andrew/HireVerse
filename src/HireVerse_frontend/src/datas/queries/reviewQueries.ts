import useService from "../../hooks/useService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { IReviewSortForm } from "../../pages/employee/CompanyDetailPage";

/**
 * Fetches the reviews of a specific company.
 * @param {string | undefined} companyId - The ID of the company.
 * @param {(() => IReviewSortForm) | null} getFilters - A function that returns the query filters to apply.
 * @returns {QueryObserverResult} A query observer result containing the company's reviews or null if the company ID is not provided.
 */
export function useQueryReviews(companyId: string | undefined, getFilters: (() => IReviewSortForm) | null) {
    const { getReviewService, getCompanyService } = useService();
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["reviews", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }

            let filters: string = "";

            if (getFilters) {
                filters = getFilters().orderBy;
            }
            const response = await getCompanyService()
                .then((s) => s.getCompany(companyId))
                .catch((e) => console.error(e));

            if (!isOk(response)) {
                return null;
            }

            const company = response.ok;
            const response2 = await getReviewService()
                .then((s) => s.getReviews(company.reviews_ids, filters))
                .catch((e) => console.error(e));

            if (isOk(response2)) {
                return response2.ok;
            }

            return null;
        },
    });
}

/**
 * Fetches the review summary of a specific company.
 * @param {string} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's review summary or null if the company ID is not provided.
 */
export function useQueryReviewSummary(companyId: string) {
    const { getReviewService, getCompanyService } = useService();
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["reviewSummary", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }

            const getCompany = async () => {
                const company = await getCompanyService()
                    .then((s) => s.getCompany(companyId))
                    .catch((e) => console.error(e));
                if (isOk(company)) {
                    return company.ok;
                }
            };

            const company = await queryClient.fetchQuery({
                queryKey: ["company", companyId],
                queryFn: getCompany,
            });

            if (!company) {
                return null;
            }

            const response = await getReviewService()
                .then((s) => s.getReviewSummaries(company.reviews_ids))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                console.log(response);
                return response.ok;
            }

            return null;
        },
    });
}

/**
 * Fetches the self review of a specific company.
 * @param {string} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's self review or null if the company ID is not provided.
 */
export function useQueryGetSelfReview(companyId: string) {
    const { getReviewService, getBackendService } = useService();
    return useQuery({
        queryKey: ["selfReview", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }
            const response = await getReviewService()
                .then((s) => s.getSelfReview(companyId))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return response.ok;
            }

            return null;
        },
    });
}
