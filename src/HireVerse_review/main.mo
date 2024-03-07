import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
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

   type ReviewSummary = {
      cultureRating : Nat;
      seniorManagementRating : Nat;
      workLifeBalanceRating : Nat;
      recommendToFriend : Nat;
      totalReviews : Nat;
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

    // Function to add a review
   public shared (msg) func addReview(user_id : Principal, newReview : CreateReviewInput) : async Result.Result<Text, Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("You must be logged in to add a review");
      };

      let id = await Helper.generateUUID();

      let review = {
         id = id;
         userId = Principal.toText(user_id);
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

    // Function to get all reviews posted by someone
   public shared query (msg) func getSelfReview(companyId : Text) : async Result.Result<Review, Text> {
      if (Principal.isAnonymous(msg.caller)) {
         return #err("You must be logged in to view your review");
      };

      for (review in reviews.vals()) { 
         if (review.userId == Principal.toText(msg.caller) and review.companyId == companyId) {
            return #ok(review);
         };
      };

      return #err("Review not found");
   };

    // Function to update review
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

    // Function to delete review
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

    // Function to get review by id
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

    // Function to get all Reviews
   public query func getReviews(reviewsId : [Text], order : Text) : async Result.Result<[Review], Text> {
      let reviewsList = Vector.Vector<Review>();

      for (id in Iter.fromArray(reviewsId)) {
         let data = reviews.get(id);

         switch (data) {
            case (?review) {
               if (review.isAnonymous == true) {
                  reviewsList.add({
                     id = review.id;
                     userId = "Anonymous";
                     title = review.title;
                     isAnonymous = review.isAnonymous;
                     cultureRating = review.cultureRating;
                     seniorManagementRating = review.seniorManagementRating;
                     workLifeBalanceRating = review.workLifeBalanceRating;
                     recommendToFriend = review.recommendToFriend;
                     generalComments = review.generalComments;
                     pros = review.pros;
                     cons = review.cons;
                     companyId = review.companyId;
                     timestamp = review.timestamp;
                  });
               } else {
                  reviewsList.add(review);
               };
            };
            case (null) {};
         };
      };

      if (order == "Newest") {
         let temp = Array.sort<Review>(
            Vector.toArray(reviewsList),
            func(a, b) {
               return Int.compare(b.timestamp, a.timestamp);
            },
         );
         return #ok(temp);
      };
      if (order == "Oldest") {
         let temp = Array.sort<Review>(
            Vector.toArray(reviewsList),
            func(a, b) {
               return Int.compare(a.timestamp, b.timestamp);
            },
         );
         return #ok(temp);
      };
      if (order == "Highest Rating") {
         let temp = Array.sort<Review>(
            Vector.toArray(reviewsList),
            func(a, b) {
               let bAverage = (b.cultureRating + b.seniorManagementRating + b.workLifeBalanceRating) / 3;
               let aAverage = (a.cultureRating + a.seniorManagementRating + a.workLifeBalanceRating) / 3;
               return Int.compare(bAverage, aAverage);
            },
         );
         return #ok(temp);
      };
      if (order == "Lowest Rating") {
         let temp = Array.sort<Review>(
            Vector.toArray(reviewsList),
            func(a, b) {
               let bAverage = (b.cultureRating + b.seniorManagementRating + b.workLifeBalanceRating) / 3;
               let aAverage = (a.cultureRating + a.seniorManagementRating + a.workLifeBalanceRating) / 3;
               return Int.compare(aAverage, bAverage);
            },
         );
         return #ok(temp);
      };

      return #ok(Vector.toArray(reviewsList));
   };

    // Function to get review summaries
   public query func getReviewSummaries(reviewIds : [Text]) : async Result.Result<ReviewSummary, Text> {
      var cultureRating = 0;
      var seniorManagementRating = 0;
      var workLifeBalanceRating = 0;
      var recommendToFriend = 0;
      var totalReviews = 0;

      for (id in Iter.fromArray(reviewIds)) {
         let data = reviews.get(id);

         switch (data) {
            case (?review) {
               cultureRating += review.cultureRating;
               seniorManagementRating += review.seniorManagementRating;
               workLifeBalanceRating += review.workLifeBalanceRating;
               if (review.recommendToFriend) {
                  recommendToFriend += 1;
               };
               totalReviews += 1;
            };
            case (null) {};
         };
      };

      if (totalReviews == 0) {
         return #err("No reviews found");
      };

      let summary = {
         cultureRating = cultureRating;
         seniorManagementRating = seniorManagementRating;
         workLifeBalanceRating = workLifeBalanceRating;
         recommendToFriend = (recommendToFriend * 100);
         totalReviews = totalReviews;
      };

      return #ok(summary);
   };

    // Function to remove all reviews
   public shared (msg) func removeAllReviews() : async () {

      if (Principal.isAnonymous(msg.caller)) {
         return;
      };

      for (review in reviews.vals()) {
         ignore reviews.remove(review.id);
      };
   };
};
