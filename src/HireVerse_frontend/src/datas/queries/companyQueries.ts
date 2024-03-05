import { useQuery } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import useService from "../../hooks/useService";

export function getCompanyIndustries(companyId: string | undefined) {
    const { getJobService } = useService();
    return useQuery({
        queryKey: ["companyIndustries", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }

            const result = await getJobService().then((s) => s.getCompanyJobIndustries(companyId));

            if (isOk(result)) {
                return result.ok;
            }

            return null;
        },
        enabled: !!companyId,
    });
}

export function getCompanyCountries() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companyCountries"],
        queryFn: async () => {
            return await getCompanyService().then((s) => s.getCompanyCountries());
        },
    });
}

export function getManagedCompanies() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["managedCompanies"],
        queryFn: async () => {
            const response = await getCompanyService().then((s) => s.getManagedCompanies());

            if (isOk(response)) {
                return response.ok;
            }

            return [];
        },
    });
}

export function getUserInvitations() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["userInvitations"],
        queryFn: async () => {
            const response = await getCompanyService().then((s) => s.getUserInvitations());

            if (isOk(response)) {
                return response.ok;
            }

            return [];
        },
    });
}

export function getGetCompanyInvitations(companyId: string | undefined) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companyInvitations"],
        queryFn: async () => {
            if (!companyId) return;

            const response = await getCompanyService().then((s) => s.getCompanyInvitations(companyId));

            if (isOk(response)) {
                return response.ok;
            }

            return [];
        },
    });
}

export function getCompany(companyId: string | undefined) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["company", companyId],
        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const response = await getCompanyService().then((s) => s.getCompany(companyId));

            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
        enabled: !!companyId,
    });
}
