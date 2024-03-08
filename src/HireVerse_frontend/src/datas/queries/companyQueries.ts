import { useQuery } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import useService from "../../hooks/useService";


/**
 * Fetches the industries of a specific company.
 * @param {string | undefined} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's industries or null if the company ID is not provided.
 */
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


/**
 * Fetches the countries where companies are located.
 * @returns {QueryObserverResult} A query observer result containing the countries.
 */
export function getCompanyCountries() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companyCountries"],
        queryFn: async () => {
            return await getCompanyService().then((s) => s.getCompanyCountries());
        },
    });
}


/**
 * Fetches the companies managed by the user.
 * @returns {QueryObserverResult} A query observer result containing the managed companies or an empty array if there are none.
 */
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


/**
 * Fetches the invitations sent to the user.
 * @returns {QueryObserverResult} A query observer result containing the user's invitations or an empty array if there are none.
 */
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


/**
 * Fetches the invitations sent by a specific company.
 * @param {string | undefined} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's invitations or an empty array if the company ID is not provided.
 */
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



/**
 * Fetches the details of a specific company and views the company.
 * @param {string | undefined} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's details or null if the company ID is not provided.
 */
export function getCompany(companyId: string | undefined) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["company", companyId],

        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const response = await getCompanyService()
                .then((s) => s.getCompany(companyId))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                getCompanyService()
                    .then((s) => s.viewCompany(companyId))
                    .catch((e) => console.error(e));

                return response.ok;
            }
            return null;
        },
        enabled: !!companyId,
    });
}
