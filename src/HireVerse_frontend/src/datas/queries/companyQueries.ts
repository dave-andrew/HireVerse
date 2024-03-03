import { useQuery } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import useService from "../../hooks/useService";

export function useGetCompanyIndustries(companyId: string | undefined) {
    const { getJobService } = useService();
    return useQuery({
        queryKey: ["companyIndustries", companyId],
        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const result = await getJobService().then((s) =>
                s.getCompanyJobIndustries(companyId),
            );

            if (isOk(result)) {
                return result.ok;
            }
        },
        enabled: !!companyId,
    });
}

export function useGetCompanyCountries() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companyCountries"],
        queryFn: async () => {
            return await getCompanyService().then((s) =>
                s.getCompanyCountries(),
            );
        },
    });
}

export function useGetManagedCompanies() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["managedCompanies"],
        queryFn: async () => {
            const response = await getCompanyService().then((s) => {
                return s.getManagedCompanies();
            });

            if (isOk(response)) {
                return response.ok;
            }

            return [];
        },
    });
}

export function useGetCompany(companyId: string | undefined) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["company", companyId],
        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const response = await getCompanyService().then((s) =>
                s.getCompany(companyId),
            );

            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
        enabled: !!companyId,
    });
}
