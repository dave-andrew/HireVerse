import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import List "mo:base/List";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Result "mo:base/Result";
import Error "mo:base/Error";
import Debug "mo:base/Debug";
import Bool "mo:base/Bool";
import Helper "canister:HireVerse_helper";
import Company "canister:HireVerse_company";
import Vector "mo:vector/Class";
import TextX "mo:xtended-text/TextX";
import CharX "mo:xtended-text/CharX";
import Fuzz "mo:fuzz";

actor Job {
   type Job = {
      id : Text;
      position : Text;
      location : Text;
      industry : Text;
      salary_start : Nat;
      salary_end : Nat;
      currency : Text;
      short_description : Text;
      job_description : Text;
      requirements : Text;
      company_id : Text;
      contacts : [Text];
      employType : Text;
      timestamp : Time.Time;
      status : Text;
   };

   type CreateJobInput = {
      position : Text;
      location : Text;
      industry : Text;
      salary_start : Nat;
      salary_end : Nat;
      currency : Text;
      short_description : Text;
      job_description : Text;
      requirements : Text;
      company_id : Text;
      contacts : [Text];
      employType : Text;
   };

   type FullJob = {
      id : Text;
      position : Text;
      location : Text;
      industry : Text;
      salary_start : Nat;
      salary_end : Nat;
      currency : Text;
      short_description : Text;
      job_description : Text;
      requirements : Text;
      company : Company.Company;
      contacts : [Text];
      employType : Text;
      timestamp : Time.Time;
      status : Text;
   };

   type JobFilterInput = {
      position : ?Text;
      country : ?Text;
      order : ?Text;
      salary_start : ?Nat;
      salary_end : ?Nat;
      currency : ?Text;
      industry : ?Text;
      experience : ?Text;
      date_posted : ?Time.Time;
   };

   type JobManagerFilterInput = {
      position : ?Text;
      order : ?Text;
      status : ?Text;
   };

   type FilterCompany = {
      location : ?Text;
      industries : ?Text;
   };

   let jobs = TrieMap.TrieMap<Text, Job>(Text.equal, Text.hash);

   // Create job with user inputs
   public shared (msg) func createJob(newJob : CreateJobInput) : async Result.Result<Job, Text> {
      let id = await Helper.generateUUID();

      let user_id = msg.caller;

      if (Principal.isAnonymous(user_id)) {
         return #err("Unauthorized");
      };

      let company = await Company.getCompany(newJob.company_id);

      switch (company) {
         case (#err(errmsg)) {
            return #err("Company not found");
         };
         case (#ok(actualCompany)) {
            let manager_ids : [Text] = actualCompany.company_manager_ids;

            if (Array.find<Text>(manager_ids, func(p : Text) : Bool { p == Principal.toText(user_id) }) == null) {
               return #err("Unauthorized");
            };
         };
      };

      let job : Job = {
         id = id;
         position = newJob.position;
         location = newJob.location;
         industry = newJob.industry;
         salary_start = newJob.salary_start;
         salary_end = newJob.salary_end;
         currency = newJob.currency;
         short_description = newJob.short_description;
         job_description = newJob.job_description;
         requirements = newJob.requirements;
         company_id = newJob.company_id;
         timestamp = Time.now();
         status = "active";
         employType = newJob.employType;
         contacts = [];
      };

      jobs.put(id, job);
      let res = await Company.addJob(newJob.company_id, id);

      switch (res) {
         case (#err(errmsg)) {
            return #err(errmsg);
         };
         case (#ok(_)) {
            return #ok(job);
         };
      };
   };

   // Delete job by id
   public shared (msg) func deleteJob(id : Text) : async Result.Result<?Job, Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      #ok(jobs.remove(id));
   };


   // Get job by id
   public shared query (msg) func getJob(id : Text) : async Result.Result<Job, Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      let job : ?Job = jobs.get(id);
      switch (job) {
         case null {
            return #err("Job not found");
         };
         case (?actualJob) {
            return #ok(actualJob);
         };
      };
   };


   // Get full job by id
   public shared (msg) func getFullJob(id : Text) : async Result.Result<FullJob, Text> {

      let user_id = msg.caller;

      if (Principal.isAnonymous(user_id)) {
         return #err("Unauthorized");
      };

      let job = jobs.get(id);

      switch (job) {
         case null {
            return #err("Job not found");
         };
         case (?actualJob) {
            let company = await Company.getCompany(actualJob.company_id);

            switch (company) {
               case (#err(errmsg)) {
                  return #err("Company not found");
               };
               case (#ok(company)) {};
            };

            switch (company) {
               case (#err(errmsg)) {
                  return #err("Company not found");
               };
               case (#ok(company)) {
                  let fullJob : FullJob = {
                     id = actualJob.id;
                     position = actualJob.position;
                     location = actualJob.location;
                     industry = actualJob.industry;
                     salary_start = actualJob.salary_start;
                     salary_end = actualJob.salary_end;
                     currency = actualJob.currency;
                     short_description = actualJob.short_description;
                     job_description = actualJob.job_description;
                     requirements = actualJob.requirements;
                     timestamp = actualJob.timestamp;
                     company = company;
                     contacts = actualJob.contacts;
                     employType = actualJob.employType;
                     status = actualJob.status;
                  };
                  return #ok(fullJob);
               };
            };
         };
      };
   };


   // Get all jobs in the system
   public shared query func getAllJobs() : async Result.Result<[Job], Text> {
      return #ok(Iter.toArray(jobs.vals()));
   };


   // Get all available industries in the system
   public shared query func getAllIndustry() : async Result.Result<[Text], Text> {
      let jobsList = Iter.toArray(jobs.vals());
      let industryList = Vector.Vector<Text>();

      for (job in Iter.fromArray(jobsList)) {
         if (not Vector.contains(industryList, job.industry, Text.equal)) {
            industryList.add(job.industry);
         };
      };

      return #ok(Vector.toArray<Text>(industryList));
   };


   // Get job industries by company id
   public shared composite query func getCompanyJobIndustries(company_id : Text) : async Result.Result<[Text], Text> {
      let company = await Company.getCompany(company_id);

      switch (company) {
         case (#err(e)) {
            return #err("Company not found");
         };
         case (#ok(c)) {
            let industries = Vector.Vector<Text>();
            let jobIds = c.job_posting_ids;

            for (jobId in jobIds.vals()) {
               let job = await Job.getJob(jobId);
               switch (job) {
                  case (#err(e)) {};
                  case (#ok(j)) {
                     if (not Vector.contains(industries, j.industry, Text.equal)) {
                        industries.add(j.industry);
                     };
                  };
               };
            };
            return #ok(Vector.toArray(industries));
         };
      };
   };


   // Get jobs by company id
   public shared composite query func getJobs(startFrom : Nat, amount : Nat, jobFilters : JobFilterInput) : async Result.Result<[Job], Text> {
      var jobsList = Iter.toArray(jobs.vals());

      jobsList := Array.filter<Job>(
         jobsList,
         func(job) {
            return Text.equal(TextX.toLower(job.status), "active");
         },
      );

      switch (jobFilters.position) {
         case null {};
         case (?position) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  let tempPosition = TextX.toLower(position);
                  return Text.contains(TextX.toLower(job.position), #text tempPosition);
               },
            );
         };
      };

      switch (jobFilters.salary_start) {
         case null {};
         case (?salary_start) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  return job.salary_start >= salary_start;
               },
            );
         };
      };

      switch (jobFilters.salary_end) {
         case null {};
         case (?salary_end) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  return job.salary_end <= salary_end;
               },
            );
         };
      };

      switch (jobFilters.industry) {
         case null {};
         case (?industry) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  return Text.contains(job.industry, #text industry);
               },
            );
         };
      };

      switch (jobFilters.experience) {
         case null {};
         case (?experience) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  let tempExperience = TextX.toLower(experience);
                  return Text.contains(TextX.toLower(job.employType), #text tempExperience);
               },
            );
         };
      };

      switch (jobFilters.date_posted) {
         case null {};
         case (?date_posted) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  return job.timestamp >= date_posted;
               },
            );
         };
      };

      switch (jobFilters.country) {
         case null {};
         case (?country) {
            var newJobList = Vector.Vector<Job>();

            for (job in Iter.fromArray(jobsList)) {
               let company = await Company.getCompany(job.company_id);

               switch (company) {
                  case (#err(errmsg)) {};
                  case (#ok(company)) {
                     let tempCountry = TextX.toLower(country);
                     if (Text.contains(TextX.toLower(company.founded_country), #text tempCountry)) {
                        newJobList.add(job);
                     };
                  };
               };
            };

            jobsList := Vector.toArray(newJobList);
         };
      };

      switch (jobFilters.currency) {
         case null {};
         case (?currency) {
            jobsList := Array.filter<Job>(
               jobsList,
               func(job) {
                  return job.currency == currency;
               },
            );
         };
      };

      switch (jobFilters.order) {
         case null {};
         case (?order) {

            if (order == "Newest") {
               jobsList := Array.sort<Job>(
                  jobsList,
                  func(a, b) {
                     return Int.compare(a.timestamp, b.timestamp);
                  },
               );
            };

            if (order == "Oldest") {
               jobsList := Array.sort<Job>(
                  jobsList,
                  func(a, b) {
                     return Int.compare(b.timestamp, a.timestamp);
                  },
               );
            };

            if (order == "Highest Salary") {
               jobsList := Array.sort<Job>(
                  jobsList,
                  func(a, b) {
                     return Int.compare(b.salary_start, a.salary_start);
                  },
               );
            };

            if (order == "Lowest Salary") {
               jobsList := Array.sort<Job>(
                  jobsList,
                  func(a, b) {
                     return Int.compare(a.salary_start, b.salary_start);
                  },
               );
            };

         };
      };

      if (startFrom > jobsList.size()) {
         return #err("No more jobs");
      };

      if (startFrom + amount > jobsList.size()) {
         return #ok(Iter.toArray(Array.slice<Job>(jobsList, startFrom, jobsList.size())));
      };

      return #ok(Iter.toArray(Array.slice<Job>(jobsList, startFrom, startFrom + amount)));
   };


    // Get all jobs by company id and filter
   public shared composite query func getJobPostedByCompany(company_id : Text, startFrom : Nat, amount : Nat, filter : JobManagerFilterInput) : async Result.Result<[Job], Text> {
      let company = await Company.getCompany(company_id);

      switch (company) {
         case (#err(errmsg)) {
            return #err("Company not found");
         };
         case (#ok(c)) {
            let job_ids = c.job_posting_ids;
            var jobPostings = Vector.Vector<Job>();

            for (job_id in job_ids.vals()) {
               let jobPosting = jobs.get(job_id);
               switch (jobPosting) {
                  case (null) {};
                  case (?jp) {
                     jobPostings.add(jp);
                  };
               };
            };

            switch (filter.position) {
               case null {};
               case (?position) {
                  let newJobList = Vector.Vector<Job>();

                  for (job in Iter.fromArray(Vector.toArray(jobPostings))) {
                     let tempPosition = TextX.toLower(position);
                     if (Text.contains(TextX.toLower(job.position), #text tempPosition)) {
                        newJobList.add(job);
                     };
                  };

                  jobPostings := newJobList;
               };
            };

            switch (filter.status) {
               case null {};
               case (?status) {
                  let newJobList = Vector.Vector<Job>();

                  for (job in Iter.fromArray(Vector.toArray(jobPostings))) {
                     let tempStatus = TextX.toLower(status);
                     if (Text.contains(TextX.toLower(job.status), #text tempStatus)) {
                        newJobList.add(job);
                     };
                  };

                  jobPostings := newJobList;
               };
            };

            switch (filter.order) {
               case null {};
               case (?order) {

                  var jobsList = Vector.toArray<Job>(jobPostings);
                  if (order == "Newest") {
                     jobsList := Array.sort<Job>(
                        jobsList,
                        func(a, b) {
                           return Int.compare(b.timestamp, a.timestamp);
                        },
                     );
                  };

                  if (order == "Oldest") {
                     jobsList := Array.sort<Job>(
                        jobsList,
                        func(a, b) {
                           return Int.compare(a.timestamp, b.timestamp);
                        },
                     );
                  };

                  if (order == "Highest Salary") {
                     jobsList := Array.sort<Job>(
                        jobsList,
                        func(a, b) {
                           return Int.compare(b.salary_start, a.salary_start);
                        },
                     );
                  };

                  if (order == "Lowest Salary") {
                     jobsList := Array.sort<Job>(
                        jobsList,
                        func(a, b) {
                           return Int.compare(a.salary_start, b.salary_start);
                        },
                     );
                  };
                  jobPostings := Vector.fromArray(jobsList);
               };
            };

            return #ok(Vector.toArray<Job>(jobPostings));
         };
      };
   };

   // Toggle Job Visibility
   public shared (msg) func toggleJobVisibility(job_id : Text) : async Result.Result<(), Text> {
      let user_id = msg.caller;

      if (Principal.isAnonymous(user_id)) {
         return #err("Unauthorized");
      };

      let job = await getJob(job_id);

      switch (job) {
         case (#err(errmsg)) {
            return #err(errmsg);
         };
         case (#ok(actualJob)) {
            let company = await Company.getCompany(actualJob.company_id);

            switch (company) {
               case (#err(errmsg)) {
                  return #err("Company not found");
               };
               case (#ok(actualCompany)) {
                  let manager_ids : [Text] = actualCompany.company_manager_ids;

                  if (Array.find<Text>(manager_ids, func(p : Text) : Bool { p == Principal.toText(user_id) }) == null) {
                     return #err("Unauthorized");
                  };
               };
            };

            var newStatus = "active";

            if (actualJob.status == "active") {
               newStatus := "hidden";
            };

            let updated_job = {
               id = actualJob.id;
               position = actualJob.position;
               location = actualJob.location;
               industry = actualJob.industry;
               salary_start = actualJob.salary_start;
               salary_end = actualJob.salary_end;
               currency = actualJob.currency;
               short_description = actualJob.short_description;
               job_description = actualJob.job_description;
               requirements = actualJob.requirements;
               company_id = actualJob.company_id;
               timestamp = actualJob.timestamp;
               status = newStatus;
               employType = actualJob.employType;
               contacts = actualJob.contacts;
            };

            jobs.put(job_id, updated_job);
            return #ok();
         };
      };

      return #ok();
   };


    // Get all jobs by filters
   public shared composite query func getFilterCompanies(startFrom : Nat, amount : Nat, companyFilters : FilterCompany) : async Result.Result<[Company.Company], Text> {
      let jobsList = Iter.toArray(jobs.vals());
      var companyList = Vector.Vector<Company.Company>();
      let filteredJob = Vector.Vector<Job>();

      switch (companyFilters.industries) {
         case null {
            let response = await Company.getCompanies();

            switch (response) {
               case (#err(errmsg)) {};
               case (#ok(companies)) {
                  companyList := Vector.fromArray(companies);
               };
            };
         };
         case (?industries) {
            label l for (job in Iter.fromArray(jobsList)) {
               if (job.status != "active" or job.industry != industries) {
                  continue l;
               };

               let company = await Company.getCompany(job.company_id);

               switch (company) {
                  case (#err(errmsg)) {};
                  case (#ok(actualCompany)) {
                     companyList.add(actualCompany);
                  };
               };
            };
         };
      };

      var companies = Vector.toArray<Company.Company>(companyList);

      switch (companyFilters.location) {
         case null {};
         case (?location) {
            companies := Array.filter<Company.Company>(
               companies,
               func(company) : Bool {
                  Array.find<Text>(company.office_locations, func(p : Text) : Bool { p == location }) != null;
               },
            );
         };
      };

      if (startFrom > companies.size()) {
         return #err("No more companies");
      };

      if (startFrom + amount > companies.size()) {
         return #ok(companies);
      };

      return #ok(Iter.toArray(Array.slice(companies, startFrom, startFrom + amount)));
   };

   public shared (msg) func seed_jobs() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Not authorized");
      };

      let fuzz = Fuzz.Fuzz();
      let response = await Company.getCompanies();

      var companies : [Company.Company] = [];
      switch (response) {
         case (#err(errmsg)) {
            return #err(errmsg);
         };
         case (#ok(c)) {
            companies := c;
         };
      };

      let currency = ["$", "Rp", "£", "€", "¥", "₹", "₽", "₩", "₴", "₪", "₦", "₱", "₮", "₸", "₺", "₼", "₽", "₾", "₿"];
      let employType = ["Full-time", "Part-time", "Internship", "Contract", "Freelance"];
      let industries = ["Healthcare", "Renewable Energy", "Banking and Finance", "Software Development", "Manufacturing", "Information Technology", "Automotive", "Artificial Intelligence", "Agriculture", "Aerospace"];

      let companyIds = Array.map<Company.Company, Text>(companies, func(c) : Text { c.id });

      var currCompany = 1;

      for (companyId in Iter.fromArray(companyIds)) {
         for(i in Iter.range(0, fuzz.nat.randomRange(1, 3))) {
            let id = await Helper.generateUUID();

            let job = {
               id = id;
               position = fuzz.text.randomText(fuzz.nat.randomRange(10, 20));
               location = fuzz.text.randomText(fuzz.nat.randomRange(10, 20));
               industry = industries[fuzz.nat.randomRange(0, industries.size() - 1)];
               salary_start = fuzz.nat.randomRange(10000, 50000);
               salary_end = fuzz.nat.randomRange(50000, 100000);
               currency = currency[fuzz.nat.randomRange(0, currency.size() - 1)];
               short_description = fuzz.text.randomText(fuzz.nat.randomRange(25, 150));
               job_description = fuzz.text.randomText(fuzz.nat.randomRange(150, 750));
               requirements = fuzz.text.randomText(fuzz.nat.randomRange(150, 750));
               company_id = companyId;
               timestamp = Time.now();
               status = "active";
               employType = employType[fuzz.nat.randomRange(0, employType.size() - 1)];
               contacts = fuzz.array.randomArray(fuzz.nat.randomRange(1, 5), func() : Text { return fuzz.text.randomText(fuzz.nat.randomRange(10, 20)) });
            };
            
            jobs.put(id, job);

            let res = await Company.addJob(companyId, id);
            
            Debug.print("Seeded " # Nat.toText(i + 1) # " jobs for company " # Nat.toText(currCompany) # " out of " # Nat.toText(companyIds.size()));
         };

         currCompany += 1;         
      };
      return #ok("Jobs seeded");
   };

   public shared (msg) func clean_jobs() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Not authorized");
      };

      for (job in jobs.vals()) {
         ignore jobs.remove(job.id);
      };
      return #ok("All jobs deleted");
   };
};
