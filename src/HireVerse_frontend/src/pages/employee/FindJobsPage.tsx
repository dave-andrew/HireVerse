import { Fragment, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import TextDropdown from "../../components/form/TextDropdown";
import JobItem from "../../components/job/JobItem";
import { IoLocationOutline } from "react-icons/io5";
import JobDetail from "../../components/job/JobDetail";
import JobFilter, { IFilterForm } from "../../components/form/JobFilter";
import { useForm } from "react-hook-form";
import { CONSTANTS } from "../../utils/constants";
import handleKeyDown from "../../utils/handleKeyDown";
import JobItemSkeleton from "../../components/job/JobItemSkeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { InfiniteData } from "@tanstack/react-query";
import { getFilteredJobs } from "../../datas/queries/jobQueries";
import WrappedAutoDropdown from "../../components/form/WrappedAutoDropdown";
import { getCompanyCountries } from "../../datas/queries/companyQueries";

export interface IQueryFilterSortForm {
    country: string;
    order: string;
    query: string;
}

export default function FindJobs() {
    const [shownJobId, setShownJobId] = useState<string>("");
    const [filter, setFilter] = useState<IFilterForm>({
        salaryStart: 0,
        salaryEnd: 0,
        industry: "",
        experience: "",
        datePosted: "",
        currency: "",
    });
    const { register, control, getValues, formState } =
        useForm<IQueryFilterSortForm>({
            defaultValues: {
                country: "USA",
                order: "Newest",
                query: "",
            },
        });
    const { data: countries } = getCompanyCountries();
    const {
        data: jobs,
        refetch: reGetFilteredJobs,
        fetchNextPage,
        isFetching,
        hasNextPage,
    } = getFilteredJobs(filter, getValues);
    const { detector, isIntersecting } = useInfiniteScroll();

    const flattenData = (data: InfiniteData<any> | undefined) =>
        data?.pages.flat().filter((j) => j !== null);

    useEffect(() => {
        if (isIntersecting && !isFetching) {
            fetchNextPage();
        }
    }, [isIntersecting]);

    useEffect(() => {
        if (jobs && jobs.pages[0] && !shownJobId) {
            setShownJobId(jobs.pages[0][0]?.id);
        }
    }, [jobs]);

    useEffect(() => {
        reGetFilteredJobs();
    }, [filter]);

    return (
        <FrontPageLayout>
            <div className="relative flex h-[120vh] w-full flex-col place-items-center gap-20 pb-20">
                <div className="w-full bg-[url(public/backgrounds/subtle-prism.svg)] shadow-md md:h-[360px] lg:h-[480px]">
                    <div className="flex h-full w-full flex-row items-center justify-center gap-20">
                        <div className="flex w-full flex-col gap-5 p-8 md:w-2/6">
                            <h3 className="m-0 p-0 text-4xl font-bold lg:text-5xl">
                                Find Your Dream Job Now.
                            </h3>
                            <p className="text-justify text-base leading-6 md:text-sm lg:text-lg">
                                Find your dream job now! Our platform connects
                                you with top employers and provides valuable
                                resources to enhance your job search experience.
                                Start exploring today for a brighter future and
                                take the first step towards a fulfilling career.
                            </p>
                        </div>
                        <img
                            className="hidden md:block md:h-[240px] md:w-[240px] lg:h-[320px] lg:w-[320px]"
                            src="/storyset/resume-folder-cuate.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="md:min-w-[1000px] md:max-w-[1000px] m-auto flex flex-col gap-10 pb-10 lg:min-w-[1200px] lg:max-w-[1200px] relative max-h-[80vh] pb-5">
                    <div className="flex w-full flex-row gap-5 sticky top-0 bg-white z-50 p-3">
                        <JobFilter onApplyFilter={(data) => setFilter(data)} />
                        <CardLayout className="flex w-full flex-row items-center">
                            <span className="flex flex-1 flex-row gap-2 rounded-bl-xl rounded-tl-xl p-3 transition-colors has-[:focus]:bg-gray-100">
                                <IoIosSearch size="1.5rem" />
                                <input
                                    {...register("query")}
                                    type="text"
                                    className="w-full bg-transparent outline-0"
                                    placeholder="Search Job"
                                    onKeyDown={(e) =>
                                        handleKeyDown(
                                            e.key,
                                            "Enter",
                                            reGetFilteredJobs,
                                        )
                                    }
                                />
                            </span>
                            <span className="border-signature-gray flex flex-row items-center gap-2 rounded-br-xl rounded-tr-xl border-l-[1px] p-1 pl-5 transition-colors has-[:focus]:bg-gray-100">
                                <IoLocationOutline size="1.5rem" />
                                <WrappedAutoDropdown
                                    data={countries}
                                    control={control}
                                    defaultData={countries ? countries[0] : ""}
                                    name="country"
                                    onChange={(_) => reGetFilteredJobs()}
                                />
                            </span>
                        </CardLayout>
                    </div>
                    <div className="flex h-full w-full flex-row gap-3">
                        <div className="flex h-auto flex-col gap-1">
                            <CardLayout className="mr-1 flex flex-row items-center justify-between pe-2 py-2 ps-5 shadow-sm">
                                Showing {flattenData(jobs)?.length} Jobs
                                <TextDropdown
                                    name="order"
                                    control={control}
                                    states={CONSTANTS.ORDER}
                                    onChange={(_) => reGetFilteredJobs()}
                                />
                            </CardLayout>
                            <div className="card-scollr flex w-96 flex-col gap-2 overflow-y-auto overflow-x-hidden pr-1">
                                {jobs?.pages.map((p, i) => (
                                    <Fragment key={i}>
                                        {p?.map((job, index) => (
                                            <JobItem
                                                key={job.id}
                                                job={job}
                                                onClick={() =>
                                                    setShownJobId(job.id)
                                                }
                                            />
                                        ))}
                                    </Fragment>
                                ))}
                                {!jobs &&
                                    Array.from({ length: 10 }).map((_, i) => {
                                        return <JobItemSkeleton key={i} />;
                                    })}
                                <div ref={detector}>
                                    {hasNextPage && <JobItemSkeleton />}
                                </div>
                                {jobs && jobs.pages[0]?.length === 0 && (
                                    <div className="flex flex-col items-center justify-center min-h-[75vh]">
                                        <img
                                            className="w-64"
                                            src="storyset/empty-cuate.png"
                                            alt="empty"
                                        />
                                        <h3 className="m-2">No job found</h3>
                                        <p>Try changing your filter</p>
                                    </div>
                                )}
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
