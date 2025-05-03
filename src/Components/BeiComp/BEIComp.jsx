import React, { useEffect, useState } from "react";
import { expenseData, incomeData, toSavePercentage } from "../../dymmyData";

const BEIComp = () => {
  const totalExpenses = expenseData.reduce((sum, cur) => sum + cur.amount, 0);
  const totalIncome = incomeData.reduce((sum, cur) => sum + cur.amount, 0);

  const toBeSaved = totalIncome * (toSavePercentage / 100);
  const balance = totalIncome - totalExpenses;

  const [expenseToGoal, setExpenseToGoal] = useState(0);

  useEffect(() => {
    if (toBeSaved > 0) {
      setExpenseToGoal(
        Math.min((totalExpenses / toBeSaved) * 100, 100).toFixed(0)
      ); // Caps at 100%
    }
  }, [totalExpenses]);
  return (
    <div className="flex gap-8">
      <div class="box-border border-none shadow-2xl shadow-green-900 rounded-3xl bg-gradient-to-r from-black via-grey-200 to-green-800 w-lg border-4 p-4 text-amber-200">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-3xl italic">Income</p>
            <p className="text-sm italic">{incomeData.length} transactions</p>
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
            <p className="text-sm italic">{expenseData.length} transactions</p>
            <p className="mt-8 text-2xl italic font-bold">${totalExpenses}</p>
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
            <p className="mt-8 text-2xl italic font-bold">{balance}</p>
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
    </div>
  );
};

export default BEIComp;
