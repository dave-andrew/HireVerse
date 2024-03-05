import {useQuery} from "@tanstack/react-query";
import {isOk} from "../../utils/resultGuarder";
import useService from "../../hooks/useService";
import { IFilterForm } from "../../components/form/JobFilter";
import { JobFilterInput } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import convertNullFormat from "../../utils/convertNullFormat";
import {IQueryFilterSortForm} from "../../pages/employee/FindJobsPage";
import {JobManagerFilterInput} from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import {IQuerySortForm} from "../../pages/employers/CompanyJobs";
import {Principal} from "@dfinity/principal";

export function useQueryFullJob(jobId: string | undefined) {
    const { getJobService } = useService();
    return useQuery({
        queryKey: ["fullJob", jobId],
        queryFn: async () => {
            if (!jobId) {
                return null;
            }

            const response = await getJobService()
                .then((s) => s.getFullJob(jobId))
                .catch((e) => console.error(e));
            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
        enabled: !!jobId && jobId.length > 0,
    });
}

export function useQueryFilteredJobs(
    filters: IFilterForm,
    getQueryFilters: () => IQueryFilterSortForm,
) {
    const { getJobService, getCompanyService } = useService();

    const getConvertedFilters = () => {
        const queryFilters = getQueryFilters();

        const jobFilter: JobFilterInput = {
            country: convertNullFormat(queryFilters.country, ""),
            order: convertNullFormat(queryFilters.order, ""),
            experience: convertNullFormat(filters.experience, ""),
            industry: convertNullFormat(filters.industry, ""),
            position: convertNullFormat(queryFilters.query, ""),
            date_posted: convertNullFormat(
                BigInt(filters.datePosted),
                BigInt(0),
            ),
            currency: convertNullFormat(filters.currency, ""),
            salary_end: convertNullFormat(BigInt(filters.salaryEnd), BigInt(0)),
            salary_start: convertNullFormat(
                BigInt(filters.salaryStart),
                BigInt(0),
            ),
        };

        return jobFilter;
    };

    return useInfiniteQuery({
        queryKey: ["jobs", JSON.stringify(getConvertedFilters())],
        queryFn: async ({ pageParam }) => {
            const response = await getJobService()
                .then((s) =>
                    s.getJobs(
                        BigInt(pageParam),
                        BigInt(10),
                        getConvertedFilters(),
                    ),
                )
                .catch((e) => console.error(e));

            console.log(response);
            if (!isOk(response)) {
                return null;
            }

            const jobs = response.ok;

            const responseCompanyData = await getCompanyService()
                .then((s) =>
                    s.getCompanyNameAndImages(jobs.map((j) => j.company_id)),
                )
                .catch((e) => console.error(e));

            if (!isOk(responseCompanyData)) {
                return null;
            }

            const companyData = responseCompanyData.ok;

            return jobs.map((job) => {
                const company = companyData.find(
                    (c) => c.id === job.company_id,
                );
                return {
                    id: job.id,
                    position: job.position,
                    location: job.location,
                    currency: job.currency,
                    salaryStart: job.salary_start.toString(),
                    salaryEnd: job.salary_end.toString(),
                    companyName: company?.name || "",
                    companyImage: company?.image || [],
                } as IJobItem;
            });
        },
        initialPageParam: 0,
        getNextPageParam: (
            lastPage,
            allPages,
            lastPageParam,
            allPageParams,
        ) => {
            if (lastPage && lastPage.length == 10) {
                return lastPageParam + 10;
            }
            return undefined;
        },
    });
}

export function useQueryCompanyNames(
    companyIds: string[],
    autoFetch: boolean = false,
) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companyNames", companyIds.toString()],
        queryFn: async () => {
            // const response = await getCompanyService()
            //     .then((s) => s.getCompanyNames(companyIds))
            //     .catch((e) => console.error(e));
            // if (isOk(response)) {
            //     return response.ok;
            // }
            return null;
        },
        enabled: autoFetch,
    });
}

export function useQueryJobIndustries() {
    const { getJobService } = useService();
    return useQuery({
        queryKey: ["jobIndustries"],
        queryFn: async () => {
            const response = await getJobService()
                .then((s) => s.getAllIndustry())
                .catch((e) => console.error(e));
            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
    });
}

export function useQueryGetUserObjectByEmail(email: string) {
    const { getBackendService } = useService();
    return useQuery({
        queryKey: ["user", email],
        queryFn: async () => {
            const response = await getBackendService()
                .then((s) => s.getUserObjectByEmail(email))
                .catch((e) => console.error(e));
            if (email.length < 1) return null;

            if (isOk(response)) {
                return response.ok;
            } else {
                throw new Error("User not found");
            }
        },
        enabled: !!email && email.length > 0,
    });
}

export function useQueryManagersFromCompany(
    companyId: string | undefined,
    // getValues: () => IQuerySortForm
) {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["managers", companyId],
        queryFn: async () => {
            if (!companyId) {
                return null;
            }

            const response = await getCompanyService()
                .then((s) => s.getManagersFromCompany(companyId))
                .catch((e) => console.error(e));
            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
        enabled: !!companyId && companyId.length > 0,
    });
}

export function useQueryJobPostedByCompany(
    companyId: string | undefined,
    getValues: () => IQuerySortForm,
) {
    const { getJobService } = useService();

    const getConvertedFilters = () => {
        const values = getValues();
        const jobFilter: JobManagerFilterInput = {
            order: convertNullFormat(values.order, ""),
            position: convertNullFormat(values.query, ""),
            status: convertNullFormat(
                values.status === "All" ? "" : values.status.toLowerCase(),
                "",
            ),
        };
        return jobFilter;
    };

    return useQuery({
        queryKey: ["jobPostedByCompany", companyId],
        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const response = await getJobService().then((s) =>
                s.getJobPostedByCompany(
                    companyId,
                    BigInt(0),
                    BigInt(20),
                    getConvertedFilters(),
                ),
            );

            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
    });
}
