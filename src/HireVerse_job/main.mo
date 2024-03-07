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
import Helper "canister:HireVerse_helper";
import Company "canister:HireVerse_company";
import Vector "mo:vector/Class";
import TextX "mo:xtended-text/TextX";
import CharX "mo:xtended-text/CharX";

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

   public shared func generateJob(company_id : Text) : async () {

      let job : Job = {
         id = await Helper.generateUUID();
         position = "Software Engineer";
         location = "San Francisco, CA";
         industry = "Technology";
         salary_start = 100000;
         salary_end = 150000;
         currency = "Rp";
         short_description = "We are looking for a software engineer to join our team!";
         job_description = "We are looking for a software engineer to join our team! We are a fast growing company and are looking for someone who is passionate about technology and is a team player.";
         requirements = "3+ years of experience in software engineering";
         company_id = company_id;
         timestamp = Time.now();
         status = "public";
         employType = "Full-time";
         contacts = [];
      };
      jobs.put(job.id, job);
   };

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
         employType = "Full-time";
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

   public shared (msg) func createJobForce(newJob : CreateJobInput) : async Result.Result<Job, Text> {
      let id = await Helper.generateUUID();

      let user_id = msg.caller;

      if (Principal.isAnonymous(user_id)) {
         return #err("Unauthorized");
      };

      let company = await Company.getCompany(newJob.company_id);

      switch company {
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
         contacts = newJob.contacts;
      };

      jobs.put(id, job);
      let test = Company.addJob(newJob.company_id, id);
      return #ok(job);
   };

   public query (msg) func updateJob(id : Text, job : Job) : async Result.Result<(), Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      jobs.put(id, job);
      return #ok();
   };

   public shared (msg) func deleteJob(id : Text) : async Result.Result<?Job, Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      #ok(jobs.remove(id));
   };

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

   public shared query func getAllJobs() : async Result.Result<[Job], Text> {
      return #ok(Iter.toArray(jobs.vals()));
   };

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

   public shared query func searchJobs(position : Text, country : Text) : async Result.Result<[Job], Text> {
      let jobsList = Iter.toArray(jobs.vals());

      let filteredJobs = Array.filter<Job>(
         jobsList,
         func(job) {
            let tempPosition = TextX.toLower(position);
            return Text.contains(TextX.toLower(job.position), #text tempPosition);
         },
      );

      return #ok(
         Array.filter<Job>(
            filteredJobs,
            func(job) {
               let tempPosition = TextX.toLower(country);
               return Text.contains(TextX.toLower(job.location), #text tempPosition);
            },
         )
      );
   };

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

               Debug.print("di  a" # Nat.toText(jobPostings.size()));
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

                  Debug.print("di  b" # Nat.toText(jobPostings.size()));
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
                  Debug.print("di  c" # Nat.toText(jobPostings.size()));
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

                  Debug.print("di  d" # Nat.toText(jobPostings.size()));
               };
            };

            return #ok(Vector.toArray<Job>(jobPostings));
         };
      };
   };
   public shared func deleteAllJobs() : async () {
      for (job in jobs.vals()) {
         ignore jobs.remove(job.id);
      };
   };

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

   public shared composite query func getFilterCompanies(startFrom : Nat, amount : Nat, companyFilters : FilterCompany) : async Result.Result<[Company.Company], Text> {

      let companyList = Vector.Vector<Company.Company>();

      switch (companyFilters.industries) {
         case null {
            companyList := await Company.getAllCompanies();
         };
         case (?industries) {
            let jobs = Iter.toArray(jobs.vals());
            let companyIds = Vector.Vector<Text>();

            jobs := Array.filter<Job>(
               jobs,
               func(job) {
                  Array.find<Text>(industries, func(p : Text) : Bool { p == job.industry }) != null;
               },
            );

            for (job in Iter.fromArray(jobs)) {
               if (not Vector.contains(companyIds, job.company_id, Text.equal)) {
                  companyIds.add(job.company_id);
               };
            };

            for (companyId in companyIds.vals()) {
               let company = await Company.getCompany(companyId);
               switch (company) {
                  case (#err(errmsg)) {};
                  case (#ok(c)) {
                     companyList.add(c);
                  };
               };
            };
         };
      };

      switch (companyFilters.location) {
         case null {};
         case (?location) {
            companyList := Array.filter<Company.Company>(
               companyList,
               func(c : Company.Company) : Bool {
                  Array.find<Text>(c.office_locations, func(p : Text) : Bool { p == location }) != null;
               },
            );
         };
      };

      if (startFrom > companyList.size()) {
         return #err("No more company");
      };

      if (startFrom + amount > companyList.size()) {
         return #ok(Iter.toArray(Array.slice<Company.Company>(companyList, startFrom, companyList.size())));
      };

      return #ok(Iter.toArray(Array.slice<Company.Company>(companyList, startFrom, startFrom + amount)));
   };
};
