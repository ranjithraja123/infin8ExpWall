import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { expenseData, incomeData } from "../../../dymmyData";

const PieChartCategory = ({ categoryData, isExpense }) => {
  const [pieState, setPieState] = useState({
    series: [],
    options: {
      chart: { type: "donut", height: 350, width: 500 },
      labels: [],
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(0)}%`,
        style: {
          fontSize: "20px", // Larger percentage text
          fontWeight: "bold",
          fontFamily: "Arial",
        },
      },
      plotOptions: { pie: { donut: { size: "50%" } } },
      colors: ["#FF4560", "#775DD0", "#00E396", "#FEB019", "#008FFB"],
      legend: {
        enabled: false,
        position: "bottom",
        fontSize: "10px", // Legend text size
        labels: {
          colors: "#ffffff", // Legend text color
        },
      },
    },
  });

  const setPieCategoryData = () => {
    setPieState({
      series: Object.values(categoryData),
      options: {
        ...pieState.options,
        labels: Object.keys(categoryData),
      },
    });
  };

  useEffect(() => {
    setPieCategoryData();
  }, [categoryData, incomeData, expenseData, isExpense]);

  return (
    <div className="col-span-4  rounded-2xl p-4 bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900">
      <div className="flex flex-row gap-4 text-white">
        <p className="pb-2 cursor-pointer text-xl capitalize  ">
          category wise {isExpense ? "Spending" : "Income"}
        </p>
      </div>
      <ReactApexChart
        series={pieState.series}
        options={pieState.options}
        type="donut"
        height={300}
      />
    </div>
  );
};

export default PieChartCategory;
