import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import {
    MdOutlineLocationOn,
    MdOutlinePeopleAlt,
    MdOutlineQueryBuilder,
} from "react-icons/md";
import CompanyReviewSummary from "../../components/company/CompanyReviewSummary";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useService from "../../hooks/useService";
import { Company } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { isOk } from "../../utils/resultGuarder";
import imageHandler from "../../utils/imageHandler";
import convertToDate from "../../utils/convertToDate";
import SocialMediaItem from "../../components/company/SocialMediaItem";

export default function CompanyDetail() {
    const nav = useNavigate();

    const { id } = useParams<string>();
    const { getCompanyService } = useService();

    const [company, setCompany] = useState<Company>();

    if (!id) {
        nav(-1);
        return;
    }

    useEffect(() => {
        const fetchCompany = async () => {
            const service = await getCompanyService();
            const companyData = await service.getCompany(id);

            if (isOk(companyData)) {
                setCompany(companyData.ok);
                console.log(companyData.ok);
            }
        };

        fetchCompany();
    }, [id]);

    // TODO: jadiin skeleton masukin return ()
    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <FrontPageLayout className="h-full">
            <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center">
                <div className="flex xl:w-[calc(100%-1rem)] 2xl:w-4/5 flex-col place-items-center">
                    <CardLayout className="relative flex w-full flex-row place-items-center gap-10 rounded-none rounded-tl-none rounded-tr-none border-t-0 p-6">
                        <div className="relative">
                            <img
                                className="border-signature-gray aspect-square border-[1px] object-cover xl:w-48 2xl:w-96"
                                src={imageHandler(company?.image)}
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3 px-2">
                                <h2 className="relative text-5xl font-bold">
                                    <span className="relative">
                                        {company?.name}
                                    </span>
                                </h2>
                                <a
                                    className="px-1 text-lg"
                                    href={company?.linkedin}>
                                    {company?.linkedin}
                                </a>
                            </div>
                            <div className="flex flex-row gap-28">
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlineQueryBuilder size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Founded</p>
                                        <p className="font-bold">
                                            {convertToDate(
                                                Number(
                                                    company?.timestamp,
                                                ),
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlineLocationOn size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Location
                                        </p>
                                        <p className="font-bold">
                                            {
                                                company
                                                    ?.office_locations?.[0]
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlinePeopleAlt size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Visitors
                                        </p>
                                        {/*//TODO ADD VISITORS*/}
                                        <p className="font-bold">
                                            {Number(company?.seen)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardLayout>
                    <div className="flex w-full flex-row">
                        <div className="flex h-auto w-[70%] flex-col">
                            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">
                                    Company Profile
                                </h3>
                                <p>{company?.profile}</p>
                            </CardLayout>
                            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">Reviews</h3>
                                <div>
                                    <CompanyReviewSummary />
                                </div>
                            </CardLayout>
                        </div>
                        <div className="flex w-[30%] flex-col">
                            <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">
                                    Industries
                                </h3>
                                <div className="flex flex-row flex-wrap gap-3">
                                    {/* TODO: ini gtw mau digimanain */}
                                    {/* {company.industries.map((industry, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="bg-blue-primary flex flex-row gap-2 rounded-md p-2 px-3 font-bold text-white opacity-80 transition-opacity hover:opacity-100">
                                                {industry}
                                            </div>
                                        );
                                    })} */}
                                </div>
                            </CardLayout>
                            <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">
                                    Social Medias
                                </h3>
                                <div className="flex flex-col flex-wrap gap-3">
                                    {company?.social_medias.map(
                                        (contact, i) => {
                                            return (
                                                <SocialMediaItem
                                                    url={contact}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </CardLayout>
                            <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">
                                    Locations
                                </h3>
                                <div className="flex flex-col flex-wrap gap-3">
                                    {company?.office_locations.map(
                                        (location, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="bg-white text-black flex flex-row gap-2 rounded-md p-2 px-3 font-bold opacity-80 transition-opacity hover:opacity-100">
                                                    {location}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </CardLayout>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
