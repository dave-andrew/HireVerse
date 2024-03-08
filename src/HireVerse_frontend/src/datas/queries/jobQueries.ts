import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";
import useService from "../../hooks/useService";
import { IFilterForm } from "../../components/form/JobFilter";
import { JobFilterInput } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import convertNullFormat from "../../utils/convertNullFormat";
import { IQueryFilterSortForm } from "../../pages/employee/FindJobsPage";
import { Company, JobManagerFilterInput } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { IQuerySortForm } from "../../pages/employers/CompanyJobsPage";
import { IJobItem } from "../../components/job/JobItem";
import { IJobDetail } from "../../components/job/JobDetail";
import { IFilterCompanyForm } from "../../components/form/CompanyFilter";
import { IQueryCompanyFilter } from "../../pages/employee/FindCompanyPage";
import { FilterCompany } from "../../../../declarations/HireVerse_job/HireVerse_job.did";


/**
 * Fetches the details of a specific job.
 * @param {string | undefined} jobId - The ID of the job.
 * @returns {QueryObserverResult} A query observer result containing the job's details or null if the job ID is not provided.
 */
export function getJobDetails(jobId: string | undefined) {
    const { getJobService, getCompanyService } = useService();
    return useQuery({
        queryKey: ["jobDetails", jobId],
        queryFn: async () => {
            if (!jobId) {
                return null;
            }

            const response = await getJobService()
                .then((s) => s.getJob(jobId))
                .catch((e) => console.error(e));

            if (!isOk(response)) {
                return null;
            }

            const job = response.ok;

            const responseCompany = await getCompanyService()
                .then((s) => s.getCompanyNameAndImages([job.company_id]))
                .catch((e) => console.error(e));

            if (!isOk(responseCompany)) {
                return null;
            }

            const companyData = responseCompany.ok;

            return {
                id: job.id,
                position: job.position,
                location: job.location,
                currency: job.currency,
                employType: job.employType,
                company: {
                    id: job.company_id,
                    name: companyData[0].name,
                    image: companyData[0].image,
                },
                jobDescription: job.job_description,
                shortDescription: job.short_description,
                requirements: job.requirements,
                salaryEnd: Number(job.salary_end),
                salaryStart: Number(job.salary_start),
                contacts: job.contacts,
                timestamp: Number(job.timestamp),
            } as IJobDetail;
        },
    });
}


/**
 * Fetches the full details of a specific job.
 * @param {string | undefined} jobId - The ID of the job.
 * @returns {QueryObserverResult} A query observer result containing the full job details or null if the job ID is not provided.
 */
export function getFullJob(jobId: string | undefined) {
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


/**
 * Fetches jobs based on provided filters.
 * @param {IFilterForm} filters - The filters to apply.
 * @param {() => IQueryFilterSortForm} getQueryFilters - A function that returns the query filters to apply.
 * @returns {InfiniteQueryObserverResult} An infinite query observer result containing the filtered jobs.
 */
export function getFilteredJobs(filters: IFilterForm, getQueryFilters: () => IQueryFilterSortForm) {
    const { getJobService, getCompanyService } = useService();

    const getConvertedFilters = () => {
        const queryFilters = getQueryFilters();

        const jobFilter: JobFilterInput = {
            country: convertNullFormat(queryFilters.country, ""),
            order: convertNullFormat(queryFilters.order, ""),
            experience: convertNullFormat(filters.experience, ""),
            industry: convertNullFormat(filters.industry, ""),
            position: convertNullFormat(queryFilters.query, ""),
            date_posted: convertNullFormat(BigInt(filters.datePosted), BigInt(0)),
            currency: convertNullFormat(filters.currency, ""),
            salary_end: convertNullFormat(BigInt(filters.salaryEnd), BigInt(0)),
            salary_start: convertNullFormat(BigInt(filters.salaryStart), BigInt(0)),
        };

        return jobFilter;
    };

    return useInfiniteQuery({
        queryKey: [],
        queryFn: async ({ pageParam }) => {
            const response = await getJobService()
                .then((s) => s.getJobs(BigInt(pageParam), BigInt(10), getConvertedFilters()))
                .catch((e) => console.error(e));

            console.log(response);
            if (!isOk(response)) {
                return null;
            }

            const jobs = response.ok;

            const responseCompanyData = await getCompanyService()
                .then((s) => s.getCompanyNameAndImages(jobs.map((j) => j.company_id)))
                .catch((e) => console.error(e));

            if (!isOk(responseCompanyData)) {
                return null;
            }

            const companyData = responseCompanyData.ok;

            return jobs.map((job) => {
                const company = companyData.find((c) => c.id === job.company_id);
                return {
                    id: job.id,
                    position: job.position,
                    location: job.location,
                    currency: job.currency,
                    salaryStart: job.salary_start.toString(),
                    salaryEnd: job.salary_end.toString(),
                    companyName: company?.name || "",
                    companyImage: company?.image || [],
                    timestamp: Number(job.timestamp),
                    employType: job.employType,
                } as IJobItem;
            });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            if (lastPage && lastPage.length == 10) {
                return lastPageParam + 10;
            }
            return undefined;
        },
    });
}


/**
 * Fetches companies based on provided filters.
 * @param {IFilterCompanyForm} filter - The filters to apply.
 * @returns {InfiniteQueryObserverResult} An infinite query observer result containing the filtered companies.
 */
export function getFilterCompany(filter: IFilterCompanyForm) {
    const { getJobService } = useService();

    const getConvertedFilters = () => {
        console.log(filter)
        const companyFilter: FilterCompany = {
            location: convertNullFormat(filter.location, ""),
            industries: convertNullFormat(filter.industries, ""),
        };
        return companyFilter;
    };

    return useInfiniteQuery({
        queryKey: [],
        queryFn: async ({ pageParam }) => {
            const response = await getJobService()
                .then((s) => s.getFilterCompanies(BigInt(pageParam), BigInt(10), getConvertedFilters()))
                .catch((e) => console.error(e));
            if (isOk(response)) {
                const companies = response.ok;

                return companies.map((company) => {
                    return {
                        'id': company.id,
                        'social_medias': company.social_medias,
                        'linkedin': company.linkedin,
                        'job_posting_ids': company.job_posting_ids,
                        'office_locations': company.office_locations,
                        'name': company.name,
                        'seen': company.seen,
                        'company_manager_ids': company.company_manager_ids,
                        'founded_year': company.founded_year,
                        'reviews_ids': company.reviews_ids,
                        'timestamp': company.timestamp,
                        'image': company.image,
                        'founded_country': company.founded_country,
                        'profile': company.profile,
                    } as Company;
                });
            }
            return null;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
            if (lastPage && lastPage.length == 10) {
                return lastPageParam + 10;
            }
            return undefined;
        },
    });
}


/**
 * Fetches the names of specific companies.
 * @param {string[]} companyIds - The IDs of the companies.
 * @param {boolean} autoFetch - Whether to automatically fetch the data.
 * @returns {QueryObserverResult} A query observer result containing the companies' names or null if autoFetch is false.
 */
export function getCompanyNames(companyIds: string[], autoFetch: boolean = false) {
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


/**
 * Fetches all job industries.
 * @returns {QueryObserverResult} A query observer result containing all job industries.
 */
export function getJobIndustries() {
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


/**
 * Fetches all companies.
 * @returns {QueryObserverResult} A query observer result containing all companies.
 */
export function getCompanies() {
    const { getCompanyService } = useService();
    return useQuery({
        queryKey: ["companies"],
        queryFn: async () => {
            const response = await getCompanyService()
                .then((s) => s.getCompanies())
                .catch((e) => console.error(e));
            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
    });
}


/**
 * Fetches a user object by email.
 * @param {string} email - The email of the user.
 * @returns {QueryObserverResult} A query observer result containing the user object or null if the email is not provided.
 */
export function getUserObjectByEmail(email: string) {
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


/**
 * Fetches the managers of a specific company.
 * @param {string | undefined} companyId - The ID of the company.
 * @returns {QueryObserverResult} A query observer result containing the company's managers or null if the company ID is not provided.
 */
export function getManagersFromCompany(
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


/**
 * Fetches the jobs posted by a specific company.
 * @param {string | undefined} companyId - The ID of the company.
 * @param {() => IQuerySortForm} getValues - A function that returns the query filters to apply.
 * @returns {QueryObserverResult} A query observer result containing the jobs posted by the company or null if the company ID is not provided.
 */
export function getJobPostedByCompany(companyId: string | undefined, getValues: () => IQuerySortForm) {
    const { getJobService } = useService();

    const getConvertedFilters = () => {
        const values = getValues();
        const jobFilter: JobManagerFilterInput = {
            order: convertNullFormat(values.order, ""),
            position: convertNullFormat(values.query, ""),
            status: convertNullFormat(values.status === "All" ? "" : values.status.toLowerCase(), ""),
        };
        return jobFilter;
    };

    return useQuery({
        queryKey: ["jobPostedByCompany", companyId],
        queryFn: async () => {
            if (!companyId) {
                return;
            }

            const response = await getJobService()
                .then((s) => s.getJobPostedByCompany(companyId, BigInt(0), BigInt(20), getConvertedFilters()))
                .catch((e) => console.error(e));

            console.log(response);
            if (isOk(response)) {
                return response.ok;
            }
            return null;
        },
    });
}
