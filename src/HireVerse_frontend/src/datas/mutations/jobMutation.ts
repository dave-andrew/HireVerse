import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateJobInput } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import useService from "../../hooks/useService";
import { isOk } from "../../utils/resultGuarder";
import useToaster from "../../hooks/useToaster";


/**
 * useCreateNewJob function
 * Handles the creation of a new job
 * @returns {object} - The mutation object from react-query
 */
export function useCreateNewJob() {
    const queryClient = useQueryClient();
    const { getJobService } = useService();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async (job: CreateJobInput) => {
            const result = await getJobService()
                .then((s) => s.createJob(job))
                .catch((e) => console.error(e));

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


/**
 * useDeleteJob function
 * Handles the deletion of a job
 * @returns {object} - The mutation object from react-query
 */
export function useDeleteJob() {
    const queryClient = useQueryClient();
    const { getJobService } = useService();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async ({
            jobId,
            companyId,
        }: {
            jobId: string;
            companyId: string;
        }) => {
            const result = await getJobService()
                .then((s) => s.deleteJob(jobId))
                .catch((e) => console.error(e));

            if (!isOk(result)) {
                return null;
            }

            return companyId;
        },
        onSuccess: async (data) => {
            successToast({
                message: "Job deleted successfully",
            });

            return await queryClient.invalidateQueries({
                queryKey: ["jobPostedByCompany", data],
            });
        },
    });
}


/**
 * useToggleJobVisibility function
 * Handles the toggling of job visibility
 * @returns {object} - The mutation object from react-query
 */
export function useToggleJobVisibility() {
    const queryClient = useQueryClient();
    const { getJobService } = useService();
    const { successToast } = useToaster();
    return useMutation({
        mutationFn: async ({
            jobId,
            companyId,
        }: {
            jobId: string;
            companyId: string;
        }) => {
            const result = await getJobService()
                .then((s) => s.toggleJobVisibility(jobId))
                .catch((e) => console.error(e));

            if (!isOk(result)) {
                return null;
            }

            return companyId;
        },
        onSuccess: async (data) => {
            successToast({
                message: "Job visibility toggled successfully",
            });

            return await queryClient.invalidateQueries({
                queryKey: ["jobPostedByCompany", data],
            });
        },
    });
}
