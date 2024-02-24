import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
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
    };

    let reviews = TrieMap.TrieMap<Text, Review>(Text.equal, Text.hash);

    public func addReview(newReview : CreateReviewInput) : async () {
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
            timestamp = Time.now();
        };

        reviews.put(review.id, review);
    };

    public func updateReview(review : Review) : async () {
        reviews.put(review.id, review);
    };

    public func deleteReview(id : Text) : async ?Review {
        reviews.remove(id);
    };

    public func getReview(id : Text) : async ?Review {
        return reviews.get(id);
    };
};
