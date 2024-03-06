import CardLayout from "../../layouts/CardLayout";
import {MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineQueryBuilder} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import {Company} from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import convertToDate from "../../utils/convertToDate";
import ProfileEditButton from "../../components/form/ProfileEditButton";
import useImageBlob from "../../hooks/useImageBlob";
import imageHandler from "../../utils/imageHandler";
import EditCompanyModal from "../../components/modal/EditCompanyModal";
import SocialMediaItem from "../../components/company/SocialMediaItem";
import purifyDOM from "../../utils/purifyDOM";
import {getCompanyIndustries} from "../../datas/queries/companyQueries";
import CompanyDetailReview from "../../components/review/CompanyDetailReview";
import {useUpdateCompany} from "../../datas/mutations/companyMutations";
import {FaLinkedin} from "react-icons/fa";

interface IManageCompanyForm {
    image: FileList;
}

export default function ManageCompanyPage() {
    const {convertImageToBlob} = useImageBlob();
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    const {data: companyIndustries} = getCompanyIndustries(selectedCompany?.id);
    const mutation = useUpdateCompany();
    const [isModalShown, setIsModalShown] = useState(false);
    let imageRef = useRef<HTMLInputElement>(null);

    const updateCompanyData = async () => {
        if (!selectedCompany) {
            return;
        }

        mutation.mutate(selectedCompany);
    };

    const handleImageEdit = async () => {
        const files = imageRef.current?.files;
        if (!files) return;

        const file = files[0];

        const blob = new Uint8Array(await convertImageToBlob(file));

        setSelectedCompany((prev) => {
            if (prev) {
                return {...prev, image: blob};
            }
            return prev;
        });
    };

    useEffect(() => {
        updateCompanyData();
    }, [selectedCompany]);

    return (
        <>
            <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center">
                <div className="flex flex-col place-items-center gap-2 xl:w-[calc(100%-1rem)] 2xl:w-4/5">
                    {/*<div*/}
                    {/*    className="relative flex w-full flex-col md:flex-row place-items-center gap-10 rounded-lg rounded-tl-none rounded-tr-none border-t-0 p-6">*/}


                        {/*<ProfileEditButton*/}
                        {/*    className="absolute xl:right-4 xl:top-4 2xl:right-10 2xl:top-10"*/}
                        {/*    onClick={() => setIsModalShown(true)}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div className="flex w-full flex-row gap-2 mt-12">
                        <div className="sticky top-20 h-fit w-full md:w-[30%]">
                            <div className="relative">
                                <img
                                    className="border-signature-gray rounded-xl aspect-square border-[1px] object-cover w-48 xl:w-96"
                                    src={imageHandler(selectedCompany?.image)}
                                    alt=""
                                />
                                <ProfileEditButton
                                    className="xl:left-4 xl:top-4 2xl:left-10 2xl:top-10"
                                    onClick={() => imageRef.current?.click()}
                                />
                                <input
                                    ref={imageRef}
                                    onChange={handleImageEdit}
                                    type="file"
                                    className="hidden"
                                />
                            </div>
                            {/*<CardLayout className="flex flex-col gap-5 rounded-lg p-10">*/}
                            {/*    <h3 className="m-0 p-0 text-4xl font-semibold">Industries</h3>*/}
                            {/*    <div className="flex flex-row flex-wrap gap-3">*/}
                            {/*        {companyIndustries?.map((industry, i) => {*/}
                            {/*            return (*/}
                            {/*                <div*/}
                            {/*                    key={i}*/}
                            {/*                    className="bg-blue-primary flex flex-row gap-2 rounded-md p-2 px-3 font-semibold text-white opacity-80 transition-opacity hover:opacity-100">*/}
                            {/*                    {industry}*/}
                            {/*                </div>*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*    </div>*/}
                            {/*</CardLayout>*/}
                            {/*<CardLayout className="flex flex-col gap-5 rounded-lg p-10">*/}
                            {/*    <h3 className="m-0 p-0 text-4xl font-semibold">Social Medias</h3>*/}
                            {/*    <div className="flex flex-col flex-wrap gap-3">*/}
                            {/*        {selectedCompany?.social_medias?.map((contact, i) => {*/}
                            {/*            return (*/}
                            {/*                <SocialMediaItem*/}
                            {/*                    key={i}*/}
                            {/*                    url={contact}*/}
                            {/*                />*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*    </div>*/}
                            {/*</CardLayout>*/}
                            {/*<CardLayout className="flex flex-col gap-5 rounded-lg p-10">*/}
                            {/*    <h3 className="m-0 p-0 text-4xl font-semibold">Locations</h3>*/}
                            {/*    <div className="flex flex-col flex-wrap gap-3">*/}
                            {/*        {selectedCompany?.office_locations?.map((location, i) => {*/}
                            {/*            return (*/}
                            {/*                <div*/}
                            {/*                    key={i}*/}
                            {/*                    className="flex flex-row gap-2 rounded-md bg-white p-2 px-3 font-semibold text-black opacity-80 transition-opacity hover:opacity-100">*/}
                            {/*                    {location}*/}
                            {/*                </div>*/}
                            {/*            );*/}
                            {/*        })}*/}
                            {/*    </div>*/}
                            {/*</CardLayout>*/}
                        </div>
                        <div className="flex h-auto w-full md:w-[70%] flex-col gap-12">

                            {/* Header Section */}
                            <div className="flex flex-col gap-4 px-4">
                                <h2 className="relative m-0 p-0 text-5xl font-semibold">
                                    <span className="relative">{selectedCompany?.name}</span>
                                </h2>
                                <div className="flex flex-row gap-2 place-items-center">
                                    {companyIndustries?.map((industry, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-3xl border-green-400 hover:bg-green-300 text-green-700 bg-green-200 py-1 px-4 border">
                                                {industry}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-row gap-2 place-items-start">
                                    <a
                                        className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pe-3 font-bold text-blue-500 transition-colors *:cursor-pointer"
                                        href={selectedCompany?.linkedin}
                                        target="_blank">
                                        <FaLinkedin/>
                                        {/*<div className="text-black">*/}
                                        {selectedCompany?.linkedin}
                                        {/*</div>*/}
                                    </a>
                                    {selectedCompany?.social_medias?.map((contact, i) => {
                                        return (
                                            <SocialMediaItem
                                                key={i}
                                                url={contact}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-evenly">
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlineQueryBuilder size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Founded</p>
                                        <p className="font-semibold">{convertToDate(Number(selectedCompany?.timestamp)).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlineLocationOn size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Location</p>
                                        <div className="flex flex-row">
                                            {selectedCompany?.office_locations?.map((location, i) => {
                                                return (
                                                    <>
                                                        {i !== 0 &&
                                                            <p key={i} className="font-semibold pr-1">, </p>}
                                                        <p key={i} className="font-semibold">{location}</p>
                                                    </>
                                                );
                                            })}
                                        </div>
                                        {/*<p className="font-semibold">{selectedCompany?.office_locations?.[0]}</p>*/}
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlinePeopleAlt size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Visitors</p>
                                        {/*//TODO ADD VISITORS*/}
                                        <p className="font-semibold">{Number(selectedCompany?.seen)}</p>
                                    </div>
                                </div>
                            </div>

                            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-lg p-10">
                                <h3 className="m-0 p-0 text-4xl font-semibold">Company Profile</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: purifyDOM(selectedCompany?.profile),
                                    }}
                                />
                            </CardLayout>
                            <CompanyDetailReview companyId={selectedCompany?.id ?? ""}/>
                        </div>
                    </div>
                </div>
            </div>
            <EditCompanyModal
                openState={isModalShown}
                setOpenState={setIsModalShown}
                // onEditFinished={onJobCreated}
            />
        </>
    );
}
