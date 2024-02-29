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
import Vector "mo:vector/Class";
import Random "mo:base/Random";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Order "mo:base/Order";

actor Company {

    type Company = {
        id : Text;
        name : Text;
        founded_year : Nat;
        country : Text;
        location : Text;
        image : Blob;
        linkedin : Text;
        company_manager_ids : [Text];
        job_posting_ids : [Text];
        timestamp : Time.Time;
        seen : Nat;
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

    public shared func generateCompany() : async Text {
        let company = {
            id = await Helper.generateUUID();
            name = "Google";
            founded_year = 1998;
            country = "USA";
            location = "Mountain View, California, United States";
            image = await Random.blob();
            linkedin = "https://www.linkedin.com/company/google";
            company_manager_ids = [];
            job_posting_ids = [];
            timestamp = Time.now();
            seen = 0;
        };

        companies.put(company.id, company);

        return company.id;
    };
    public shared (msg) func registerCompanies(newCompany : CreateCompanyInput) : async Company {

        let id = await Helper.generateUUID();

        let company = {
            id = id;
            name = newCompany.name;
            founded_year = newCompany.founded_year;
            country = newCompany.country;
            location = newCompany.location;
            image = newCompany.image;
            linkedin = newCompany.linkedin;
            company_manager_ids = [Principal.toText(msg.caller)];
            job_posting_ids = [];
            timestamp = Time.now();
            seen = 0;
        };

        companies.put(company.id, company);

        return company;
    };

    public shared (msg) func updateCompany(id : Text, company : Company) : async Result.Result<(), Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        let beforeCompany = companies.get(id);

        switch (beforeCompany) {
            case null {
                return #err("Company not found");
            };
            case (?c) {

                let isManager : Bool = await checkCompanyManager(c, msg.caller);

                if (not isManager) {
                    return #err("User is not a manager of the company");
                };

                companies.put(id, company);

                return #ok();
            };
        };
    };

    public shared (msg) func deleteCompany(id : Text) : async Result.Result<?Company, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        let company = companies.get(id);

        switch (company) {
            case null {
                return #err("Company not found");
            };
            case (?c) {

                let isManager : Bool = await checkCompanyManager(c, msg.caller);

                if (not isManager) {
                    return #err("User is not a manager of the company");
                };

                return #ok(companies.remove(id));
            };
        };
    };

    public shared query func getCompanies() : async [Company] {
        let companies_array = Iter.toArray(companies.vals());

        let comparator = func(a : Company, b : Company) : Order.Order {
            Nat.compare(a.seen, b.seen);
        };

        let sorted_companies = Array.sort(companies_array, comparator);

        return sorted_companies;
    };

    public shared query (msg) func getManagedCompanies() : async Result.Result<[Company], Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let companyList : [Company] = Iter.toArray(companies.vals());
        var managedCompanies = Vector.Vector<Company>();

        for (company in companyList.vals()) {
            if (Array.find<Text>(company.company_manager_ids, func(p : Text) : Bool { p == Principal.toText(user_id) }) != null) {
                managedCompanies.add(company);
            };
        };

        return #ok(Vector.toArray(managedCompanies));
    };

    public shared query func getCompanyCountries() : async [Text] {
        let companyList : [Company] = Iter.toArray(companies.vals());
        let countries = Vector.Vector<Text>();

        for (company in companies.vals()) {
            if (not Vector.contains(countries, company.country, Text.equal)) {
                countries.add(company.country);
            };
        };

        return Vector.toArray(countries);
    };

    public shared query func getCompany(id : Text) : async Result.Result<Company, Text> {
        let company = companies.get(id);

        switch (company) {
            case null {
                return #err("Company not found");
            };
            case (?c) {

                let updatedCompany = {
                    id = c.id;
                    name = c.name;
                    founded_year = c.founded_year;
                    country = c.country;
                    location = c.location;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = c.company_manager_ids;
                    job_posting_ids = c.job_posting_ids;
                    timestamp = c.timestamp;
                    seen = c.seen + 1;
                };

                companies.put(id, updatedCompany);

                return #ok(updatedCompany);
            };
        };
    };

    public shared func checkCompanyManager(company : Company, user_id : Principal) : async Bool {
        let company_manager_ids : [Text] = company.company_manager_ids;

        Array.find<Text>(
            company_manager_ids,
            func(p : Text) : Bool {
                p == Principal.toText(user_id);
            },
        ) != null;
    };

    public shared (msg) func inviteManager(company_id : Text, user_id : Principal, inviter_id : Principal) : async Result.Result<Invite, Text> {

        if (Principal.isAnonymous(inviter_id)) {
            return #err("Inviter not authorized");
        };

        if (Principal.isAnonymous(user_id)) {
            return #err("Client not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {

                let isManager : Bool = await checkCompanyManager(company, user_id);
                if (not isManager) {
                    return #err("User is not a manager of the company");
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

                return #ok(invite);
            };
        };
    };

    public shared (msg) func addJob(company_id : Text, job_id : Text) : async Result.Result<(), Text> {

        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {
                let jobIds = Vector.fromArray<Text>(company.job_posting_ids);

                jobIds.add(job_id);

                let updatedCompany : Company = {
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
                    seen = company.seen;
                };
                companies.put(company_id, updatedCompany);
                #ok();
            };
        };
    };

    public shared (msg) func removeInvite(id : Text) : async Result.Result<?Invite, Text> {

        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let invite = invitations.get(id);

        switch (invite) {
            case null {
                return #err("Invite not found");
            };
            case (?i) {
                if (i.inviter_id != user_id) {
                    return #err("Not authorized");
                };
                return #ok(invitations.remove(id));
            };
        };
    };

    public shared (msg) func addManager(company_id : Text) : async Result.Result<(), Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {

                let isManager : Bool = await checkCompanyManager(company, user_id);

                if (isManager) {
                    return #err("User is already the manager!");
                };

                let manager_ids = company.company_manager_ids;
                let updatedManagerIds = Array.append<Text>(manager_ids, [Principal.toText(user_id)]);

                let updatedCompany = {
                    id = company_id;
                    name = company.name;
                    founded_year = company.founded_year;
                    country = company.country;
                    location = company.location;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = updatedManagerIds;
                    job_posting_ids = company.job_posting_ids;
                    timestamp = company.timestamp;
                    seen = company.seen;
                };
                companies.put(company_id, updatedCompany);
                return #ok();
            };
        };
    };
    public shared composite query func getManagersFromCompany(company_id : Text) : async Result.Result<[User.User], Text> {
        let companies = await getCompany(company_id);

        switch (companies) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {
                let manager_ids = company.company_manager_ids;
                var managers = Vector.Vector<User.User>();

                label l for (manager_id in manager_ids.vals()) {
                    let manager : ?User.User = await User.getUser(Principal.fromText(manager_id));
                    switch (manager) {
                        case null {
                            continue l;
                        };
                        case (?m) {
                            managers.add(m);
                        };
                    };
                };

                #ok(Vector.toArray<User.User>(managers));
            };
        };
    };

    public shared (msg) func searchCompany(name : Text) : async Result.Result<[Company], Text> {
        let companyList : [Company] = Iter.toArray(companies.vals());
        var searchResult = Vector.Vector<Company>();

        for (company in companyList.vals()) {
            if (Text.contains(company.name, #text name)) {
                searchResult.add(company);
            };
        };

        return #ok(Vector.toArray(searchResult));
    };

    public shared (msg) func leaveCompany(company_id : Text, user_id : Principal) : async Result.Result<(), Text> {

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(c)) {
                let manager_ids = c.company_manager_ids;
                let updatedManagerIds = Array.filter<Text>(
                    manager_ids,
                    func(p : Text) : Bool {
                        p != Principal.toText(user_id);
                    },
                );

                if (updatedManagerIds.size() == manager_ids.size()) {
                    return #err("User is not a manager of the company");
                };

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
                    seen = c.seen;
                };
                companies.put(company_id, updatedCompany);
                return #ok();
            };
        };
    };

    public shared composite query func getCompanyNames(company_ids : [Text]) : async Result.Result<[Text], Text> {
        let companyNames = Vector.Vector<Text>();

        for (company_id in company_ids.vals()) {
            let company = await getCompany(company_id);
            switch (company) {
                case (#err(msg)) {
                    return #err("Company with id " # company_id # " not found");
                };
                case (#ok(c)) {
                    companyNames.add(c.name);
                };
            };
        };

        return #ok(Vector.toArray(companyNames));
    };

    public shared func getUserCompanies(user_id : Principal) : async Result.Result<[Company], Text> {
        let user : ?User.User = await User.getUser(user_id);
        var companies = Vector.Vector<Company>();

        switch (user) {
            case (?user) {
                let company_ids : [Text] = user.company_ids;
                for (company_id in company_ids.vals()) {
                    let fetched_company = await Company.getCompany(company_id);
                    switch (fetched_company) {
                        case (#err(msg)) {};
                        case (#ok(c)) {
                            companies.add(c);
                        };
                    };
                };
            };
            case null {
                return #err("User not found");
            };
        };
        return #ok(Vector.toArray(companies));
    };

    public shared func deleteAllCompany() : async () {
        for (company in companies.vals()) {
            ignore companies.remove(company.id);
        };
    };
};
