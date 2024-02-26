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
// import Job "canister:HireVerse_job";

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
    };

    companies.put(company.id, company);

    return company.id;
  };
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

  public shared query (msg) func getManagedCompanies() : async Result.Result<[Company], Text> {
    let user_id = msg.caller;

    if (Principal.isAnonymous(user_id)) {
      return #err("Not authorized");
    };

    let companyList : [Company] = Iter.toArray(companies.vals());
    var managedCompanies = Vector.Vector<Company>();

    for (company in companyList.vals()) {
      if (Array.find<Principal>(company.company_manager_ids, func(p : Principal) : Bool { p == user_id }) != null) {
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

  public shared func inviteManager(company_id : Text, user_id : Principal, inviter_id : Principal) : async Result.Result<Invite, Text> {
    
    if (Principal.isAnonymous(user_id)) {
      return #err("Not authorized");
    };
    
    let company = await getCompany(company_id);

    switch (company) {
      case null {
        return #err("Company not found");
      };
      case (?company) {

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

  public shared (msg) func addJob (company_id : Text, job_id : Text) : async Result.Result<(), Text> {
    
    let user_id = msg.caller;

    if(Principal.isAnonymous(user_id)) {
      return #err("Not authorized");
    };
    
    let company = await getCompany(company_id);

    switch (company) {
      case null {
        return #err("Company not found");
      };
      case (?company) {
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
        };
        companies.put(company_id, updatedCompany);
        #ok();
      };
    };
  };

  public shared func removeInvite(id : Text) : async Result.Result<?Invite, Text> {
    #ok(invitations.remove(id));
  };

  public shared (msg) func addManager(company_id : Text) : async Result.Result<(), Text> {
    let user_id = msg.caller;

    if (Principal.isAnonymous(user_id)) {
      return #err("Not authorized");
    };

    let company = await getCompany(company_id);

    switch (company) {
      case null {
        return #err("Company not found");
      };
      case (?company) {
        let manager_ids = company.company_manager_ids;
        let updatedManagerIds = Array.append<Principal>(manager_ids, [user_id]);

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
        };
        companies.put(company_id, updatedCompany);
        return #ok();
      };
    };
  };
  public shared composite query func getManagersFromCompany(company_id : Text) : async Result.Result<[User.User], Text> {
    let companies : ?Company = await getCompany(company_id);

    switch (companies) {
      case null {
        return #err("Company not found");
      };
      case (?company) {
        let manager_ids = company.company_manager_ids;
        var managers = Vector.Vector<User.User>();

        label l loop {
          for (manager_id in manager_ids.vals()) {
            let manager : ?User.User = await User.getUser(manager_id);
            switch (manager) {
              case null {
                continue l;
              };
              case (?m) {
                managers.add(m);
              };
            };
          };
        };

        #ok(Vector.toArray<User.User>(managers));
      };
    };
  };

  public shared func leaveCompany(company_id : Text, user_id : Principal) : async Result.Result<(), Text> {

    let company : ?Company = await getCompany(company_id);

    switch (company) {
      case null {
        return #err("Company not found");
      };
      case (?c) {
        let manager_ids = c.company_manager_ids;
        let updatedManagerIds = Array.filter<Principal>(
          manager_ids,
          func(p : Principal) : Bool {
            p != user_id;
          },
        );

        if(updatedManagerIds.size() == manager_ids.size()) {
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
        };
        companies.put(company_id, updatedCompany);
        return #ok();
      };
    };
  };

  // public shared composite query func getJobPostedByCompany(company_id : Principal) : async Result.Result<[Job.Job], Text> {
  //   let company : ?Company = await getCompany(company_id);

  //   switch (company) {
  //     case null {
  //       return #err("Company not found");
  //     };
  //     case (?c) {
  //       let job_ids = c.job_posting_ids;
  //       var jobPostings : [Job.Job] = [];
  //       label l loop {
  //         for (job_id in job_ids.vals()) {
  //           let jobPosting = await Job.getJob(job_id);
  //           switch (jobPosting) {
  //             case null {
  //               continue l;
  //             };
  //             case (?jp) {
  //               jobPostings := Array.append<Job.Job>(jobPostings, [jp]);
  //             };
  //           };
  //         };
  //       };

  //       return jobPostings;
  //     };
  //   };
  // };

  public shared composite query func getCompanyNames(comapny_ids : [Text]) : async Result.Result<[Text], Text> {
    let companyNames = Vector.Vector<Text>();

    label l loop {
      for (company_id in comapny_ids.vals()) {
        let company : ?Company = await getCompany(company_id);
        switch (company) {
          case null {
            continue l;
          };
          case (?c) {
            companyNames.add(c.name);
          };
        };
      };
    };

    return #ok(Vector.toArray(companyNames));
  };
};
