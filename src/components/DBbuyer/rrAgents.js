import React,{useState} from 'react';
import Modal from 'react-modal';
import DashboardBuyer from './dbbuyer';
import agent1 from "../../assets/Brian.jpeg";

const Rating = () => {
  const [rating, setRating] = useState(0); // state for rating

  // handle rating onclick
  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          className={`${
            value <= rating ? 'text-yellow-300' : 'text-gray-300'
          } focus:outline-none text-2xl`}
          onClick={() => handleClick(value)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const RateReviewAgents = () => {
  const [isOpen, setIsOpen] = useState(false); // state for modal
  const [review, setReview] = useState(''); //state for modal review
  const [revieww, setRevieww] = useState(''); //state for modal review
  const [rate, setRate] = useState(''); //state for modal rate
  const [showRate, setShowRate] = useState(false); // state for rate
  const [showReview, setShowReview] = useState(false); //state for review
  //const [rating, setRating] = useState(''); //state for rating

  const openModal = () => setIsOpen(true); // open modal
  const closeModal = () => setIsOpen(false); // close modal

  const toggleRate = () => setShowRate(!showRate); // toggle rate
  const toggleReview = () => setShowReview(!showReview); // toggle review

  // handle if dropbox choose rate or review to show
  const handleReview = (e) => {
    const value = e.target.value;
    setReview(value);
    setShowRate(value === 'rate');
    setShowReview(value === 'review');
};

// handle review
const handleSubmitReview = (e) => {
  e.preventDefault();
  console.log('Review:', revieww);
  setRevieww('');
}

// handle rate
const handleSubmitRate = (e) => {
  e.preventDefault();
  console.log('Rate:', rate);
  setRate('');
}

  return(
    <div className="p-4 min-h-screen w-3/4 overflow-x-auto">
      <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={agent1} alt="agent1"/>
          <div className="px-6 py-4">
             <div className="font-bold text-xl mb-2">Brian</div>
                <p className="text-gray-700 text-base">
                  Featured Condo Agents
                  </p>
            </div>
            <button className="m-2 p-2 whitespace-nowrap border border-blue-400 rounded-md text-sm font-medium hover:border-blue-600 hover:text-blue-600" onClick={openModal}>
               Rate/Review</button>
               <Modal isOpen={isOpen} onRequestClose={closeModal} className="block p-2 w-1/2 mx-auto bg-gray-600">
                <div className='flex p-3 mb-5 border-b-4 justify-evenly align-middle text-white'>Select Changes</div> {/* header*/}
                <div className="mt-4 mb-3">
                  <label htmlFor="roles" className="block mb-4 text-sm font-medium text-white">Select Changes</label>
                  <select id="roles" value={review} onChange={handleReview} className="mb-3 block w-full px-3 py-2 border rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>Select changes</option>
                    <option value="review" onClick={toggleReview}>Review</option>
                    <option value="rate" onClick={toggleRate}>Rate</option>
                    </select>
                    {/* show review */}
                    {showReview && (
                    <form onSubmit={handleSubmitReview}>
                      <div className="my-4 border-b-2">
                        <textarea id="Review" placeholder='Review' className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                        </div>
                        </form>
                    )}
                    {/* show rate */}
                    {showRate && (
                    <form onSubmit={handleSubmitRate}>
                      <div className="my-4 border-b-2">
                        <h1 id="Rate" className="text-2x1 text-white font-bold mt-2">Overall Rating</h1>
                        <Rating />
                        </div>
                        </form>
                    )}
                  </div>
                  <button className='p-3 mr-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300' onClick={closeModal}>Close</button>
                  <button type='submit' className='p-3 mx-2 border border-white text-white text-sm rounded-md hover:cursor-pointer hover:bg-blue-300'>Send</button>
                </Modal>
        </div>
    </div>

  );
};

const viewRRBAgent = () => {
  
    return (
      <div id='viewA' className='flex'>
        <DashboardBuyer/>
        <RateReviewAgents/>
      </div>
    );
  };
export default viewRRBAgent;