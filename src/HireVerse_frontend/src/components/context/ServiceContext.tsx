import { createContext, ReactNode, useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
    canisterId as jobCanisterId,
    createActor as createActorJob,
} from "../../../../declarations/HireVerse_job";
import {
    canisterId as companyCanisterId,
    createActor as createActorCompany,
} from "../../../../declarations/HireVerse_company";
import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import { _SERVICE as _SERVICE_COMPANY } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import { _SERVICE as _SERVICE_BACKEND } from "../../../../declarations/HireVerse_backend/HireVerse_backend.did";
import { _SERVICE as _SERVICE_REVIEW } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import { _SERVICE as _SERVICE_JOB } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import {
    canisterId as backendCanisterId,
    createActor as createActorBackend,
} from "../../../../declarations/HireVerse_backend";
import {
    canisterId as reviewCanisterId,
    createActor as createActorReview,
} from "../../../../declarations/HireVerse_review";
import { useThrottleCallback } from "../../hooks/useThrottleCallback";

interface Props {
    children: ReactNode;
}

export type ServiceContextType = {
    getJobService: () => Promise<ActorSubclass<_SERVICE_JOB>>;
    getCompanyService: () => Promise<ActorSubclass<_SERVICE_COMPANY>>;
    getBackendService: () => Promise<ActorSubclass<_SERVICE_BACKEND>>;
    getReviewService: () => Promise<ActorSubclass<_SERVICE_REVIEW>>;
};

export const ServiceContext = createContext<ServiceContextType>({
    getJobService: null!,
    getCompanyService: null!,
    getBackendService: null!,
    getReviewService: null!,
});

export default function ServiceContextProvider({ children }: Props) {
    const [jobService, setJobService] = useState<ActorSubclass<_SERVICE_JOB>>();
    const [companyService, setCompanyService] =
        useState<ActorSubclass<_SERVICE_COMPANY>>();
    const [backendService, setBackendService] =
        useState<ActorSubclass<_SERVICE_BACKEND>>();
    const [reviewService, setReviewService] =
        useState<ActorSubclass<_SERVICE_REVIEW>>();
    const [agent, setAgent] = useState<HttpAgent>();
    const { getIdentity } = useAuth();

    const createHttpAgent = useThrottleCallback(() => {
        const identity = getIdentity();
        if (!agent) {
            const agent = new HttpAgent({ identity });
            setAgent(agent);
            return agent;
        }
        return agent;
    }, 1000);

    const getHttpAgent = async () => {
        if (!agent) {
            const newAgent = createHttpAgent();
            setAgent(newAgent);
            return newAgent;
        }
        return agent;
    };

    const getJobService = async () => {
        while (!jobService) {
            const agent = await getHttpAgent();
            if (agent) {
                const jobService = createActorJob(jobCanisterId, {
                    agent,
                });

                if (jobService) {
                    setJobService(jobService);
                    return jobService;
                }
            }
            await new Promise((r) => setTimeout(r, 1000));
        }
        return jobService;
    };

    const getCompanyService = async () => {
        while (!companyService) {
            const agent = await getHttpAgent();
            console.log(agent);
            if (agent) {
                const companyService = createActorCompany(companyCanisterId, {
                    agent,
                });

                if (companyService) {
                    setCompanyService(companyService);
                    return companyService;
                }
            }

            await new Promise((r) => setTimeout(r, 1000));
        }
        return companyService;
    };

    const getBackendService = async () => {
        while (!backendService) {
            const agent = await getHttpAgent();
            if (agent) {
                const backendService = createActorBackend(backendCanisterId, {
                    agent,
                });

                if (backendService) {
                    setBackendService(backendService);
                    return backendService;
                }
            }

            await new Promise((r) => setTimeout(r, 1000));
        }
        return backendService;
    };

    const getReviewService = async () => {
        while (!reviewService) {
            const agent = await getHttpAgent();
            if (agent) {
                const reviewService = createActorReview(reviewCanisterId, {
                    agent,
                });

                if (reviewService) {
                    setReviewService(reviewService);
                    return reviewService;
                }
            }

            await new Promise((r) => setTimeout(r, 100));
        }
        0;
        return reviewService;
    };

    return (
        <ServiceContext.Provider
            value={{
                getJobService: getJobService!,
                getCompanyService: getCompanyService!,
                getBackendService: getBackendService!,
                getReviewService: getReviewService!,
            }}>
            {children}
        </ServiceContext.Provider>
    );
}
