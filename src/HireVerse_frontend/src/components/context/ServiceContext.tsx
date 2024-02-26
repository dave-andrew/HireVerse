import { createContext, ReactNode, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { createActor as createActorJob } from "../../../../declarations/HireVerse_job";
import { createActor as createActorCompany } from "../../../../declarations/HireVerse_company";
import { createActor as createActorBackend } from "../../../../declarations/HireVerse_backend";
import { createActor as createActorReview } from "../../../../declarations/HireVerse_review";
import { ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { _SERVICE as _SERVICE_JOB } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import { _SERVICE as _SERVICE_COMPANY } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { _SERVICE as _SERVICE_BACKEND } from "../../../../declarations/HireVerse_backend/HireVerse_backend.did";
import { _SERVICE as _SERVICE_REVIEW } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import { canisterId as jobCanisterId } from "../../declarations/HireVerse_job";
import { canisterId as companyCanisterId } from "../../declarations/HireVerse_company";
import { canisterId as backendCanisterId } from "../../declarations/HireVerse_backend";
import { canisterId as reviewCanisterId } from "../../declarations/HireVerse_review";

interface Props {
    children: ReactNode;
}

type ServiceContextType = {
    jobService: ActorSubclass<_SERVICE_JOB>;
    companyService: ActorSubclass<_SERVICE_COMPANY>;
    backendService: ActorSubclass<_SERVICE_BACKEND>;
    reviewService: ActorSubclass<_SERVICE_REVIEW>;
    loading: boolean;
};

export const ServiceContext = createContext<ServiceContextType>({
    jobService: null!,
    companyService: null!,
    backendService: null!,
    reviewService: null!,
    loading: true,
});

export default function ServiceContextProvider({ children }: Props) {
    const { getIdentity } = useAuth();
    const [identity, setIdentity] = useState<Identity>();
    const [jobService, setJobService] = useState<ActorSubclass<_SERVICE_JOB>>();
    const [companyService, setCompanyService] =
        useState<ActorSubclass<_SERVICE_COMPANY>>();
    const [backendService, setBackendService] =
        useState<ActorSubclass<_SERVICE_BACKEND>>();
    const [reviewService, setReviewService] =
        useState<ActorSubclass<_SERVICE_REVIEW>>();
    const [loading, setLoading] = useState(true);

    const handleIdentity = async () => {
        const identity = await getIdentity();
        setIdentity(identity);
    };

    useEffect(() => {
        if (!identity) return;

        const agent = new HttpAgent({ identity });

        const jobService = createActorJob(
            // process.env.CANISTER_ID_HireVerse_job,
            jobCanisterId,
            { agent },
        );
        const companyService = createActorCompany(
            // process.env.CANISTER_ID_HireVerse_company,
            companyCanisterId,
            { agent },
        );
        const backendService = createActorBackend(
            // process.env.CANISTER_ID_HireVerse_backend,
            backendCanisterId,
            { agent },
        );
        const reviewService = createActorReview(
            // process.env.CANISTER_ID_HireVerse_review,
            reviewCanisterId,
            { agent },
        );

        setJobService(jobService);
        setCompanyService(companyService);
        setBackendService(backendService);
        setReviewService(reviewService);
    }, [identity]);

    useEffect(() => {
        handleIdentity();
    }, []);

    useEffect(() => {
        if (jobService && companyService && backendService && reviewService) {
            setLoading(false);
        }
    }, [jobService, companyService, backendService, reviewService]);

    return (
        <ServiceContext.Provider
            value={{
                jobService: jobService!,
                companyService: companyService!,
                backendService: backendService!,
                reviewService: reviewService!,
                loading,
            }}>
            {jobService &&
                companyService &&
                backendService &&
                reviewService &&
                children}
        </ServiceContext.Provider>
    );
}
