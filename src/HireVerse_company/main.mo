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
import Buffer "mo:base/Buffer";
import Helper "canister:HireVerse_helper";
import User "canister:HireVerse_backend";
import Vector "mo:vector/Class"

actor Company {

    type Company = {
        id : Text;
        name : Text;
        founded_year : Nat;
        country : Text;
        location : Text;
        image : Blob;
        linkedin : Text;
        company_manager_ids : [Principal];
        job_posting_ids : [Text];
        timestamp : Time.Time;
    };

    type CreateCompanyInput = {
        name : Text;
        founded_year : Nat;
        country : Text;
        location : Text;
        image : Blob;
        linkedin : Text;
    };

    type Invite = {
        id : Text;
        company_id : Text;
        user_id : Principal;
        inviter_id : Principal;
        timestamp : Time.Time;
    };

    let companies = TrieMap.TrieMap<Text, Company>(Text.equal, Text.hash);
    let invitations = TrieMap.TrieMap<Text, Invite>(Text.equal, Text.hash);

    public shared func registerCompanies(newCompany : CreateCompanyInput) : async Company {

        let id = await Helper.generateUUID();

        let company = {
            id = id;
            name = newCompany.name;
            founded_year = newCompany.founded_year;
            country = newCompany.country;
            location = newCompany.location;
            image = newCompany.image;
            linkedin = newCompany.linkedin;
            company_manager_ids = [];
            job_posting_ids = [];
            timestamp = Time.now();
        };

        companies.put(company.id, company);

        return company;
    };

    public shared func updateCompany(id : Text, company : Company) : async () {
        companies.put(id, company);
    };

    public shared func deleteCompany(id : Text) : async ?Company {
        companies.remove(id);
    };

    public shared query func getCompanies() : async [Company] {
        return Iter.toArray(companies.vals());
    };

    public shared query func getCompany(id : Text) : async ?Company {
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

    public shared func inviteManager(company_id : Text, user_id : Principal, inviter_id : Principal) : async ?Invite {
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

                let id = await Helper.generateUUID();
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

    public shared func addJob(company_id : Text, job_id : Text) : async () {
        let company = await getCompany(company_id);

        switch (company) {
            case null {
                return;
            };
            case (?company) {
                let jobIds = Vector.fromArray<Text>(company.job_posting_ids);

                jobIds.add(job_id);

                let updatedCompany: Company = {
                    id = company_id;
                    name = company.name;
                    founded_year = company.founded_year;
                    country = company.country;
                    location = company.location;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = company.company_manager_ids;
                    job_posting_ids = Vector.toArray<Text>(jobIds);
                    timestamp = company.timestamp;
                };

                return companies.put(company_id, updatedCompany);
            };
        };
    };

    public shared func removeInvite(id : Text) : async ?Invite {
        return invitations.remove(id);
    };

    public shared composite query func getManagersFromCompany(company_id : Text) : async ?[User.User] {
        let companies : ?Company = await getCompany(company_id);

        switch (companies) {
            case null {
                return null;
            };
            case (?company) {
                let manager_ids = company.company_manager_ids;
                var managers = Buffer.Buffer<User.User>(0);

                for (manager_id in manager_ids.vals()) {
                    let manager : ?User.User = await User.getUser(manager_id);
                    switch (manager) {
                        case null {
                            return null;
                        };
                        case (?m) {
                            managers.add(m);
                        };
                    };
                };

                return ?Buffer.toArray(managers);
            };
        };
    };

    public shared func leaveCompany(company_id : Text, user_id : Principal) : async () {

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

    // public shared composite query func getJobPostedByCompany(company_id : Principal) : async ?[Job.Job] {
    //     let company : ?Company = await getCompany(company_id);

    //     switch (company) {
    //         case null {
    //             return null;
    //         };
    //         case (?c) {
    //             let job_ids = c.job_posting_ids;
    //             var jobPostings : [Job.Job] = [];
    //             for (job_id in job_ids.vals()) {
    //                 let jobPosting : ?Job.Job = await Job.getJob(job_id);
    //                 switch (jobPosting) {
    //                     case null {
    //                         return null;
    //                     };
    //                     case (?jp) {
    //                         jobPostings := Array.append<Job.Job>(jobPostings, [jp]);
    //                     };
    //                 };
    //             };

    //             return ?jobPostings;
    //         };
    //     };
    // };

    public shared composite query func getCompanyNames(comapny_ids : [Text]) : async [Text] {
        let companyNames = Vector.Vector<Text>();
        for (company_id in comapny_ids.vals()) {
            let company : ?Company = await getCompany(company_id);
            switch (company) {
                case null {
                    return [];
                };
                case (?c) {
                    companyNames.add(c.name);
                };

            };
        };

        return Vector.toArray(companyNames);
    };
};
