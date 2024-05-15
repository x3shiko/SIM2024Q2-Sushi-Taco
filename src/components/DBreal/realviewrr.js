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
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchRating = async () => {
    const ratings = await viewRatingController.getRatings();
    setRatings(ratings);
  };

  const fetchReview = async () => {
    const reviews = await viewReviewController.getReviews();
    setReviews(reviews);
  };

  useEffect(() => {
    fetchRating();
    fetchReview();
  }, []);

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
      {showRate && ratings.map((rating) => (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-700">
          <h1 className="pt-4 pl-8 text-md text-gray-100">
            By User ID: <span id="reviwer">{rating.reviewByUserID}</span>
          </h1>
          <div className="flex pl-8">
            <span className="mb-2 text-gray-100 pt-1">Rating: </span>
            {/* Replace rating with ur backend data name */}
            {[...Array(rating.rating)].map((_, index) => (
              <Star key={index} filled={true} />
            ))}
          </div>
        </div>
      ))}
      {/* show Review */}
      {showReview && reviews.map((review) => (
        <div className="container w-full border border-black rounded-md shadow-md bg-indigo-700">
          <h1 className="pt-4 pl-8 text-md text-gray-100">
            By User ID: <span id="reviwer">{review.reviewByUserID}</span>
          </h1>
          <div className="flex justify-center p-2">
            <p className="p-2 w-3/4 bg-indigo-300 border border-indigo-300 rounded-md shadow-md font-medium">
              {review.review}
            </p>
          </div>
        </div>
      ))}
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
