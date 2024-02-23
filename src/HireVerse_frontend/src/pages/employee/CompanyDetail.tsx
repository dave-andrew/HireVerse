import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import {
    MdOutlineLocationOn,
    MdOutlinePeopleAlt,
    MdOutlineQueryBuilder,
} from "react-icons/md";
import CompanyReviewSummary from "../../components/company/CompanyReviewSummary";

export default function CompanyDetail() {
    return (
        <FrontPageLayout className="h-full">
            <div className="flex flex-row h-full w-full justify-center items-center">
                <div className="flex flex-col w-4/5 place-items-center">
                    <CardLayout className="flex flex-row rounded-none place-items-center p-6 w-full border-t-0 rounded-tl-none rounded-tr-none">
                        <img
                            className="w-96"
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                            alt=""
                        />
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <h2 className="font-bold text-5xl">
                                    BINUS University
                                </h2>
                                <p>https://www.binus.ac.id/</p>
                            </div>
                            <div className="flex flex-row gap-28">
                                <div className="flex flex-row gap-3">
                                    <div className="flex place-items-center border-[1px] border-signature-gray aspect-square p-2 rounded-3xl">
                                        <MdOutlineQueryBuilder size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Founded</p>
                                        <p className="font-bold">
                                            19 June 1999
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex place-items-center border-[1px] border-signature-gray aspect-square p-2 rounded-3xl">
                                        <MdOutlineLocationOn size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Location
                                        </p>
                                        <p className="font-bold">Jakarta</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex place-items-center border-[1px] border-signature-gray aspect-square p-2 rounded-3xl">
                                        <MdOutlinePeopleAlt size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Visitors
                                        </p>
                                        <p className="font-bold">
                                            20k Visitors
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardLayout>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-[70%] h-auto">
                            <CardLayout className="flex flex-col rounded-none p-10 gap-5 min-h-[25rem]">
                                <h3 className="font-bold text-4xl">
                                    Company Profile
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nunc laoreet blandit
                                    tristique. Nunc ultrices, mi sed tristique
                                    ullamcorper, felis mauris fermentum sem, vel
                                    pharetra dui eros ut lacus. Morbi pulvinar,
                                    nulla ut pharetra porttitor, magna arcu
                                    dignissim neque, id scelerisque eros sapien
                                    id magna. Pellentesque scelerisque a nisi
                                    eget varius. Nullam eu lacus placerat quam
                                    tempor congue pretium vel massa. Nulla
                                    luctus tristique augue non ullamcorper.
                                    Suspendisse a iaculis lacus, at finibus
                                    nisl. Donec accumsan vehicula viverra. Cras
                                    rhoncus lectus id ex malesuada hendrerit.
                                    Curabitur non dui massa. Sed aliquet quam
                                    velit, quis feugiat tellus accumsan sed.
                                    Phasellus arcu velit, molestie quis augue
                                    sit amet, fringilla feugiat felis. Morbi
                                    lacinia felis eu lorem egestas, eu vehicula
                                    nisi posuere.
                                </p>
                            </CardLayout>
                            <CardLayout className="flex flex-col p-10 gap-5 min-h-[25rem] rounded-none">
                                <h3 className="font-bold text-4xl">Reviews</h3>
                                <div>
                                    <CompanyReviewSummary />
                                </div>
                            </CardLayout>
                        </div>
                        <div className="flex flex-col w-[30%]">
                            <CardLayout className="flex flex-col rounded-none p-10 gap-5">
                                <h3 className="font-bold text-4xl">
                                    Industries
                                </h3>
                                <div className="flex flex-row flex-wrap gap-3">
                                    {[
                                        "Engineering",
                                        "Technology",
                                        "Education",
                                        "Healthcare",
                                        "Finance",
                                    ].map((industry) => {
                                        return (
                                            <div className="flex flex-row gap-2 p-2 bg-signature-gray rounded-md">
                                                {industry}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardLayout>
                            <CardLayout className="flex flex-col rounded-none p-10 gap-5">
                                <h3 className="font-bold text-4xl">
                                    Industries
                                </h3>
                                <div className="flex flex-row flex-wrap gap-3">
                                    {[
                                        "Engineering",
                                        "Technology",
                                        "Education",
                                        "Healthcare",
                                        "Finance",
                                    ].map((industry) => {
                                        return (
                                            <div className="flex flex-row gap-2 p-2 bg-signature-gray rounded-md">
                                                {industry}
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
    );
}
