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
import User "canister:HireVerse_backend";
import Vector "mo:vector/Class";
import Company "canister:HireVerse_company";
import Fuzz "mo:fuzz";

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
   public shared (msg) func deleteReview(reviewId : Text) : async Result.Result<?Review, Text> {

      if (Principal.isAnonymous(msg.caller)) {
         return #err("You must be logged in to delete a review");
      };

      let review : ?Review = reviews.get(reviewId);

      switch (review) {
         case (null) {
            return #err("Review not found");
         };
         case (?r) {
            if (r.userId != Principal.toText(msg.caller)) {
               return #err("You are not authorized to delete this review");
            };

            ignore reviews.remove(r.id);

            // ignore await Company.removeReviewFromCompany(r.companyId r.id);
         };
      };

      return #ok(review);
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

   // Add a review to a company
    public shared (msg) func addReview(newReview : CreateReviewInput) : async Result.Result<(), Text> {
        let user_id = msg.caller;

        if (Principal.isAnonymous(user_id)) {
            return #err("Not authorized");
        };

        let company = await Company.getCompany(newReview.companyId);

        switch (company) {
            case (#err(msg)) {
                return #err("Company not found");
            };
            case (#ok(company)) {
                let reviews_ids = company.reviews_ids;

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
               ignore await Company.addReviewToCompany(review.companyId, review.id);
               return #ok();
            };
        };
    };


   
   public shared (msg) func seed_reviews() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Not authorized");
      };

      let response = await User.getAllUsers();

      var userIds = Vector.Vector<Principal>();

      switch(response) {
         case (#err(e)) {};
         case (#ok(users)) {
            for (user in Iter.fromArray(users)) {
               userIds.add(user.internet_identity);
            }
         }
      };

      let companies = await Company.getCompanies();

      var companyIds = Vector.Vector<Text>();

      switch(companies) {
         case (#err(e)) {};
         case (#ok(companies)) {
            for (company in Iter.fromArray(companies)) {
               companyIds.add(company.id);
            }
         }
      };

      let fuzz = Fuzz.Fuzz();

      var companyCount = 0;
      for (company in Iter.fromArray(Vector.toArray(companyIds))) {

         var userCount = 0;
         for (user in Iter.fromArray(Vector.toArray(userIds))) {
            let id = await Helper.generateUUID();

            let review = {
               id = id;
               userId = Principal.toText(user);
               title = fuzz.text.randomText(fuzz.nat.randomRange(5, 30));
               isAnonymous = fuzz.bool.random();
               cultureRating = fuzz.nat.randomRange(1, 5);
               seniorManagementRating = fuzz.nat.randomRange(1, 5);
               workLifeBalanceRating = fuzz.nat.randomRange(1, 5);
               recommendToFriend = fuzz.bool.random();
               generalComments = fuzz.text.randomText(fuzz.nat.randomRange(25, 300));
               pros = fuzz.array.randomArray(fuzz.nat.randomRange(1, 5), func() : Text {
                  return fuzz.text.randomText(fuzz.nat.randomRange(5, 50));
               });
               cons = fuzz.array.randomArray(fuzz.nat.randomRange(1, 5), func() : Text {
                  return fuzz.text.randomText(fuzz.nat.randomRange(5, 50));
               });
               companyId = company;
               timestamp = Time.now();
            };

            reviews.put(review.id, review);
            ignore await Company.addReviewToCompany(review.companyId, review.id);   
            userCount += 1;

            Debug.print("Seeding " # Nat.toText(userCount) # "reviews out of " # Nat.toText(userIds.size()) # " for company " # Nat.toText(companyCount) # " out of " # Nat.toText(companyIds.size()));
         };

         companyCount += 1;
      };



      return #ok("Reviews seeded");
   };

   public shared (msg) func clean_reviews() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Not authorized");
      };

      for (review in reviews.vals()) {
         ignore reviews.remove(review.id);
      };

      return #ok("Reviews cleaned");
   };
};
