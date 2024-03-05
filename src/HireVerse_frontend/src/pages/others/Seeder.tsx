import seeder, { seedJob } from "../../utils/seeder";
import useService from "../../hooks/useService";
import { useForm } from "react-hook-form";
import { isOk } from "../../utils/resultGuarder";

interface ISeederForm {
    companyId: string;
    companyJobSeedId: string;
}

export default function Seeder() {
    const { register, handleSubmit, getValues } = useForm<ISeederForm>();
    const service = useService();
    const handleSeedCompanyJobs: any = async () => {
        seeder(service);
    };

    const addReview = async () => {
        // const response = await service.getReviewService().then((s) =>
        // s.addReview({
        //     companyId: "1",
        //     cons: ["Cons"],
        //     title: "Title",
        //     pros: ["Pros"],
        //     cultureRating: BigInt(5),
        //     isAnonymous: false,
        //     generalComments: "General Comments",
        //     recommendToFriend: true,
        //     workLifeBalanceRating: BigInt(5),
        //     seniorManagementRating: BigInt(5),
        // }),
        // );
        // if (isOk(response)) {
        //     console.log("Review added");
        // }
    };

    const getReviewByCompany = async () => {
        const response = await service
            .getReviewService()
            .then((s) => s.getSelfReview("1"));
        if (isOk(response)) {
            console.log(response);
        }
    };

    const handleAddSelfToCompanyManager = async (data: ISeederForm) => {
        const id = data.companyId;
        if (!id) {
            console.log("Company ID is required");
            return;
        }

        const response = await service
            .getCompanyService()
            .then((s) => s.addManager(id));

        if (isOk(response)) {
            console.log(`Added self to company ${id} manager`);
        }
    };

    const handleGetAllCompany = async () => {
        console.log("Getting all company...");
        const response = await service
            .getCompanyService()
            .then((s) => s.getCompanies());
        console.log(response);
    };
    return (
        <div className="flex w-96 flex-col gap-5">
            <h1>Seeder</h1>
            <button
                className="main-button"
                onClick={handleSeedCompanyJobs}>
                Seed Company & Jobs
            </button>
            <div>
                <h1>Get All Company</h1>
                <button
                    className="main-button"
                    onClick={handleGetAllCompany}>
                    Get All Company
                </button>
            </div>
            <div>
                <label>
                    Company ID:
                    <input
                        {...register("companyId")}
                        className="border-2 border-black"
                        type="text"
                    />
                </label>
                <button
                    className="main-button"
                    onClick={handleSubmit(handleAddSelfToCompanyManager)}>
                    Add Self To Company Manager
                </button>
            </div>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getCompanyService()
                        .then((s) => s.deleteAllCompany())
                        .then(() => console.log("All companies deleted"))
                }>
                Remove all companies
            </button>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getJobService()
                        .then((s) => s.deleteAllJobs())
                        .then(() => console.log("All jobs deleted"))
                }>
                Remove all jobs
            </button>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getReviewService()
                        .then((s) => s.removeAllReviews())
                        .then(() => console.log("All reviews deleted"))
                }>
                Remove all reviews
            </button>
            <input
                className="border-2 border-black"
                {...register("companyJobSeedId")}
                type="text"
            />
            <button
                onClick={() => seedJob(service, getValues().companyJobSeedId)}>
                Seed jOBS
            </button>
            <button onClick={() => addReview()}>GENERATE REVIEWS</button>
            <button onClick={() => getReviewByCompany()}>GET REVIEW</button>
        </div>
    );
}
