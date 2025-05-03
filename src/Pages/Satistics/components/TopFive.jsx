import React from "react";
import { expenseData, incomeData } from "../../../dymmyData";

const TopFive = ({ isExpense }) => {
  return (
    <div className="col-span-4 w-full  p-4  rounded-2xl bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900">
      <div className="flex flex-row gap-4 text-white">
        <p className="pb-2 cursor-pointer text-xl capitalize  ">
          top 5 transactions {isExpense ? "(Expenses)" : "(Incomes)"}
        </p>
      </div>
      <div className="grid grid-cols-12 w-full  bg-[#476335] text-white p-2 rounded">
        <div className="col-span-4">title</div>
        <div className="col-span-4">category</div>
        <div className="col-span-4">amount</div>
      </div>
      {isExpense
        ? expenseData
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map((item) => {
              return (
                <div className="grid grid-cols-12 w-full gap-2   text-white p-2 rounded">
                  <div className="col-span-4">{item.title}</div>
                  <div className="col-span-4">{item.category}</div>
                  <div className="col-span-4">{item.amount}</div>
                </div>
              );
            })
        : incomeData
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map((item) => {
              return (
                <div className="grid grid-cols-12 w-full gap-2   text-white p-2 rounded">
                  <div className="col-span-4">{item.title}</div>
                  <div className="col-span-4">{item.category}</div>
                  <div className="col-span-4">{item.amount}</div>
                </div>
              );
            })}
      <div className=""></div>
    </div>
  );
};

export default TopFive;
