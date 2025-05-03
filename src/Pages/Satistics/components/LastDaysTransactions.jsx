import React, { useState } from "react";

const LastDaysTransactions = ({
  isExpense,
  filter,
  setFilter,
  filteredTransActions,
}) => {
  const [isDaysDropdownOpen, setIsDaysDropdownOpen] = useState(false);
  return (
    <div className="col-span-4 w-full  p-4  rounded-2xl bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900">
      <div className="flex flex-row gap-4 justify-between items-center mb-2 text-white">
        <p className="pb-2 cursor-pointer text-xl capitalize  ">
          last {filter} days {isExpense ? "(Expenses)" : "(Incomes)"}
        </p>
        <div className="relative">
          <button
            onClick={() => setIsDaysDropdownOpen(!isDaysDropdownOpen)}
            className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-4 py-1.5 text-center inline-flex items-center"
          >
            filter
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

          {isDaysDropdownOpen && (
            <div className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <p
                    onClick={() => setFilter(7)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    last 7 days
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setFilter(14)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    last 14 days
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setFilter(30)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    last 30 days
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setFilter(60)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    last 60 days
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setFilter(90)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    last 3 months
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 w-full  bg-[#476335] text-white p-2 rounded">
        <div className="col-span-4">title</div>
        <div className="col-span-4">category</div>
        <div className="col-span-4">amount</div>
      </div>
      <div className="flex flex-col overflow-y-auto h-[340px]">
        {filteredTransActions.length > 0 ? (
          filteredTransActions?.map((item) => {
            return (
              <div className="grid grid-cols-12 w-full gap-2   text-white p-2 rounded">
                <div className="col-span-4">{item.title}</div>
                <div className="col-span-4">{item.category}</div>
                <div className="col-span-4">{item.amount}</div>
              </div>
            );
          })
        ) : (
          <p className="text-white col-span-12 text-center">
            no transactions were made{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default LastDaysTransactions;
