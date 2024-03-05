import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineQueryBuilder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import imageHandler from "../../utils/imageHandler";
import convertToDate from "../../utils/convertToDate";
import SocialMediaItem from "../../components/company/SocialMediaItem";
import { getCompany, getCompanyIndustries } from "../../datas/queries/companyQueries";
import CreateReviewModal from "../../components/modal/CreateReviewModal";
import React, { useState } from "react";
import CompanyDetailReview from "../../components/review/CompanyDetailReview";
import purifyDOM from "../../utils/purifyDOM";

export interface IReviewSortForm {
    orderBy: string;
}

export default function CompanyDetailPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nav = useNavigate();
    const { id } = useParams<string>();
    const { data: company, isLoading: companyLoading } = getCompany(id);
    const { data: industries, isLoading: industriesLoading } = getCompanyIndustries(id);

    if (!id) {
        nav(-1);
        return;
    }

    // TODO: jadiin skeleton masukin return ()
    if (companyLoading && industriesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FrontPageLayout className="h-full">
                <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center">
                    <div className="flex flex-col place-items-center gap-2 xl:w-[calc(100%-1rem)] 2xl:w-4/5">
                        <CardLayout className="relative flex w-full flex-row place-items-center gap-10 rounded-lg rounded-tl-none rounded-tr-none border-t-0 p-6">
                            <div className="relative">
                                <img
                                    className="border-signature-gray aspect-square border-[1px] object-cover xl:w-48 2xl:w-96"
                                    src={imageHandler(company?.image)}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3 px-2">
                                    <h2 className="relative m-0 p-0 text-5xl font-semibold">
                                        <span className="relative">{company?.name}</span>
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
                                            <p className="font-semibold">{convertToDate(Number(company?.timestamp)).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                            <MdOutlineLocationOn size="2rem" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Location</p>
                                            <p className="font-semibold">{company?.office_locations?.[0]}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                            <MdOutlinePeopleAlt size="2rem" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Visitors</p>
                                            {/*//TODO ADD VISITORS*/}
                                            <p className="font-semibold">{Number(company?.seen)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardLayout>
                        <div className="flex w-full flex-row gap-2">
                            <div className="flex h-auto w-[70%] flex-col gap-2">
                                <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-lg p-10">
                                    <h3 className="m-0 p-0 text-4xl font-semibold">Company Profile</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: purifyDOM(company?.profile),
                                        }}
                                    />
                                </CardLayout>
                                <CompanyDetailReview
                                    companyId={id}
                                    onCreateReviewClick={() => setIsModalOpen(true)}
                                />
                            </div>
                            <div className="flex w-[30%] flex-col gap-2">
                                <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                    <h3 className="m-0 p-0 text-4xl font-semibold">Industries</h3>
                                    <div className="flex flex-row flex-wrap gap-3">
                                        {industries?.map((industry, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="bg-blue-primary flex flex-row gap-2 rounded-md p-2 px-3 font-semibold text-white opacity-80 transition-opacity hover:opacity-100">
                                                    {industry}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardLayout>
                                <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                    <h3 className="m-0 p-0 text-4xl font-semibold">Social Medias</h3>
                                    <div className="flex flex-col flex-wrap gap-3">
                                        {company?.social_medias?.map((contact, i) => {
                                            return (
                                                <SocialMediaItem
                                                    key={i}
                                                    url={contact}
                                                />
                                            );
                                        })}
                                    </div>
                                </CardLayout>
                                <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                    <h3 className="m-0 p-0 text-4xl font-semibold">Locations</h3>
                                    <div className="flex flex-col flex-wrap gap-3">
                                        {company?.office_locations.map((location, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex flex-row gap-2 rounded-md bg-white p-2 px-3 font-semibold text-black opacity-80 transition-opacity hover:opacity-100">
                                                    {location}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardLayout>
                            </div>
                        </div>
                    </div>
                </div>
            </FrontPageLayout>
            <CreateReviewModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </>
    );
}
