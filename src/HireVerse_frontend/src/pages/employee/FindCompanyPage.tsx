import { FaLinkedin } from "react-icons/fa";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { Company } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { useNavigate } from "react-router-dom";
import imageHandler from "../../utils/imageHandler";
import canisterInjector from "../../utils/canisterInjector";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useForm } from "react-hook-form";
import CompanyFilter, { IFilterCompanyForm } from "../../components/form/CompanyFilter";
import { getFilterCompany} from "../../datas/queries/jobQueries";

export interface IQueryCompanyFilter {
    location: string,
    industries: string,
    experience: string
}

const defaultValue : IQueryCompanyFilter = {
    location: "",
    industries: "",
    experience: ""
}

export default function FindCompanyPage() {
    const nav = useNavigate();
    const { getCompanyService } = useService();
    const [shownCompanyId, setShownCompanyId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [searchCompany, setSearchCompany] = useState<Company[] | undefined>([]);
    const [popularCompanies, setPopularCompanies] = useState<Company[]>();
    const [resultCompanies, setResultCompanies] = useState<Company[]>();
    const [filter, setFilter] = useState<IFilterCompanyForm>(defaultValue);
    const { detector, isIntersecting } = useInfiniteScroll();
    const { register, control, getValues, formState} = useForm<IQueryCompanyFilter>({
        defaultValues: defaultValue,
    });

    // Initialize isFetching state
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        if (detector && isIntersecting && !isFetching) {
            fetchNextPage();
        }
    }, [detector, isIntersecting, isFetching]);

    const { data: company, refetch: reGetFilteredCompany, fetchNextPage, hasNextPage } = getFilterCompany(filter, getValues);

    useEffect(() => {
        const searchJob = async () => {
            const response = await getCompanyService().then((s) => s.getCompanies());
            setResultCompanies(response);
            setSearchCompany(response);
        };
        searchJob();
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            const searched = resultCompanies?.filter((company) => {
                return company.name.toLowerCase().includes(search.toLowerCase());
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
    }, [company]);

    useEffect(() => {
        reGetFilteredCompany();
    }, [filter]);

    return (
        <FrontPageLayout>
            <div className="flex flex-col overflow-hidden">
                <div className="h-fit w-full place-items-center bg-[url(src/HireVerse_frontend/backgrounds/subtle-prism.svg)] shadow-md">
                    <div className="h-[100vh] flex flex-col place-items-center gap-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex w-full flex-col gap-3 self-start">
                                <h3 className="text-4xl font-bold lg:text-5xl">Popular Companies</h3>
                                <p className="text-lg leading-6 lg:text-xl">These companies have the largest visitor count this month.</p>
                            </div>
                            <div className="flex w-full flex-row items-center gap-10">
                                <div className="grid h-fit grid-cols-2 gap-4 py-8">
                                    {resultCompanies?.slice(0, 4).map((company: Company) => {
                                        return (
                                            <CardLayout
                                                className="flex h-32 w-64 p-4 xl:w-80"
                                                key={company.id}
                                                onClick={() => {
                                                    nav(`/company/detail/${company.id}`);
                                                }}>
                                                <div className="flex flex-row place-items-center">
                                                    <img
                                                        width="80rem"
                                                        height="auto"
                                                        className="mr-4 aspect-square rounded-xl object-cover"
                                                        src={imageHandler(company.image)}
                                                        alt="Company Image"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold">{company.name}</div>
                                                        <div>
                                                            TODO: Taroh star disini TODO: Taroh jumlah
                                                            {/* {company.rating} */}
                                                        </div>
                                                        <div className="text-xs">
                                                            TODO: review count
                                                            {/* {
                                                                    company.reviewCount
                                                                }{" "} */}
                                                            Reviews
                                                        </div>
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
                                        className="outline-0"
                                        placeholder="Search Company"
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                    />
                                </CardLayout>
                            </div>
                            <div className="flex flex-row gap-4">
                                <CompanyFilter onApplyFilter={(data) => setFilter(data)} />
                                <div className="h-[70vh] grid grow grid-cols-2 gap-4 pr-4 overflow-y-scroll">
                                    {searchCompany?.map((cp, index) => {
                                        return (
                                            <CardLayout
                                                className="flex flex-col gap-2 rounded-md bg-white px-6 py-5 hover:cursor-pointer hover:bg-gray-100"
                                                key={index}
                                                onClick={() => {
                                                    nav(`/company/detail/${cp.id}`);
                                                }}>
                                                <div className="flex flex-row place-items-center">
                                                    <img
                                                        className="mr-4 aspect-square w-24 rounded-xl object-cover"
                                                        src={imageHandler(cp.image)}
                                                        alt="Company Image"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="font-bold">{cp.name}</div>
                                                        <div>X X X X X 4.9</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div className="grid grid-cols-3">
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">Location:</div>
                                                            <div>{cp.office_locations[0]}</div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">Country:</div>
                                                            <div>{cp.founded_country}</div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">Industry:</div>
                                                            <div>{cp.founded_year.toString()}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-bold">Linkedin:</div>
                                                        <div className="flex flex-row place-items-center gap-2">
                                                            <FaLinkedin />
                                                            {cp.linkedin}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardLayout>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
