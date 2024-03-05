import useService from "../../hooks/useService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { IReviewSortForm } from "../../pages/employee/CompanyDetailPage";

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

export function useQueryGetSelfReview(companyId: string) {
    const { getReviewService, getBackendService } = useService();
    return useQuery({
        queryKey: ["selfReview", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }

            await getBackendService().then((s) => console.log(s.greet()));
            await getBackendService().then((s) => console.log(s.greetFunction()));
            console.log("hahaha", companyId);
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
