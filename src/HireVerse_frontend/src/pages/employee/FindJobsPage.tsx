import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import CustomDropdown from "../../components/form/CustomDropdown";
import JobItem from "../../components/job/JobItem";
import { IoLocationOutline } from "react-icons/io5";
import CountryDropdown from "../../components/form/CountryDropdown";
import JobDetail from "../../components/job/JobDetail";
import { HireVerse_job } from "../../../../declarations/HireVerse_job";
import { Job } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { HireVerse_company } from "../../../../declarations/HireVerse_company";
import JobFilter, { IFilterForm } from "../../components/form/JobFilter";
import { useForm } from "react-hook-form";
import { JobFilterInput } from "../../../../../.dfx/local/canisters/HireVerse_job/service.did";
import convertNullFormat from "../../utils/convertNullFormat";

interface IQueryFilterSortForm {
    country: string;
    order: string;
    query: string;
}

const temp = ["Newest", "Oldest", "Highest Salary", "Lowest Salary"];

const jobService = HireVerse_job;
const companyService = HireVerse_company;

export default function FindJobs() {
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
        getJobs(true);
    }, []);

    return (
        <FrontPageLayout>
            <div className="flex flex-col w-full h-full place-items-center gap-20">
                <div className="w-full h-[60vh] bg-[url(src/HireVerse_frontend/backgrounds/subtle-prism.svg)] shadow-md">
                    <div className="flex flex-row items-center justify-center w-full h-full gap-20">
                        <div className="flex flex-col w-2/6 gap-5">
                            <h3 className="font-bold text-4xl lg:text-5xl">
                                Find Your Dream Job Now.
                            </h3>
                            <p className="text-lg lg:text-xl leading-6">
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
                <div className="flex flex-col gap-10 w-3/4 pb-10">
                    <div className="flex flex-row gap-5 w-full">
                        <JobFilter onApplyFilter={(data) => setFilter(data)} />
                        <CardLayout className="flex flex-row items-center w-full">
                            <span className="flex flex-1 flex-row gap-2 p-3 has-[:focus]:bg-gray-100 transition-colors rounded-tl-xl rounded-bl-xl">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    {...register("query")}
                                    type="text"
                                    className="outline-0 w-full bg-transparent"
                                    placeholder="Search Job"
                                    onKeyDown={(e) => handleKeyDown(e.key)}
                                />
                            </span>
                            <span className="flex flex-row gap-2 items-center border-signature-gray border-l-[1px] has-[:focus]:bg-gray-100 transition-colors rounded-tr-xl rounded-br-xl p-1 pl-5">
                                <IoLocationOutline size="1.5rem" />
                                <CountryDropdown
                                    name="country"
                                    control={control}
                                    onChange={(_) => getJobs()}
                                />
                            </span>
                        </CardLayout>
                    </div>
                    <div className="flex flex-row w-full h-full gap-3">
                        <div className="h-auto flex flex-col gap-1">
                            <CardLayout className="flex flex-row ps-5 pe-2 justify-between items-center mr-2">
                                {jobs?.length} Jobs
                                <CustomDropdown
                                    name="order"
                                    control={control}
                                    states={temp}
                                    onChange={(_) => getJobs()}
                                />
                            </CardLayout>
                            <div className="flex flex-col w-96 overflow-x-hidden overflow-y-auto card-scollr gap-2 pr-1">
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
                        <div className="flex flex-col w-full gap-2">
                            <JobDetail jobId={shownJobId} />
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
