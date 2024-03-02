import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Helper "canister:HireVerse_helper";

actor Review {
    type Review = {
        id : Text;
        employer_id : Principal;
        employer_name : Text;
        career_opportunities : Nat;
        compensation_benefits_rating : Nat;
        culture_values_rating : Nat;
        senior_management_rating : Nat;
        work_life_balance_rating : Nat;
        general_comment : Nat;
        pros : Text;
        cons : Text;
        company_id : Text;
        timestamp : Time.Time;
    };

    type CreateReviewInput = {
        employer_id : Principal;
        employer_name : Text;
        career_opportunities : Nat;
        compensation_benefits_rating : Nat;
        culture_values_rating : Nat;
        senior_management_rating : Nat;
        work_life_balance_rating : Nat;
        general_comment : Nat;
        pros : Text;
        cons : Text;
        company_id : Text;
    };

    let reviews = TrieMap.TrieMap<Text, Review>(Text.equal, Text.hash);

    public shared (msg) func addReview(newReview : CreateReviewInput) : async Result.Result<Text, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You must be logged in to add a review");
        };

        let id = await Helper.generateUUID();

        let review = {
            id = id;
            employer_id = newReview.employer_id;
            employer_name = newReview.employer_name;
            career_opportunities = newReview.career_opportunities;
            compensation_benefits_rating = newReview.compensation_benefits_rating;
            culture_values_rating = newReview.culture_values_rating;
            senior_management_rating = newReview.senior_management_rating;
            work_life_balance_rating = newReview.work_life_balance_rating;
            general_comment = newReview.general_comment;
            pros = newReview.pros;
            cons = newReview.cons;
            company_id = newReview.company_id;
            timestamp = Time.now();
        };

        reviews.put(review.id, review);
        #ok(review.id);
    };

    public shared (msg) func updateReview(review : Review) : async Result.Result<Text, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You must be logged in to update a review");
        };

        if (review.employer_id != msg.caller) {
            return #err("You are not authorized to update this review");
        };

        reviews.put(review.id, review);
        #ok(review.id);
    };

    public shared (msg) func deleteReview(id : Text) : async Result.Result<?Review, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You must be logged in to delete a review");
        };

        let review : ?Review = reviews.get(id);

        switch (review) {
            case (?r) {
                if (r.employer_id != msg.caller) {
                    return #err("You are not authorized to update this review");
                };
            };
            case (null) {
                return #err("Review not found");
            };
        };

        #ok(reviews.remove(id));
    };

    public func getReview(id : Text) : async Result.Result<Review, Text> {
        let data = reviews.get(id);

        switch (data) {
            case (?review) {
                return #ok(review);
            };
            case (null) {
                return #err("Review not found");
            };
        };
    };

    public shared (msg) func removeAllReviews() : async () {

        if (Principal.isAnonymous(msg.caller)) {
            return;
        };

        for (review in reviews.vals()) {
            ignore reviews.remove(review.id);
        };
    };
};
