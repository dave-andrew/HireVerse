import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateJobInput } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import useService from "../../hooks/useService";
import { isOk } from "../../utils/resultGuarder";
import useToaster from "../../hooks/useToaster";

export function useCreateNewJob() {
    const queryClient = useQueryClient();
    const { getJobService } = useService();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async (job: CreateJobInput) => {
            const result = await getJobService().then((s) => s.createJob(job));

            if (!isOk(result)) {
                return null;
            }

            return result.ok.company_id;
        },
        onSuccess: async (data) => {
            successToast({
                message: "Job created successfully",
            });

            return await queryClient.invalidateQueries({
                queryKey: ["jobPostedByCompany", data],
            });
        },
    });
}
