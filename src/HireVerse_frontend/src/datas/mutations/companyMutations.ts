import useService from "../../hooks/useService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import type { Principal } from "../../../../../node_modules/@dfinity/principal/lib/cjs/index.d.ts";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";

export function useCreateInvitation() {
    const { getCompanyService } = useService();
    return useMutation({
        mutationFn: async ({
            invitee,
            company_id,
        }: {
            invitee: Principal;
            company_id: string;
        }) => {
            try {
                const response = await getCompanyService().then((s) =>
                    s.createInvitation(invitee, company_id),
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
