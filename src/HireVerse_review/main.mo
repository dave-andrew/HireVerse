import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

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
    };

    let reviews = TrieMap.TrieMap<Principal, Review>(Principal.equal, Principal.hash);
    
    public shared func displayAllReview() : async [Review] {
        Iter.toArray(reviews.vals());
    };

    public func addReview(review : Review) : async () {
        reviews.put(review.id, review);
    };

    public query func getReview(id : Principal) : async ?Review {
        reviews.get(id);
    };
}