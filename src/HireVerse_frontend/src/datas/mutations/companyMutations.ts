import useService from "../../hooks/useService";
import {useMutation} from "@tanstack/react-query";
import {isOk} from "../../utils/resultGuarder";
import type {Principal} from "../../../../../node_modules/@dfinity/principal/lib/cjs/index.d.ts";


export function useRemoveInvitation() {
    const {getCompanyService} = useService();
    return useMutation({
        mutationFn: async (invite_id: string) => {
            try {
                const response = await getCompanyService().then((s) =>
                    s.removeInvite(invite_id),
                );

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


export function useAcceptInvitation() {
    const {getCompanyService} = useService();
    return useMutation({
        mutationFn: async (invite_id: string) => {
            try {
                const response = await getCompanyService().then((s) =>
                    s.acceptInvitation(invite_id),
                );

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

export function useCreateInvitation() {
    const {getCompanyService} = useService();
    return useMutation({
        mutationFn: async ({invitee, company_id}: { invitee: Principal, company_id: string }) => {
            try {
                const response = await getCompanyService().then((s) =>
                    s.createInvitation(invitee, company_id),
                );
                console.log(response)

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