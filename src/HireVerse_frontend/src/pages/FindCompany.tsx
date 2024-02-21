import PageLayout from "../layouts/PageLayout";
import Sidebar from "../components/Sidebar";
import CardLayout from "../layouts/CardLayout";
import { useState } from "react";
import JobItem from "../components/job/JobItem";

export default function FindCompany() {

    const [popularCompanies, setPopularCompanies] = useState([
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },

    ]);

    return (
        <PageLayout>
            <div className={"flex flex-col"}>
                <div className={"flex flex-col bg-yellow-primary place-items-center p-8 gap-8"}>
                    <div style={{
                        "maxWidth": "1000px",
                    }}>
                        <div className={"flex flex-col"}>
                            <div className={"font-bold text-2xl "}>
                                Popular Companies
                            </div>
                            <div className={"text-gray-800 text-sm"}>These companies have the largest visitor count this
                                month.
                            </div>
                        </div>
                        <div className={"flex flex-row flex-wrap gap-4 mt-4"}>
                            {popularCompanies.map((company) => {
                                return (
                                    <CardLayout className={"w-64 xl:w-80 h-32 flex p-4"}>
                                        <div className={"flex flex-row place-items-center"}>
                                            <img
                                                width={"80rem"}
                                                height={"auto"}
                                                className={"aspect-square"}
                                                src={company.logo}
                                                alt={"Company Image"} />
                                            <div className={"flex flex-col"}>
                                                <div className={"font-semibold"}>{company.name}</div>
                                                <div>{company.rating}</div>
                                                <div className={"text-xs"}>{company.reviewCount} Reviews</div>
                                            </div>
                                        </div>
                                    </CardLayout>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}