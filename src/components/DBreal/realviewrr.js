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
  const [ratings, setRatings] = useState([])
  const [reviews, setReviews] = useState([])
  const [ratingsAndReviews, setRatingsAndReviews] = useState([])

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
  },[])

  

  return (
    <div className="flex flex-col w-3/4 bg-gray-200 p-8 justify-start">
      {ratingsAndReviews.map((ratingAndReview) => (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-300">
        <h1 className="pt-4 pl-8 text-md text-gray-100">
          By User ID: <span id="reviwer">{ratingAndReview.reviewByUserID}</span>
        </h1>
        <div className="flex pl-8">
          <span className="text-gray-100 pt-1">Rating: </span>
          {/* Replace rating with ur backend data name */}
          {[...Array(ratingAndReview.rating)].map((_, index) => (
            <Star key={index} filled={true} />
          ))}
        </div>
        <div className="flex justify-center p-2">
        <span className="text-gray-100 pt-1">Review: </span>
          <p className="p-2 w-3/4 bg-white border border-black rounded-sm shadow-md">{ratingAndReview.review}</p>
        </div>
      </div>
      ))}
    </div>
  );
};

const RealViewRR = () => {
  return (
    <div id="dbhome" className="flex item-start">
      <DBReal />
      <Realrr />
    </div>
  );
};
export default RealViewRR;
