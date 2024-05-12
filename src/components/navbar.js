import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "../index.css";
import Logo from "../assets/SnTLogo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 33) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full h-[70px] flex justify-between items-center px-4 text-black ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="text-4xl cursor-pointer inline-flex items-center text-black">
        <img className="h-12 w-auto" src={Logo} alt="Logo" />
        <a href="/" smooth={true} duration={500}>
          Property S&T
        </a>
      </div>
      <div className="md:hidden" onClick={handleMenuClick}>
        {showMenu ? (
          <svg
            className="h-6 w-6 text-black cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.95 5.879l-1.414-1.414L10 8.586 6.464 5.05 5.05 6.464 8.586 10l-3.536 3.536 1.414 1.414L10 11.414l3.536 3.536 1.414-1.414L11.414 10l3.536-3.536z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-black cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <ul className="hidden md:flex text-blue-400">
        <li>
          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li>
          <Link to="buy" smooth={true} duration={500}>
            Buy
          </Link>
        </li>
        <li>
          <Link to="sell" smooth={true} duration={500}>
            Sell
          </Link>
        </li>
        <li>
          <Link to="rent" smooth={true} duration={500}>
            Rent
          </Link>
        </li>
        <li>
          <Link to="agent" smooth={true} duration={500}>
            Find Agent
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex">
        <button className="px-4 py-2 bg-white border border-blue-400 text-black rounded-md hover:bg-blue-600 hover:text-white mx-2">
          <a href="login">Login</a>
        </button>
        {/* for testing only */}
        <button className="hidden px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-white mx-2">
          <a href="dbrealhome">Test login</a>
        </button>
      </div>
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } md:hidden flex flex-col bg-blue-800 text-white w-full absolute top-16 left-0 z-10`}
      >
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuClick}
        >
          Home
        </Link>
        <Link
          to="buy"
          smooth={true}
          duration={500}
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuClick}
        >
          Buy
        </Link>
        <Link
          to="sell"
          smooth={true}
          duration={500}
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuClick}
        >
          Sell
        </Link>
        <Link
          to="rent"
          smooth={true}
          duration={500}
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuClick}
        >
          Rent
        </Link>
        <Link
          to="agent"
          smooth={true}
          duration={500}
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleMenuClick}
        >
          Find Agent
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
