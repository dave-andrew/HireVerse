import useService from "../../hooks/useService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import type { Principal } from "../../../../../node_modules/@dfinity/principal/lib/cjs/index.d.ts";
import { Company, CreateCompanyInput } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useToaster from "../../hooks/useToaster";
import useLocalStorage from "../../hooks/useLocalStorage";


/**
 * useRegisterCompany function
 * Handles the registration of a company
 * @returns {object} - The mutation object from react-query
 */
export function useRegisterCompany() {
    const [_, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    const { getCompanyService } = useService();
    const queryClient = useQueryClient();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async (company: CreateCompanyInput) => {
            const response = await getCompanyService()
                .then((s) => s.registerCompany(company))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
        onSuccess: async (data) => {
            if (!data) {
                return;
            }

            successToast({
                message: "Company registered successfully",
            });

            setSelectedCompany(data);

            await queryClient.invalidateQueries({
                queryKey: ["managedCompanies"],
            });
        },
    });
}


/**
 * useLeaveCompany function
 * Handles the leaving of a company
 * @returns {object} - The mutation object from react-query
 */
export function useLeaveCompany() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (company_id: string) => {
            const response = await getCompanyService().then((s) => s.leaveCompany(company_id));
            console.log("LEAVE!!");

            if (isOk(response)) {
                return null;
            }

            throw new Error(response.err);
        },
    });
}


/**
 * useRemoveInvitation function
 * Handles the removal of an invitation
 * @returns {object} - The mutation object from react-query
 */
export function useRemoveInvitation() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (invite_id: string) => {
            const response = await getCompanyService().then((s) => s.removeInvite(invite_id));

            if (isOk(response)) {
                return null;
            }

            throw new Error(response.err);
        },
    });
}


/**
 * useAcceptInvitation function
 * Handles the acceptance of an invitation
 * @returns {object} - The mutation object from react-query
 */
export function useAcceptInvitation() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (invite_id: string) => {
            const response = await getCompanyService().then((s) => s.acceptInvitation(invite_id));

            if (isOk(response)) {
                return null;
            }

            throw new Error(response.err);
        },
    });
}


/**
 * useCreateInvitation function
 * Handles the creation of an invitation
 * @returns {object} - The mutation object from react-query
 */
export function useCreateInvitation() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async ({ invitee, company_id }: { invitee: Principal; company_id: string }) => {
            const response = await getCompanyService().then((s) => s.createInvitation(invitee, company_id));

            if (isOk(response)) {
                return null;
            }
            throw new Error(response.err);
        },
    });
}


/**
 * useUpdateCompany function
 * Handles the updating of a company
 * @returns {object} - The mutation object from react-query
 */
export function useUpdateCompany() {
    const queryClient = useQueryClient();
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async (company: Company) => {
            const response = await getCompanyService()
                .then((s) => s.updateCompany(company.id, company))
                .catch((e) => console.error(e));

            if (isOk(response)) {
                return company.id;
            }

            return null;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["company", data],
            });
        },
    });
}
