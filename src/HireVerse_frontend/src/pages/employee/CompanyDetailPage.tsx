import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineQueryBuilder } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import imageHandler from "../../utils/imageHandler";
import convertToDate from "../../utils/convertToDate";
import SocialMediaItem from "../../components/company/SocialMediaItem";
import { getCompany, getCompanyIndustries } from "../../datas/queries/companyQueries";
import CreateReviewModal from "../../components/modal/CreateReviewModal";
import React, { useState } from "react";
import CompanyDetailReview from "../../components/review/CompanyDetailReview";
import purifyDOM from "../../utils/purifyDOM";
import { FaLinkedin } from "react-icons/fa";
import EditReviewModal from "../../components/modal/EditReviewModal";
import { Review } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import getIndustryColor from "../../utils/industryColor";

export interface IReviewSortForm {
    orderBy: string;
}

export default function CompanyDetailPage() {
    const [editReview, setEditReview] = useState<Review | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const nav = useNavigate();
    const { id } = useParams<string>();
    const { data: company, isLoading: companyLoading } = getCompany(id);
    const { data: industries, isLoading: industriesLoading } = getCompanyIndustries(id);

    const handleEditReview = (review: Review) => {
        setEditReview(review);
        setIsEditModalOpen(true);
    };

    if (!id) {
        nav(-1);
        return;
    }

    if (companyLoading && industriesLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <FrontPageLayout>
                <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center ">
                    <div className="flex flex-col place-items-center gap-2 px-4 md:px-0 xl:w-[calc(100%-1rem)] 2xl:w-4/5">
                        <div className="my-12 flex w-full flex-col gap-8 md:flex-row">
                            <div className="sticky top-20 flex h-fit w-full flex-col gap-4 px-32 md:sticky md:top-10 md:w-[30%] md:px-0">
                                <div className="relative">
                                    <img
                                        className="border-signature-gray aspect-square w-full rounded-xl border-[1px] object-cover"
                                        src={imageHandler(company?.image)}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="flex h-auto w-full flex-col gap-2 md:w-[70%]">
                                {/* Header Section */}
                                <div className="flex flex-col gap-4 px-12 md:px-4">
                                    <h2 className="relative m-0 p-0 text-5xl font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap w-[50vw]">
                                        <span className="relative">{company?.name}</span>
                                    </h2>
                                    <div className="flex flex-row place-items-center gap-2 ">
                                        {industries?.map((industry, i) => {
                                            return (
                                                <div
                                                key={i}
                                                    style={{
                                                        backgroundColor: getIndustryColor(industry),
                                                        color: getIndustryColor(industry, "text"),
                                                        borderColor: getIndustryColor(industry, "border"),
                                                    }}
                                                    className="cursor-default rounded-3xl px-4 py-1 border">
                                                    {industry}

                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-row place-items-start gap-2 flex-wrap">
                                        <Link
                                            className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pe-3 font-bold text-blue-500 transition-colors *:cursor-pointer"
                                            to={company?.linkedin ?? ""}
                                            target="_blank">
                                            <FaLinkedin />
                                            {company?.linkedin}
                                        </Link>
                                        {company?.social_medias?.map((contact, i) => {
                                            return (
                                                <SocialMediaItem
                                                    key={i}
                                                    url={contact}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-evenly lg:flex-row pt-7 px-12 md:px-0">
                                    <div className="flex flex-row gap-3">
                                        <div className="flex aspect-square place-items-center rounded-3xl p-2">
                                            <MdOutlineQueryBuilder size="2rem" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Founded</p>
                                            <p className="font-semibold">{convertToDate(Number(company?.timestamp)).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="flex aspect-square place-items-center rounded-3xl p-2">
                                            <MdOutlineLocationOn size="2rem" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Location</p>
                                            <div className="flex flex-row overflow-ellipsis overflow-hidden whitespace-nowrap w-[20vw]">
                                                {company?.office_locations?.map((location, i) => {
                                                    return (
                                                        <>
                                                            {i !== 0 && (
                                                                <p
                                                                    key={i}
                                                                    className="pr-1 font-semibold">
                                                                    ,{" "}
                                                                </p>
                                                            )}
                                                            <p
                                                                key={i}
                                                                className="font-semibold">
                                                                {location}
                                                            </p>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="flex aspect-square place-items-center rounded-3xl p-2">
                                            <MdOutlinePeopleAlt size="2rem" />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-600">Visitors</p>
                                            {/*//TODO ADD VISITORS*/}
                                            <p className="font-semibold">{Number(company?.seen)}</p>
                                        </div>
                                    </div>
                                </div>

                                <CardLayout className="flex min-h-[5rem] flex-col gap-5 rounded-lg p-10 mt-6">
                                    <h3 className="m-0 p-0 text-4xl font-semibold">Company Profile</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: purifyDOM(company?.profile),
                                        }}
                                    />
                                </CardLayout>
                                <CompanyDetailReview
                                    companyId={company?.id ?? ""}
                                    onCreateReviewClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
                                    setEditable={handleEditReview}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </FrontPageLayout>
            <CreateReviewModal
                isOpen={isCreateModalOpen}
                setIsOpen={setIsCreateModalOpen}
            />
            <EditReviewModal
                review={editReview}
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
            />
        </>
    );
}
