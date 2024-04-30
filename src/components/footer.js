import React from "react";
//import { Link } from 'react-scroll';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <div className="text-xl text-white font-bold hover:text-gray-300 cursor-pointer">
              Property S&T
            </div>
          </div> 
        </nav>
          <div className="text-center">
            <h3 className="text-white text-lg font-medium mb-4">Social links</h3>
            <ul className="text-white">
              <li className="mb-2">Facebook</li>
              <li className="mb-2">Instagram</li>
              <li className="mb-2">LinkenIn</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <p className="text-base text-white">&copy; {new Date().getFullYear()} S&T Property. All rights reserved.</p>
        </div>
    </footer>
  );
};
export default Footer;