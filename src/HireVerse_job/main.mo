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
import Helper "canister:HireVerse_helper";
import Company "canister:HireVerse_company";
import Review "canister:HireVerse_review";
import Vector "mo:vector/Class"


actor Job {
    type Job = {
        id : Text;
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        company_id : Text;
        reviews : [Text];
        timestamp : Time.Time;
    };

    type CreateJobInput = {
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        company_id : Text;
    };

    type FullJob = {
        id : Text;
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        timestamp : Time.Time;
        company : ?Company.Company;
        reviews : [Text];
    };

    type JobFilterInput = {
        position : ?Text;
        country : ?Text;
        order: ?Text;
        salary_start: ?Nat;
        salary_end: ?Nat;
        industry: ?Text;
        experience: ?Text;
        date_posted: ?Time.Time;
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
            short_description = "We are looking for a software engineer to join our team!";
            job_description = "We are looking for a software engineer to join our team! We are a fast growing company and are looking for someone who is passionate about technology and is a team player.";
            requirements = "3+ years of experience in software engineering";
            company_id = company_id;
            reviews = [];
            timestamp = Time.now();
        };
        jobs.put(job.id, job);
    };

    public shared func createJob(newJob : CreateJobInput) : async Result.Result<Job, Text> {
        let id = await Helper.generateUUID();

        let job : Job = {
            id = id;
            position = newJob.position;
            location = newJob.location;
            industry = newJob.industry;
            salary_start = newJob.salary_start;
            salary_end = newJob.salary_end;
            short_description = newJob.short_description;
            job_description = newJob.job_description;
            requirements = newJob.requirements;
            company_id = newJob.company_id;
            reviews = [];
            timestamp = Time.now();
        };

        jobs.put(id, job);
        let test = Company.addJob(newJob.company_id, id);
        return #ok(job);
    };

    public query func updateJob(id : Text, job : Job) : async () {
        jobs.put(id, job);
    };

    public shared func deleteJob(id : Text) : async ?Job {
        jobs.remove(id);
    };

    public shared query func getJob(id : Text) : async ?Job {
        return jobs.get(id);
    };

    public shared func getFullJob(id : Text) : async ?FullJob {
        let job : ?Job = await getJob(id);
        switch (job) {
            case null {
                return null;
            };
            case (?actualJob) {
                let company = await Company.getCompany(actualJob.company_id);

                var reviews = Vector.Vector<Text>();

                for (review_id in actualJob.reviews.vals()) {
                    let review = await Review.getReview(review_id);
                    switch (review) {
                        case null {
                            return null;
                        };
                        case (?actualReview) {
                            reviews.add(actualReview.id);
                        };
                    };
                };

                let fullJob : FullJob = {
                    id = actualJob.id;
                    position = actualJob.position;
                    location = actualJob.location;
                    industry = actualJob.industry;
                    salary_start = actualJob.salary_start;
                    salary_end = actualJob.salary_end;
                    short_description = actualJob.short_description;
                    job_description = actualJob.job_description;
                    requirements = actualJob.requirements;
                    timestamp = actualJob.timestamp;
                    company = company;
                    reviews = Vector.toArray<Text>(reviews);
                };
                return ?fullJob;
            };
        };
    };

    public shared func addReview(job_id : Text, review_id : Text) {
        let job = jobs.get(job_id);
        switch (job) {
            case null {
                return;
            };
            case (?actualJob) {

                let jobReviews = Vector.fromArray<Text>(actualJob.reviews);

                jobReviews.add(review_id);

                let updated_job = {
                    id = actualJob.id;
                    position = actualJob.position;
                    location = actualJob.location;
                    industry = actualJob.industry;
                    salary_start = actualJob.salary_start;
                    salary_end = actualJob.salary_end;
                    short_description = actualJob.short_description;
                    job_description = actualJob.job_description;
                    requirements = actualJob.requirements;
                    company_id = actualJob.company_id;
                    reviews = Vector.toArray<Text>(jobReviews);
                    timestamp = actualJob.timestamp;
                };
                jobs.put(job_id, updated_job);
            };
        };
    };

    public shared query func getAllJobs() : async [Job] {
        return Iter.toArray(jobs.vals());
    };

    public shared query func getAllIndustry() : async [Text] {
        let jobsList = Iter.toArray(jobs.vals());
        let industryList = Vector.Vector<Text>();

        for (job in Iter.fromArray(jobsList)) {
            if (not Vector.contains(industryList, job.industry, Text.equal)) {
                industryList.add(job.industry);
            };
        };

        return Vector.toArray<Text>(industryList);
    };


    public shared composite query func getJobs(startFrom : Nat, amount : Nat, jobFilters : JobFilterInput) : async [Job] {
        var jobsList = Iter.toArray(jobs.vals());

        switch(jobFilters.position){
            case null {};
            case (?position) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return Text.contains(job.position, #text position);
                });
            };
        };

        switch(jobFilters.salary_start){
            case null {};
            case (?salary_start) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return job.salary_start >= salary_start;
                });
            };
        };

        switch(jobFilters.salary_end){
            case null {};
            case (?salary_end) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return job.salary_end <= salary_end;
                });
            };
        };

        switch(jobFilters.industry){
            case null {};
            case (?industry) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return Text.contains(job.industry, #text industry);
                });
            };
        };

        switch(jobFilters.experience){
            case null {};
            case (?experience) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return Text.contains(job.requirements, #text experience);
                });
            };
        };

        switch(jobFilters.date_posted){
            case null {};
            case (?date_posted) {
                jobsList := Array.filter<Job>(jobsList, func(job) {
                    return job.timestamp >= date_posted;
                });
            };
        };


        switch(jobFilters.country){
            case null {};
            case (?country) {
                var newJobList = Vector.Vector<Job>();

                for (job in Iter.fromArray(jobsList)) {
                    let company = await Company.getCompany(job.company_id);

                    switch (company) {
                        case null {};
                        case (?company) {
                            if (Text.contains(company.country, #text country)) {
                                newJobList.add(job);
                            }
                        };
                    };
                };

                jobsList := Vector.toArray(newJobList);
            };
        };

        switch(jobFilters.order){
            case null {};
            case (?order) {

                if(order == "Newest") {
                    jobsList := Array.sort<Job>(jobsList, func(a, b) {
                        return Int.compare(a.timestamp, b.timestamp);
                    });
                };
                
                if(order == "Oldest") {
                    jobsList := Array.sort<Job>(jobsList, func(a, b) {
                        return Int.compare(b.timestamp, a.timestamp);
                    });
                };

                if(order == "Highest Salary") {
                    jobsList := Array.sort<Job>(jobsList, func(a, b) {
                        return Int.compare(b.salary_start, a.salary_start);
                    });
                };

                if(order == "Lowest Salary") {
                    jobsList := Array.sort<Job>(jobsList, func(a, b) {
                        return Int.compare(a.salary_start, b.salary_start);
                    });
                }

            };
        };

        if(startFrom > jobsList.size()) {
            return [];
        };

        if(startFrom + amount > jobsList.size()) {
            return Iter.toArray(Array.slice<Job>(jobsList, startFrom, jobsList.size()));
        };

        return Iter.toArray(Array.slice<Job>(jobsList, startFrom, startFrom + amount));
    };

    public shared query func searchJobs(position : Text, country : Text) : async [Job] {
        let jobsList = Iter.toArray(jobs.vals());

        let filteredJobs = Array.filter<Job>(jobsList, func(job) {
            return Text.contains(job.position, #text position);
        });

        return Array.filter<Job>(filteredJobs, func(job) {
            return Text.contains(job.location, #text country);
        });
    };

};
