import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Helper "canister:HireVerse_helper";

actor Review {
    type Review = {
        id : Principal;
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

    let reviews = TrieMap.TrieMap<Principal, Review>(Principal.equal, Principal.hash);
    
    public func addReview(
        employer_id : Principal,
        employer_name : Text,
        career_opportunities : Nat,
        compensation_benefits_rating : Nat,
        culture_values_rating : Nat,
        senior_management_rating : Nat,
        work_life_balance_rating : Nat,
        general_comment : Nat,
        pros : Text,
        cons : Text
    ) : async () {
        let id : Principal = await Helper.generatePrinciple();

        let review = {
            id = id;
            employer_id = employer_id;
            employer_name = employer_name;
            career_opportunities = career_opportunities;
            compensation_benefits_rating = compensation_benefits_rating;
            culture_values_rating = culture_values_rating;
            senior_management_rating = senior_management_rating;
            work_life_balance_rating = work_life_balance_rating;
            general_comment = general_comment;
            pros = pros;
            cons = cons;
            timestamp = Time.now()
        };

        reviews.put(review.id, review);
    };

    public func updateReview(review : Review) : async () {
        reviews.put(review.id, review);
    };

    public func deleteReview(id: Principal) : async ?Review {
        reviews.remove(id);
    };

    public func getReview(id: Principal) : async ?Review {
        return reviews.get(id);
    };
}