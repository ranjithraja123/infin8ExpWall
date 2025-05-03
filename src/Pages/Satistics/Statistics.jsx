import React, { useEffect, useState } from "react";
import { expenseData, incomeData, toSavePercentage } from "../../dymmyData";
import ReactApexChart from "react-apexcharts";
import "./statistics.css";
import { use } from "react";
import { MonthlyBarChart } from "./components/MonthlyBarChart";
import TCBarChart from "./components/TCBarChart";
import LineAreaChart from "./components/LineAreaChart";
import PieChartCategory from "./components/PieChartCategory";
import TopFive from "./components/TopFive";
import LastDaysTransactions from "./components/LastDaysTransactions";

const Statistics = () => {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);

  const totalExpenses = expenseData.reduce((sum, cur) => sum + cur.amount, 0);
  const totalIncome = incomeData.reduce((sum, cur) => sum + cur.amount, 0);

  const toBeSaved = totalIncome * (toSavePercentage / 100);
  const balance = totalIncome - totalExpenses;

  const [expenseToGoal, setExpenseToGoal] = useState(0);
  const [isExpense, setIsExpense] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [filter, setFilter] = useState(30);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function getRecentTransactions() {
    const data = isExpense ? expenseData : incomeData;
    const cutoff = Math.floor(Date.now() / 1000) - filter * 86400;

    return data.filter((item) => item.timestamp >= cutoff);
  }

  useEffect(() => {
    if (toBeSaved > 0) {
      setExpenseToGoal(
        Math.min((totalExpenses / toBeSaved) * 100, 100).toFixed(0)
      ); // Caps at 100%
    }
  }, [totalExpenses, incomeData, expenseData]);

  const setupCategoryData = () => {
    if (isExpense) {
      setCategoryData(
        expenseData.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
          return acc;
        }, {})
      );
    } else {
      setCategoryData(
        incomeData.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
          return acc;
        }, {})
      );
    }
  };

  // const categoryPercentageData = Object.keys(categoryData).reduce(
  //   (acc, category) => {
  //     acc[category] = ((categoryData[category] / totalExpenses) * 100).toFixed(
  //       0
  //     );
  //     return acc;
  //   },
  //   {}
  // );

  const filteredTransActions = getRecentTransactions();

  useEffect(() => {
    setupCategoryData();
  }, [expenseData, isExpense, incomeData]);

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="w-full">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            {isExpense ? "Expense" : "Income"}
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
                  <p
                    onClick={() => setIsExpense(true)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Expense
                  </p>
                </li>
                <li>
                  <p
                    onClick={() => setIsExpense(false)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Income
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <LineAreaChart isExpense={isExpense} />
        {/* pie donut  */}
        <PieChartCategory isExpense={isExpense} categoryData={categoryData} />
        {/* last transactions */}
        <LastDaysTransactions
          filter={filter}
          setFilter={setFilter}
          isExpense={isExpense}
          filteredTransActions={filteredTransActions}
        />

        {/* top category bar chart*/}
        <TCBarChart isExpense={isExpense} categoryData={categoryData} />

        {/* monthly bar chart */}

        <MonthlyBarChart isExpense={isExpense} />

        {/* top five */}
        <TopFive isExpense={isExpense} />

        {/* <div className="hidden col-span-12 gap-8  rounded-2xl">
          <div class="box-border border-none shadow-2xl shadow-green-900 rounded-3xl bg-gradient-to-r from-black via-grey-200 to-green-800 w-lg border-4 p-4 text-amber-200">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-3xl italic">Income</p>
                <p className="text-sm italic">
                  {incomeData.length} transactions
                </p>
                <p className="mt-8 text-2xl italic font-bold">${totalIncome}</p>
              </div>
              <div>
                <div class=" flex items-center justify-center box-border rounded-full size-30 border-1 p-4">
                  <p className="text-4xl">72%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="box-border border-none shadow-2xl shadow-green-900 rounded-3xl bg-gradient-to-r from-black via-grey-200 to-green-800 w-lg border-4 p-4 text-amber-200">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-3xl italic">Expense</p>
                <p className="text-sm italic">
                  {expenseData.length} transactions
                </p>
                <p className="mt-8 text-2xl italic font-bold">
                  ${totalExpenses}
                </p>
              </div>
              <div>
                <div class=" flex items-center justify-center box-border rounded-full size-30 border-1 p-4">
                  <p className="text-4xl">{expenseToGoal}%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="box-border border-none shadow-2xl shadow-green-900 rounded-3xl bg-gradient-to-r from-black via-grey-200 to-green-800 w-lg border-4 p-4 text-amber-200">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-3xl italic">Balance</p>
                <p className="text-sm italic">15 transactions</p>
                <p className="mt-8 text-2xl italic font-bold">${balance}</p>
              </div>
              <div>
                <div class=" flex items-center justify-center box-border rounded-full size-30 border-1 p-4">
                  <p className="text-4xl">
                    {(100 - (totalExpenses / totalIncome) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Statistics;
