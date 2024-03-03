import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Helper "canister:HireVerse_helper";
import Vector "mo:vector/Class";

actor Review {
    type Review = {
        id : Text;
        userId : Text;
        title : Text;
        isAnonymous : Bool;
        cultureRating : Nat;
        seniorManagementRating : Nat;
        workLifeBalanceRating : Nat;
        recommendToFriend : Bool;
        generalComments : Text;
        pros : [Text];
        cons : [Text];
        companyId : Text;
        timestamp : Time.Time;
    };

    type CreateReviewInput = {
        title : Text;
        isAnonymous : Bool;
        cultureRating : Nat;
        seniorManagementRating : Nat;
        workLifeBalanceRating : Nat;
        recommendToFriend : Bool;
        generalComments : Text;
        pros : [Text];
        cons : [Text];
        companyId : Text;
    };

    let reviews = TrieMap.TrieMap<Text, Review>(Text.equal, Text.hash);

    public shared (msg) func addReview(newReview : CreateReviewInput) : async Result.Result<Text, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You must be logged in to add a review");
        };

        let id = await Helper.generateUUID();

        let review = {
            id = id;
            userId = Principal.toText(msg.caller);
            title = newReview.title;
            isAnonymous = newReview.isAnonymous;
            cultureRating = newReview.cultureRating;
            seniorManagementRating = newReview.seniorManagementRating;
            workLifeBalanceRating = newReview.workLifeBalanceRating;
            recommendToFriend = newReview.recommendToFriend;
            generalComments = newReview.generalComments;
            pros = newReview.pros;
            cons = newReview.cons;
            companyId = newReview.companyId;
            timestamp = Time.now();
        };

        reviews.put(review.id, review);
        #ok(review.id);
    };

    public shared (msg) func updateReview(review : Review) : async Result.Result<Text, Text> {

        if (Principal.isAnonymous(msg.caller)) {
            return #err("You must be logged in to update a review");
        };

        if (review.userId != Principal.toText(msg.caller)) {
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
                if (r.userId != Principal.toText(msg.caller)) {
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

    public func getReviews(reviewsId : [Text]) : async Result.Result<[Review], Text> {
        let reviewsList = Vector.Vector<Review>();

        for (id in Iter.fromArray(reviewsId)) {
            let data = reviews.get(id);

            switch (data) {
                case (?review) {
                    reviewsList.add(review);
                };
                case (null) {
                    
                };
            };
        };

        return #ok(Vector.toArray(reviewsList));

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
