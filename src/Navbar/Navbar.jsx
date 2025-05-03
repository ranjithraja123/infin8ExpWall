import React, { useState } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faTableColumns,
  faCashRegister,
  faSquarePollVertical,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-x-hidden overflow-y-auto scrollbar-hide navbar">
      <div className="h-[100%] w-full">
        <div className=" h-full w-full  flex flex-col items-center pt-16">
          <div className="text-5xl pb-14 italic font-bold">
            <h2 className="bg-gradient-to-r from-white via-gray-600 to-yellow-600 bg-clip-text text-transparent">
              exp.wall
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="rounded-full bg-gray-500 w-20 h-20"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjyPJaqjGEjkumCW-YLx8E0LJQuqoCxIIew&s"
              alt="User"
            />
            <h2 className="text-2xl p-2 text-white">Hi, Ranjith</h2>
          </div>
          <div className="relative mt-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Filter
              <svg
                className="w-2.5 h-2.5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      All
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Week
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Month
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Today
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="w-[85%]">
            <ul className="flex flex-col pt-10 w-full">
              <Link
                to="/"
                className="text-white text-xl pt-4 hover:bg-green-700 p-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faTableColumns} /> Dashboard
              </Link>
              <Link
                to="/"
                className="text-white text-xl pt-4 hover:bg-green-700 p-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faWallet} /> Wallet
              </Link>
              <Link
                to="/"
                className="text-white text-xl pt-4 hover:bg-green-700 p-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCashRegister} /> Transactions
              </Link>
              <Link
                to="/statistics"
                className="text-white text-xl pt-4 hover:bg-green-700 p-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSquarePollVertical} /> Statistics
              </Link>
              <Link
                to="/"
                className="text-white text-xl pt-4 hover:bg-green-700 p-4 cursor-pointer"
              >
                <FontAwesomeIcon icon={faGear} /> Settings
              </Link>
            </ul>
          </div>
          <footer className=" w-full text-center py-4 mt-auto  block">
            <h2 className="text-yellow-600 font-semibold cursor-pointer">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </h2>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
