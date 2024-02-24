import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Time "mo:base/Time";
import Helper "canister:HireVerse_helper";
import User "canister:HireVerse_backend";
import Job "canister:HireVerse_job";

actor Company {

    type Company = {
        id : Principal;
        name : Text;
        founded_year : Nat;
        country : Text;
        location : Text;
        image : Blob;
        linkedin : Text;
        company_manager_ids : [Principal];
        job_posting_ids : [Principal];
        timestamp : Time.Time;
    };

    type Invite = {
        id : Principal;
        company_id : Principal;
        user_id : Principal;
        inviter_id : Principal;
        timestamp : Time.Time;
    };

    let companies = TrieMap.TrieMap<Principal, Company>(Principal.equal, Principal.hash);
    let invitations = TrieMap.TrieMap<Principal, Invite>(Principal.equal, Principal.hash);

    public shared func registerCompanies(name : Text, founded_year : Nat, country : Text, location : Text, image : Blob, linkedin : Text) : async Company {

        let id = await Helper.generatePrinciple();

        let company = {
            id = id;
            name = name;
            founded_year = founded_year;
            country = country;
            location = location;
            image = image;
            linkedin = linkedin;
            company_manager_ids = [];
            job_posting_ids = [];
            timestamp = Time.now();
        };
        companies.put(company.id, company);
        return company;
    };

    public query func updateCompany(principal : Principal, company : Company) : async () {
        companies.put(principal, company);
    };

    public shared func deleteCompany(id : Principal) : async ?Company {
        companies.remove(id);
    };

    public query func getCompanies() : async [Company] {
        return Iter.toArray(companies.vals());
    };

    public query func getCompany(id : Principal) : async ?Company {
        return companies.get(id);
    };

    public shared func checkCompanyManager(company : Company, user_id : Principal) : async Bool {
        let company_manager_ids : [Principal] = company.company_manager_ids;

        Array.find<Principal>(
            company_manager_ids,
            func(p : Principal) : Bool {
                p == user_id;
            },
        ) != null;
    };

    public shared func inviteManager(company_id : Principal, user_id : Principal, inviter_id : Principal) : async ?Invite {
        let company = await getCompany(company_id);

        switch (company) {
            case null {
                return null;
            };
            case (?company) {

                let isManager : Bool = await checkCompanyManager(company, user_id);
                if (not isManager) {
                    return null;
                };

                let id = await Helper.generatePrinciple();
                let invite = {
                    id = id;
                    company_id = company_id;
                    user_id = user_id;
                    inviter_id = inviter_id;
                    timestamp = Time.now();
                };

                invitations.put(id, invite);

                return ?invite;
            };
        };

        return null;
    };

    public shared func addJob(company_id : Principal, job_id : Principal) : async () {
        let company = await getCompany(company_id);

        switch (company) {
            case null {
                return;
            };
            case (?company) {
                let buffer : [Principal] = company.job_posting_ids;

                let updatedJob = Array.append<Principal>(company.job_posting_ids, [job_id]);

                let updatedCompany = {
                    id = company_id;
                    name = company.name;
                    founded_year = company.founded_year;
                    country = company.country;
                    location = company.location;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = company.company_manager_ids;
                    job_posting_ids = updatedJob;
                    timestamp = company.timestamp;
                };

                return companies.put(company_id, updatedCompany);
            };
        };
    };

    public shared func removeInvite(id : Principal) : async ?Invite {
        return invitations.remove(id);
    };

    public shared func getManagersFromCompany(company_id : Principal) : async ?[User.User] {
        let companies : ?Company = await getCompany(company_id);

        switch (companies) {
            case null {
                return null;
            };
            case (?company) {
                let manager_ids = company.company_manager_ids;
                var managers : [User.User] = [];
                for (manager_id in manager_ids.vals()) {
                    let manager : ?User.User = await User.getUser(manager_id);
                    switch (manager) {
                        case null {
                            return null;
                        };
                        case (?m) {
                            managers := Array.append<User.User>(managers, [m]);
                        };
                    };
                };

                return ?managers;
            };
        };
    };

    public shared func leaveCompany(company_id : Principal, user_id : Principal) : async () {

        let company : ?Company = await getCompany(company_id);

        switch (company) {
            case null {
                return;
            };
            case (?c) {
                let manager_ids = c.company_manager_ids;
                let updatedManagerIds = Array.filter<Principal>(
                    manager_ids,
                    func(p : Principal) : Bool {
                        p != user_id;
                    },
                );

                let updatedCompany = {
                    id = company_id;
                    name = c.name;
                    founded_year = c.founded_year;
                    country = c.country;
                    location = c.location;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = updatedManagerIds;
                    job_posting_ids = c.job_posting_ids;
                    timestamp = c.timestamp;
                };

                return companies.put(company_id, updatedCompany);
            };
        };
    };

    public shared func getJobPostedByCompany(company_id : Principal) : async ?[Job.Job] {
        let company : ?Company = await getCompany(company_id);

        switch (company) {
            case null {
                return null;
            };
            case (?c) {
                let job_ids = c.job_posting_ids;
                var jobPostings : [Job.Job] = [];
                for (job_id in job_ids.vals()) {
                    let jobPosting : ?Job.Job = await Job.getJob(job_id);
                    switch (jobPosting) {
                        case null {
                            return null;
                        };
                        case (?jp) {
                            jobPostings := Array.append<Job.Job>(jobPostings, [jp]);
                        };
                    };
                };

                return ?jobPostings;
            };
        };
    };
};
