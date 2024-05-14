import React, { useState, useEffect } from "react";
import DBReal from "./dbrealestate";
import { viewRatingController, viewReviewController } from "../../controller";

const Star = ({ filled }) => {
  return (
    <span
      className={`text-2xl ${filled ? "text-yellow-500" : "text-gray-300"}`}
    >
      ★
    </span>
  );
};

const Realrr = () => {
  // delete const rating = 5; once you add your backend its just meant to demo
  const rating = 5;
  /*const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);

   const fetchRating = async () => {
    const ratings = await viewRatingController.getRatings()
    setRatings(ratings)
  }

const fetchReview = async () => {
    const reviews = await viewReviewController.getReviews()
    setReviews(reviews)
  }

  const checkReviewBySameUserID = () => {
    const ratingsAndReviews = [];
  
    ratings.forEach((rating) => {
      const matchedReview = reviews.find((review) => review.reviewByUserID === rating.reviewByUserID);
      if (matchedReview) {
        ratingsAndReviews.push({
          reviewByUserID: rating.reviewByUserID,
          rating: rating.rating,
          review: matchedReview.review,
        });
      }
    });
  
    setRatingsAndReviews(ratingsAndReviews);
  };

  useEffect(() => {
    fetchRating()
    fetchReview()
    checkReviewBySameUserID()
  },[])*/

  {
    /*return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      {ratingsAndReviews.map((ratingAndReview) => (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-300">
          <h1 className="pt-4 pl-8 text-md text-gray-100">
            By User ID:{" "}
            <span id="reviwer">{ratingAndReview.reviewByUserID}</span>
          </h1>
          <div className="flex pl-8">
            <span className="text-gray-100 pt-1">Rating: </span>*/
  }
  {
    /* Replace rating with ur backend data name */
  }
  {
    /*{[...Array(ratingAndReview.rating)].map((_, index) => (
              <Star key={index} filled={true} />
            ))}
          </div>
          <div className="flex justify-center p-2">
            <span className="text-gray-100 pt-1">Review: </span>
            <p className="p-2 w-3/4 bg-white border border-black rounded-sm shadow-md">
              {ratingAndReview.review}
            </p>
          </div>
        </div>
      ))}
    </div>
  );*/
  }

  const [showRate, setShowRate] = useState(true);
  const [showReview, setShowReview] = useState(true);
  const [selectRR, setSelectRR] = useState("");
  //toggle for sold/unsold property
  const toggleRate = () => setShowRate(!showRate);
  const toggleReview = () => setShowReview(!showReview);
  //Handle dropbox for select rate and review
  const handleSelectRR = (e) => {
    const value = e.target.value;
    setSelectRR(value);
    setShowRate(value === "rate");
    setShowReview(value === "review");
  };

  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      {/* Dropbox for Rate and review */}
      <div className="my-3">
        <select
          id="roles"
          value={selectRR}
          onChange={handleSelectRR}
          className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select Rate/Review
          </option>
          <option value="rate" onClick={toggleRate}>
            Rating
          </option>
          <option value="review" onClick={toggleReview}>
            Review
          </option>
        </select>
      </div>
      {/* show Rating */}
      {showRate && (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-700">
          <h1 className="pt-4 pl-8 text-md text-gray-100">
            Name: <span id="reviwer">Grey</span>
          </h1>
          <div className="flex pl-8">
            <span className="mb-2 text-gray-100 pt-1">Rating: </span>
            {/* Replace rating with ur backend data name */}
            {[...Array(rating)].map((_, index) => (
              <Star key={index} filled={true} />
            ))}
          </div>
        </div>
      )}
      {/* show Review */}
      {showReview && (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-700">
          <h1 className="pt-4 pl-8 text-md text-gray-100">
            Name: <span id="reviwer">Grey</span>
          </h1>
          <div className="flex justify-center p-2">
            <p className="p-2 w-3/4 bg-indigo-300 border border-indigo-300 rounded-md shadow-md font-medium">
              Brian Low is a fantastic real estate agent Brian Low is a
              fantastic real estate agent Brian Low is a fantastic real estate
              agent
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RealViewRR = () => {
  return (
    <div id="realviewratereview" className="flex item-start">
      <DBReal />
      <Realrr />
    </div>
  );
};
export default RealViewRR;
