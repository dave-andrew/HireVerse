import useService from "../../hooks/useService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import { IReviewSortForm } from "../../pages/employee/CompanyDetail";

export function useQueryReviews(
    companyId: string | undefined,
    getFilters: (() => IReviewSortForm) | null,
) {
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
            const getCompany = async () => {
                const company = await getCompanyService().then((s) =>
                    s.getCompany(companyId),
                );
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
                .then((s) => s.getReviews(company.reviews_ids, filters))
                .catch((e) => console.error(e));

            console.log(response);

            if (isOk(response)) {
                return response.ok;
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
                return response.ok;
            }

            return null;
        },
    });
}
