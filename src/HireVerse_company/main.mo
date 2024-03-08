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
import Int "mo:base/Int";
import TextX "mo:xtended-text/TextX";
import Fuzz "mo:fuzz";

actor Company {

    // Represents a company in the system
    type Company = {
        id : Text;
        name : Text;
        founded_year : Nat;
        profile : Text;
        founded_country : Text;
        office_locations : [Text];
        social_medias : [Text];
        image : Blob;
        linkedin : Text;
        company_manager_ids : [Text];
        reviews_ids : [Text];
        job_posting_ids : [Text];
        timestamp : Time.Time;
        seen : Nat;
    };

    // Input for creating a company
    type CreateCompanyInput = {
        name : Text;
        founded_year : Nat;
        profile : Text;
        founded_country : Text;
        office_locations : [Text];
        social_medias : [Text];
        linkedin : Text;
    };

    // Represents an invitation to a company
    type Invite = {
        id : Text;
        company_id : Text;
        user_id : Principal;
        inviter_id : Principal;
        timestamp : Time.Time;
    };


    // Stores all companies and invitations in the system
    let companies = TrieMap.TrieMap<Text, Company>(Text.equal, Text.hash);
    let invitations = TrieMap.TrieMap<Text, Invite>(Text.equal, Text.hash);

    // Generates a company with user Input
    public shared (msg) func registerCompany(newCompany : CreateCompanyInput) : async Result.Result<Company, Text> {

        let id = await Helper.generateUUID();

        let company = {
            id = id;
            name = newCompany.name;
            founded_year = newCompany.founded_year;
            profile = newCompany.profile;
            founded_country = newCompany.founded_country;
            office_locations = newCompany.office_locations;
            social_medias = newCompany.social_medias;
            image = Blob.fromArray([0]);
            linkedin = newCompany.linkedin;
            company_manager_ids = [Principal.toText(msg.caller)];
            job_posting_ids = [];
            reviews_ids = [];
            timestamp = Time.now();
            seen = 0;
        };

        companies.put(company.id, company);

        return #ok(company);
    };

    // Updates a company with user Input
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
                let company_manager_ids : [Text] = c.company_manager_ids;
                let manager = Array.find<Text>(
                    company_manager_ids,
                    func(p : Text) : Bool {
                        p == Principal.toText(msg.caller);
                    },
                );

                if (manager == null) {
                    return #err("User is not a manager of the company");
                };

                companies.put(id, company);

                return #ok();
            };
        };
    };

    // Returns all companies in the database
    public shared query func getCompanies() : async Result.Result<[Company], Text> {
        let companies_array : [Company] = Iter.toArray(companies.vals());

        let comparator = func(a : Company, b : Company) : Order.Order {
            Int.compare(b.seen, a.seen);
        };

        let sorted_companies = Array.sort(companies_array, comparator);

        return #ok(sorted_companies);
    };

    // Returns all companies in the database which the user is a manager of
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

    // Returns all countries where companies are located
    public shared query func getCompanyCountries() : async [Text] {
        let companyList : [Company] = Iter.toArray(companies.vals());
        let countries = Vector.Vector<Text>();

        for (company in companies.vals()) {
            if (not Vector.contains(countries, company.founded_country, Text.equal)) {
                countries.add(company.founded_country);
            };
        };

        return Vector.toArray(countries);
    };

    // Get company by its ID
    public query func getCompany(id : Text) : async Result.Result<Company, Text> {
        let company = companies.get(id);

        switch (company) {
            case null {
                return #err("Company not found");
            };
            case (?c) {
                return #ok(c);
            };
        };
    };

    public shared (msg) func viewCompany(companyId : Text) : async Result.Result<(), Text> {
        let userId = msg.caller;

        if (Principal.isAnonymous(userId)) {
            return #err("Not authorized");
        };

        let company = await getCompany(companyId);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(c)) {
                let updatedCompany = {
                    id = c.id;
                    name = c.name;
                    founded_year = c.founded_year;
                    profile = c.profile;
                    founded_country = c.founded_country;
                    office_locations = c.office_locations;
                    social_medias = c.social_medias;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = c.company_manager_ids;
                    job_posting_ids = c.job_posting_ids;
                    reviews_ids = c.reviews_ids;
                    timestamp = c.timestamp;
                    seen = c.seen + 1;
                };

                companies.put(c.id, updatedCompany);

                return #ok();
            };
        };
    };

    // Check if a user is a manager of a company
    public shared func checkCompanyManager(company : Company, user_id : Principal) : async Bool {
        let company_manager_ids : [Text] = company.company_manager_ids;

        return Array.find<Text>(
            company_manager_ids,
            func(p : Text) : Bool {
                p == Principal.toText(user_id);
            },
        ) != null;
    };

    // Create an invitation to a company
    public shared (msg) func createInvitation(user_id : Principal, company_id : Text) : async Result.Result<Invite, Text> {
        let inviter_id = msg.caller;

        if (Principal.isAnonymous(inviter_id)) {
            return #err("Not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(c)) {
                let company_manager_ids : [Text] = c.company_manager_ids;
                let manager = Array.find<Text>(
                    company_manager_ids,
                    func(p : Text) : Bool {
                        p == Principal.toText(msg.caller);
                    },
                );

                if (manager == null) {
                    return #err("User is not a manager of the company");
                };
            
                if (Array.find<Text>(c.company_manager_ids, func(p : Text) : Bool { p == Principal.toText(user_id) }) != null) {
                    return #err("User is already a manager of the company");
                };

                let invite = {
                    id = await Helper.generateUUID();
                    company_id = company_id;
                    user_id = user_id;
                    inviter_id = inviter_id;
                    timestamp = Time.now();
                };

                invitations.put(invite.id, invite);

                return #ok(invite);
            };
        };
    };

    // Invite a user to a company as a manager
    public shared (msg) func inviteManager(user_email : Text, company_id : Text) : async Result.Result<Invite, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You are not authorized");
        };

        let user_id = await User.getUserByEmail(user_email);

        switch (user_id) {
            case (#err(msg)) {
                return #err("User not found");
            };
            case (#ok(u)) {
                let inviter_id = msg.caller;
                let invite = await createInvitation(u, company_id);
                switch (invite) {
                    case (#err(msg)) {
                        return #err(msg);
                    };
                    case (#ok(i)) {
                        return #ok(i);
                    };
                };
            };
        };
    };

    // Add a job to a company
    public shared (msg) func addJob(company_id : Text, job_id : Text) : async Result.Result<(), Text> {


        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = companies.get(company_id);

        switch (company) {
            case (null) {
                return #err("Company not found");
            };
            case (?company) {
                let jobIds = Array.append<Text>(company.job_posting_ids, [job_id]);

                let updatedCompany : Company = {
                    id = company_id;
                    name = company.name;
                    founded_year = company.founded_year;
                    profile = company.profile;
                    founded_country = company.founded_country;
                    office_locations = company.office_locations;
                    social_medias = company.social_medias;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = company.company_manager_ids;
                    job_posting_ids = jobIds;
                    reviews_ids = company.reviews_ids;
                    timestamp = company.timestamp;
                    seen = company.seen;
                };

                companies.put(company_id, updatedCompany);
                #ok();
            };
        };
    };

    // Remove an invitation from a company
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
                if (i.inviter_id != user_id or i.user_id != user_id) {
                    return #err("Not authorized");
                };
                return #ok(invitations.remove(id));
            };
        };
    };

    // Add a manager to a company
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
                //TODO

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
                    profile = company.profile;
                    founded_country = company.founded_country;
                    office_locations = company.office_locations;
                    social_medias = company.social_medias;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = updatedManagerIds;
                    job_posting_ids = company.job_posting_ids;
                    reviews_ids = company.reviews_ids;
                    timestamp = company.timestamp;
                    seen = company.seen;
                };
                companies.put(company_id, updatedCompany);
                return #ok();
            };
        };
    };

    // Add a manager to a company from an invitation
    public shared func addManagerInvitation(company_id : Text, user_id : Principal) : async Result.Result<(), Text> {
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
                    profile = company.profile;
                    founded_country = company.founded_country;
                    office_locations = company.office_locations;
                    social_medias = company.social_medias;
                    image = company.image;
                    linkedin = company.linkedin;
                    company_manager_ids = updatedManagerIds;
                    job_posting_ids = company.job_posting_ids;
                    reviews_ids = company.reviews_ids;
                    timestamp = company.timestamp;
                    seen = company.seen;
                };
                companies.put(company_id, updatedCompany);
                return #ok();
            };
        };
    };

    // Accept an invitation to a company
    public shared (msg) func acceptInvitation(invitation_id : Text) : async Result.Result<(), Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let invite = invitations.get(invitation_id);

        switch (invite) {
            case null {
                return #err("Invite not found");
            };
            case (?i) {
                if (i.user_id != user_id) {
                    return #err("Not authorized");
                };

                let result = await addManagerInvitation(i.company_id, i.user_id);

                let removedInvitation = invitations.remove(invitation_id);
                return #ok();
            };
        };
    };

    // Get all managers of a company
    public shared composite query func getManagersFromCompany(company_id : Text) : async Result.Result<[User.User], Text> {
        let companies = await getCompany(company_id);
        switch (companies) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {
                let manager_ids = company.company_manager_ids;
                var managers = Vector.Vector<User.User>();

                for (manager_id in manager_ids.vals()) {
                    let manager : ?User.User = await User.getUser(Principal.fromText(manager_id));
                    switch (manager) {
                        case null {
                            return #err("Manager not found");
                        };
                        case (?m) {
                            managers.add(m);
                        };
                    };
                };

                return #ok(Vector.toArray<User.User>(managers));
            };
        };
    };

    // Leave a company with the company ID
    public shared (msg) func leaveCompany(company_id : Text) : async Result.Result<(), Text> {

        let user_id = msg.caller;

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
                    profile = c.profile;
                    founded_country = c.founded_country;
                    office_locations = c.office_locations;
                    social_medias = c.social_medias;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = updatedManagerIds;
                    job_posting_ids = c.job_posting_ids;
                    reviews_ids = c.reviews_ids;
                    timestamp = c.timestamp;
                    seen = c.seen;
                };
                companies.put(company_id, updatedCompany);
                return #ok();
            };
        };
    };



    type CompanyNameImage = {
        id : Text;
        name : Text;
        image : Blob;
    };

    // Get name and image of companies by their IDs
    public shared query func getCompanyNameAndImages(company_ids : [Text]) : async Result.Result<[CompanyNameImage], Text> {
        let companyDatas = Vector.Vector<CompanyNameImage>();

        for (company_id in company_ids.vals()) {
            let company = companies.get(company_id);
            switch (company) {
                case (null) {};
                case (?c) {
                    let newComp = {
                        id = c.id;
                        name = c.name;
                        image = c.image;
                    };
                    companyDatas.add(newComp);
                };
            };
        };

        return #ok(Vector.toArray(companyDatas));
    };


    public shared (msg) func addReviewToCompany(companyId : Text, reviewId: Text) : async Result.Result<(), Text> {
        if(Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        let company = companies.get(companyId);

        switch (company) {
            case null {
                return #err("Company not found");
            };
            case (?c) {
                let reviews_ids = c.reviews_ids;
                let updatedReviews = Array.append<Text>(reviews_ids, [reviewId]);

                let updatedCompany = {
                    id = c.id;
                    name = c.name;
                    founded_year = c.founded_year;
                    profile = c.profile;
                    founded_country = c.founded_country;
                    office_locations = c.office_locations;
                    social_medias = c.social_medias;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = c.company_manager_ids;
                    job_posting_ids = c.job_posting_ids;
                    reviews_ids = updatedReviews;
                    timestamp = c.timestamp;
                    seen = c.seen;
                };
                companies.put(c.id, updatedCompany);
                return #ok();
            };
        };
    };


    // Delete a review from a company
    public shared (msg) func deleteReviewFromCompany(companyId : Text, reviewId: Text) : async Result.Result<(), Text> {
    
        if(Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        let company = companies.get(companyId);

        switch (company) {
            case null {
                return #err("Company not found");
            };
            case (?c) {
                let reviews_ids = c.reviews_ids;
                let updatedReviews = Array.filter<Text>(reviews_ids, func(p : Text) : Bool { p != reviewId });

                let updatedCompany = {
                    id = c.id;
                    name = c.name;
                    founded_year = c.founded_year;
                    profile = c.profile;
                    founded_country = c.founded_country;
                    office_locations = c.office_locations;
                    social_medias = c.social_medias;
                    image = c.image;
                    linkedin = c.linkedin;
                    company_manager_ids = c.company_manager_ids;
                    job_posting_ids = c.job_posting_ids;
                    reviews_ids = updatedReviews;
                    timestamp = c.timestamp;
                    seen = c.seen;
                };
                companies.put(c.id, updatedCompany);
                return #ok();
            };
        };
    };

    type UserInvitation = {
        user : User.User;
        invite : Invite;
    };

    type CompanyInvitation = {
        company : Company;
        invite : Invite;
    };

    // Get all invitations to a company
    public shared (msg) func getCompanyInvitations(company_id : Text) : async Result.Result<[UserInvitation], Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = await getCompany(company_id);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(c)) {
                let isManager : Bool = await checkCompanyManager(c, user_id);

                if (not isManager) {
                    return #err("User is not a manager of the company");
                };

                let companyInvitations = Vector.Vector<UserInvitation>();

                for (invite in invitations.vals()) {
                    if (invite.company_id == company_id) {

                        let user = await User.getUser(invite.user_id);

                        switch (user) {
                            case (null) {
                                return #err("User not found");
                            };
                            case (?u) {
                                let userInvitation = {
                                    user = u;
                                    invite = invite;
                                };

                                companyInvitations.add(userInvitation);
                            };
                        };
                    };
                };

                return #ok(Vector.toArray(companyInvitations));
            };
        };
    };


    // Get all invitations to a user
    public shared (msg) func getUserInvitations() : async Result.Result<[CompanyInvitation], Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let userInvitation = Vector.Vector<CompanyInvitation>();

        for (invite in invitations.vals()) {
            if (invite.user_id == user_id) {
                let company = await getCompany(invite.company_id);

                switch (company) {
                    case (#err(msg)) {
                        return #err("Company not found");
                    };
                    case (#ok(c)) {

                        let companyInvitation = {
                            company = c;
                            invite = invite;
                        };
                        userInvitation.add(companyInvitation);
                    };
                };
            };
        };

        return #ok(Vector.toArray(userInvitation));
    };


    // Generates a company with default values
    public shared (msg) func seed_companies() : async Result.Result<Text, Text> {
        if(Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        let fuzz = Fuzz.Fuzz();

        let amount = fuzz.nat.randomRange(5, 12);

        var curr = 0;

        let socialMedias = ["facebook.com/", "twitter.com/", "instagram.com/", "linkedin.com/", "youtube.com/", "pinterest.com/", "tiktok.com/", "snapchat.com/", "reddit.com/", "tumblr.com/"];
        let countries = ["Japan", "Germany", "Australia", "Brazil", "Canada", "Egypt", "France", "India", "Italy", "Mexico"];


        while (curr < amount) {
            let id = await Helper.generateUUID();

            let company = {
                id = id;
                name = fuzz.text.randomText(fuzz.nat.randomRange(5, 12));
                founded_year = fuzz.nat.randomRange(2000, 2023);
                profile = fuzz.text.randomText(fuzz.nat.randomRange(75, 500));
                founded_country = countries[fuzz.nat.randomRange(0, countries.size() - 1)];
                office_locations = fuzz.array.randomArray(fuzz.nat.randomRange(1, 5), func() : Text {
                    return fuzz.text.randomText(fuzz.nat.randomRange(10, 30));
                });
                social_medias = fuzz.array.randomArray(fuzz.nat.randomRange(1, 5), func() : Text {
                    return socialMedias[fuzz.nat.randomRange(0, socialMedias.size() - 1)] # fuzz.text.randomText(fuzz.nat.randomRange(10, 30));
                });
                image = Blob.fromArray([0]);
                linkedin = fuzz.text.randomText(fuzz.nat.randomRange(5, 30));
                company_manager_ids = [];
                job_posting_ids = [];
                reviews_ids = [];
                timestamp = Time.now();
                seen = fuzz.nat.randomRange(0, 100);
            };
            companies.put(company.id, company);
            curr += 1;

            Debug.print("Seeded company " # Nat.toText(curr) # " out of " # Nat.toText(amount));
        };

        return #ok("Companies seeded");
    };

    
    // Delete all companies
    public shared (msg) func clean_companies() : async Result.Result<Text, Text> {
        if(Principal.isAnonymous(msg.caller)) {
            return #err("Not authorized");
        };

        for (company in companies.vals()) {
            ignore companies.remove(company.id);
        };      

        return #ok("All companies deleted");
    };
};
