import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import CustomDropdown from "../../components/form/CustomDropdown";
import JobItem from "../../components/job/JobItem";
import { IoLocationOutline } from "react-icons/io5";
import CountryDropdown from "../../components/form/CountryDropdown";
import JobDetail from "../../components/job/JobDetail";
import { Job } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import JobFilter, { IFilterForm } from "../../components/form/JobFilter";
import { useForm } from "react-hook-form";
import { JobFilterInput } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import convertNullFormat from "../../utils/convertNullFormat";
import useService from "../../hooks/useService";

interface IQueryFilterSortForm {
    country: string;
    order: string;
    query: string;
}

const temp = ["Newest", "Oldest", "Highest Salary", "Lowest Salary"];

export default function FindJobs() {
    const { jobService, companyService } = useService();
    const [filter, setFilter] = useState<IFilterForm>({
        salaryStart: 0,
        salaryEnd: 0,
        industry: "",
        experience: "",
        datePosted: "",
    });
    const { register, control, getValues, formState } =
        useForm<IQueryFilterSortForm>({
            defaultValues: {
                country: "USA",
                order: "Newest",
                query: "",
            },
        });
    const [jobs, setJobs] = useState<Job[]>();
    const [companyNames, setCompanyNames] = useState<string[]>([]);
    const [shownJobId, setShownJobId] = useState<string>("");

    const getConvertedFilters = () => {
        const values = getValues();
        const jobFilter: JobFilterInput = {
            country: convertNullFormat(values.country, ""),
            order: convertNullFormat(values.order, ""),
            experience: convertNullFormat(filter.experience, ""),
            industry: convertNullFormat(filter.industry, ""),
            position: convertNullFormat(values.query, ""),
            date_posted: convertNullFormat(
                BigInt(filter.datePosted),
                BigInt(0),
            ),
            salary_end: convertNullFormat(BigInt(filter.salaryEnd), BigInt(0)),
            salary_start: convertNullFormat(
                BigInt(filter.salaryStart),
                BigInt(0),
            ),
        };

        return jobFilter;
    };
    const getJobs = async (initial?: boolean) => {
        const filter = getConvertedFilters();

        const response = await jobService.getJobs(
            BigInt(0),
            BigInt(10),
            filter,
        );

        const companyIds = response.map((job) => job.company_id);
        const names = await companyService.getCompanyNames(companyIds);

        setJobs(response);
        setCompanyNames(names);

        if (initial && response.length > 0) {
            setShownJobId(response[0].id);
        }
    };

    const handleKeyDown = (key: string) => {
        if (key === "Enter") {
            getJobs();
        }
    };

    useEffect(() => {
        getJobs();
    }, [filter]);

    useEffect(() => {
        if (jobService && companyService) {
            getJobs(true);
        }
    }, [jobService, companyService]);

    return (
        <FrontPageLayout>
            <div className="flex h-full w-full flex-col place-items-center gap-20">
                <div className="h-[60vh] w-full bg-[url(public/backgrounds/subtle-prism.svg)] shadow-md">
                    <div className="flex h-full w-full flex-row items-center justify-center gap-20">
                        <div className="flex w-2/6 flex-col gap-5">
                            <h3 className="text-4xl font-bold lg:text-5xl">
                                Find Your Dream Job Now.
                            </h3>
                            <p className="text-lg leading-6 lg:text-xl">
                                Find your dream job now! Our platform connects
                                you with top employers and provides valuable
                                resources to enhance your job search experience.
                                Start exploring today for a brighter future and
                                take the first step towards a fulfilling career.
                            </p>
                        </div>
                        <img
                            className="w-[25vw]"
                            src="/storyset/resume-folder-cuate.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex w-3/4 flex-col gap-10 pb-10">
                    <div className="flex w-full flex-row gap-5">
                        <JobFilter onApplyFilter={(data) => setFilter(data)} />
                        <CardLayout className="flex w-full flex-row items-center">
                            <span className="flex flex-1 flex-row gap-2 rounded-bl-xl rounded-tl-xl p-3 transition-colors has-[:focus]:bg-gray-100">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    {...register("query")}
                                    type="text"
                                    className="w-full bg-transparent outline-0"
                                    placeholder="Search Job"
                                    onKeyDown={(e) => handleKeyDown(e.key)}
                                />
                            </span>
                            <span className="border-signature-gray flex flex-row items-center gap-2 rounded-br-xl rounded-tr-xl border-l-[1px] p-1 pl-5 transition-colors has-[:focus]:bg-gray-100">
                                <IoLocationOutline size="1.5rem" />
                                <CountryDropdown
                                    name="country"
                                    control={control}
                                    onChange={(_) => getJobs()}
                                />
                            </span>
                        </CardLayout>
                    </div>
                    <div className="flex h-full w-full flex-row gap-3">
                        <div className="flex h-auto flex-col gap-1">
                            <CardLayout className="mr-2 flex flex-row items-center justify-between pe-2 ps-5">
                                {jobs?.length} Jobs
                                <CustomDropdown
                                    name="order"
                                    control={control}
                                    states={temp}
                                    onChange={(_) => getJobs()}
                                />
                            </CardLayout>
                            <div className="card-scollr flex w-96 flex-col gap-2 overflow-y-auto overflow-x-hidden pr-1">
                                {jobs?.map((job, index) => {
                                    return (
                                        <JobItem
                                            key={index}
                                            job={job}
                                            onClick={() =>
                                                setShownJobId(job.id)
                                            }
                                            companyName={companyNames[index]}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2">
                            <JobDetail jobId={shownJobId} />
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
