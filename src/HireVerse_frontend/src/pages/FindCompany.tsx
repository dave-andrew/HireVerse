import { FaLinkedin } from "react-icons/fa";
import FrontPageLayout from "../layouts/FrontPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../layouts/CardLayout";
import { useState } from "react";
import CustomTextField from "../components/form/CustomTextField";

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

    const [resultCompanies, setResultCompanies] = useState([
        {
            name: "Universitas Tarumanegara",
            location: "Jakarta",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar"
        }, {
            name: "Universitas Airlangga",
            location: "Jakarta",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar"
        }, {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            industry: "Education",
            linkedin: "in/untar"
        }, {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar"
        }, {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar"
        }, {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            industry: "Education",
            linkedin: "in/untar"
        },
    ])

    return (
        <FrontPageLayout>
            <div className={"flex flex-col"}>
                <div
                    className={
                        "flex flex-col bg-yellow-primary place-items-center p-8 gap-8"
                    }>
                    <div
                        style={{
                            maxWidth: "1000px",
                        }}>
                        <div className={"flex flex-col"}>
                            <div className={"font-bold text-2xl "}>
                                Popular Companies
                            </div>
                            <div className={"text-gray-800 text-sm"}>
                                These companies have the largest visitor count
                                this month.
                            </div>
                        </div>
                        <div className={"flex flex-row flex-wrap gap-4 mt-4"}>
                            {popularCompanies.map((company) => {
                                return (
                                    <CardLayout
                                        className={
                                            "w-64 xl:w-80 h-32 flex p-4"
                                        }>
                                        <div
                                            className={
                                                "flex flex-row place-items-center"
                                            }>
                                            <img
                                                width={"80rem"}
                                                height={"auto"}
                                                className={"aspect-square"}
                                                src={company.logo}
                                                alt={"Company Image"}
                                            />
                                            <div className={"flex flex-col"}>
                                                <div
                                                    className={"font-semibold"}>
                                                    {company.name}
                                                </div>
                                                <div>
                                                    TODO: Taroh star disini{" "}
                                                    {company.rating}
                                                </div>
                                                <div className={"text-xs"}>
                                                    {company.reviewCount}{" "}
                                                    Reviews
                                                </div>
                                            </div>
                                        </div>
                                    </CardLayout>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col place-items-center p-8 gap-8"}>
                    <div
                        style={{
                            width: "min(1000px, 100%)",
                        }}>
                        <div className={"flex flex-col gap-8 w-full"}>
                            <div className={"flex flex-col gap-2"}>
                                Find your dream company
                                <CardLayout
                                    className={
                                        "flex flex-row items-center p-2 w-full gap-2"
                                    }>
                                    <IoIosSearch size={"1.5rem"}/>
                                    <input
                                        type={"text"}
                                        className={"outline-0"}
                                        placeholder={"Search Job"}
                                    />
                                </CardLayout>
                            </div>
                            <div className={"flex flex-row"}>
                                <CardLayout
                                    className={"flex flex-col gap-2 w-72 p-4"}>
                                    <div className={"p-1 font-bold text-lg"}>
                                        Filter Companies
                                    </div>
                                    <hr/>
                                    <div className={"p-4 flex flex-col gap-6"}>
                                        <CustomTextField
                                            label={"Location"}
                                            type={"Location"}
                                        />
                                        <CustomTextField
                                            label={"Industries"}
                                            type={"Industries"}
                                        />
                                        <CustomTextField
                                            label={"Job Titles"}
                                            type={"Job Titles"}
                                        />
                                    </div>
                                    <hr/>
                                    <div className={"flex flex-col gap-2 p-4"}>
                                        <div className={"text-xs font-bold"}>
                                            Experience
                                        </div>
                                        <div
                                            className={
                                                "grid grid-cols-2 gap-2"
                                            }>
                                            <div
                                                className={"flex items-center"}>
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    checked={true}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Full-Time
                                                </label>
                                            </div>
                                            <div
                                                className={"flex items-center"}>
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Part-Time
                                                </label>
                                            </div>
                                            <div
                                                className={"flex items-center"}>
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Internship
                                                </label>
                                            </div>
                                            <div
                                                className={"flex items-center"}>
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Volunteer
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </CardLayout>
                                <div className={"grow grid grid-cols-2 gap-4"}>
                                    {resultCompanies.map((cp, index) => {
                                        return (
                                            <CardLayout className={"flex flex-col gap-2 px-6 py-5 rounded-md"}>
                                                <div
                                                    className={"bg-white flex flex-row place-items-center"}
                                                    key={index}>
                                                    <img
                                                        width={"80rem"}
                                                        height={"auto"}
                                                        className={"aspect-square"}
                                                        src={cp.logo}
                                                        alt={"Company Image"}/>
                                                    <div className={"flex flex-col"}>
                                                        <div className={"font-bold"}>{cp.name}</div>
                                                        <div>X X X X X 4.9</div>
                                                    </div>
                                                </div>
                                                <div className={"flex flex-col gap-4"}>
                                                    <div className={"grid grid-cols-3"}>
                                                        <div className={"flex flex-col"}>
                                                            <div className={"font-bold text-sm"}>Location:</div>
                                                            <div>{cp.location}</div>
                                                        </div>
                                                        <div className={"flex flex-col"}>
                                                            <div className={"font-bold text-sm"}>Country:</div>
                                                            <div>{cp.country}</div>
                                                        </div>
                                                        <div className={"flex flex-col"}>
                                                            <div className={"font-bold text-sm"}>Industry:</div>
                                                            <div>{cp.industry}</div>
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-col"}>
                                                        <div className={"font-bold text-sm"}>Linkedin:</div>
                                                        <div className={"flex flex-row gap-2 place-items-center"}> <FaLinkedin /> {cp.linkedin}</div>
                                                    </div>
                                                </div>
                                            </CardLayout>
                                        )
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
