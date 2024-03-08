import { FaLinkedin } from "react-icons/fa";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { Company } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { Link, useNavigate } from "react-router-dom";
import imageHandler from "../../utils/imageHandler";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useForm } from "react-hook-form";
import CompanyFilter, { IFilterCompanyForm } from "../../components/form/CompanyFilter";
import { getFilterCompany } from "../../datas/queries/jobQueries";
import BriefCompanyReview from "../../components/review/BriefCompanyReview";
import StarReview from "../../components/review/StarReview";

export interface IQueryCompanyFilter {
    location: string;
    industries: string;
}

const defaultValue: IQueryCompanyFilter = {
    location: "",
    industries: "",
};

export default function FindCompanyPage() {

    const { getJobService } = useService();

    const nav = useNavigate();
    const [shownCompanyId, setShownCompanyId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [searchCompany, setSearchCompany] = useState<Company[] | null>();
    const [resultCompanies, setResultCompanies] = useState<Company[] | null>();
    const [filter, setFilter] = useState<IFilterCompanyForm>(defaultValue);
    const { detector, isIntersecting } = useInfiniteScroll();
    const {
        data: company,
        refetch: reGetFilteredCompany,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = getFilterCompany(filter);

    useEffect(() => {
        if (isIntersecting && !isFetching) {
            fetchNextPage();
        }
    }, [isIntersecting]);

    useEffect(() => {
        if (search.length > 0) {
            const searched = resultCompanies?.filter((company) => {
                return company?.name.toLowerCase().includes(search.toLowerCase());
            });

            setSearchCompany(searched);
        } else {
            setSearchCompany(resultCompanies);
        }
    }, [search]);

    useEffect(() => {
        if (company && company.pages[0] && !shownCompanyId) {
            setShownCompanyId(company.pages[0][0]?.id);


        }
        setResultCompanies(company?.pages[0]);
        setSearchCompany(company?.pages[0]);

        console.log(company?.pages[0]);
    }, [company]);

    useEffect(() => {
        reGetFilteredCompany();
    }, [filter]);

    useEffect(() => {
        setResultCompanies(company?.pages[0]);
        setSearchCompany(resultCompanies);
    }, []);

    return (
        <FrontPageLayout>
            <div className="flex flex-col overflow-hidden">
                <div className="h-fit w-full place-items-center bg-[url(backgrounds/subtle-prism.svg)] shadow-md md:h-[360px] lg:h-[640px]">
                    <div className="flex flex-col place-items-center gap-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex w-full flex-col gap-3 self-start">
                                <h3 className="text-4xl font-bold lg:text-5xl">Popular Companies</h3>
                                <p className="text-lg leading-6 lg:text-xl">These companies have the largest visitor
                                    count this month.</p>
                            </div>
                            <div className="flex w-full flex-row items-center gap-10">
                                <div className="grid h-fit grid-cols-2 gap-4 py-8">
                                    {resultCompanies?.slice(0, 4).map((company: Company | null) => {
                                        return (
                                            <CardLayout
                                                className="flex h-32 w-64 p-4 xl:w-80"
                                                key={company?.id}
                                                onClick={() => {
                                                    nav(`/company/detail/${company?.id}`);
                                                }}>
                                                <div className="flex flex-row place-items-center">
                                                    <img
                                                        width="80rem"
                                                        height="auto"
                                                        className="mr-4 aspect-square rounded-xl object-cover"
                                                        src={imageHandler(company?.image)}
                                                        alt="Company Image"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold mb-2">{company?.name}</div>
                                                        <BriefCompanyReview company_id={company?.id || ""} />
                                                    </div>
                                                </div>
                                            </CardLayout>
                                        );
                                    })}
                                </div>
                                <div className="hidden xl:block">
                                    <img
                                        className="w-[25rem]"
                                        src="/storyset/job-offers-bro.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col place-items-center gap-8 p-8">
                    <div
                        style={{
                            width: "min(1000px, 100%)",
                        }}
                        className="h-[85vh]">
                        <div className="flex w-full flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                Find your dream company
                                <CardLayout className="flex w-full flex-row items-center gap-2 p-2">
                                    <IoIosSearch size="1.5rem" />
                                    <input
                                        type="text"
                                        className="outline-0 w-full"
                                        placeholder="Search Company"
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                    />
                                </CardLayout>
                            </div>
                            <div className="flex flex-row gap-4">
                                <CompanyFilter onApplyFilter={(data) => setFilter(data)} />
                                {searchCompany?.length === 0 ? (
                                    <div
                                        className="flex flex-col place-items-center justify-center gap-2 grow text-xl font-bold">
                                        <iframe
                                            src="https://lottie.host/embed/5f39d49f-6200-47c8-a2fa-1ee1546baa76/WGdU5jzKs1.json"
                                            className="w-96 h-96"></iframe>
                                        Company not found
                                    </div>
                                ) : (

                                    <div
                                        className="grid h-[70vh] max-w-[46rem] grow lg:grid-cols-2 md:grid-cols-1 gap-4 overflow-y-scroll justify-center">
                                        {searchCompany?.map((cp, index) => {
                                            return (
                                                <CardLayout
                                                    className="h-fit flex flex-col gap-2 rounded-md bg-white px-6 py-5 hover:cursor-pointer hover:bg-gray-100"
                                                    key={index}
                                                    onClick={() => {
                                                        nav(`/company/detail/${cp?.id}`);
                                                    }}>
                                                    <div className="flex flex-row place-items-center">
                                                        <img
                                                            className="mr-4 aspect-square w-24 rounded-xl object-cover"
                                                            src={imageHandler(cp?.image)}
                                                            alt="Company Image"
                                                        />
                                                        <div className="flex flex-col">
                                                            <div className="font-bold mb-1 w-[12rem] overflow-ellipsis overflow-hidden whitespace-nowrap ">{cp?.name}</div>
                                                            <StarReview company_id={cp?.id || ""} />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div className="flex flex-col">
                                                                <div className="text-sm font-bold">Location:</div>
                                                                <div>{cp?.office_locations[0]}</div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="text-sm font-bold">Country:</div>
                                                                <div>{cp?.founded_country}</div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div className="text-sm font-bold">Industry:</div>
                                                                <div>{cp?.founded_year.toString()}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold mb-2">Linkedin:</div>
                                                            <Link
                                                                className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pt-1 pb-1 font-bold text-blue-500 transition-colors *:cursor-pointer text-xs"
                                                                to={cp?.linkedin ?? ""}
                                                                target="_blank">
                                                                <FaLinkedin />
                                                                {cp?.linkedin}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </CardLayout>
                                            );
                                        })}
                                    </ div>
                                )}
                                <div ref={detector}>{hasNextPage}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
