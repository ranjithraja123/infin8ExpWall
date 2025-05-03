import React, { useEffect, useState } from "react";
import { expenseData, incomeData } from "../../../dymmyData";
import ReactApexChart from "react-apexcharts";

const TCBarChart = ({ isExpense, categoryData }) => {
  useEffect(() => {
    setBarChartData();
  }, [categoryData, incomeData, expenseData, isExpense]);

  const setBarChartData = () => {
    const sortedData = Object.entries(categoryData)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({
        x: key,
        y: value,
      }));

    setBarChartState((prev) => ({
      ...prev,
      series: [
        {
          name: "Expenses",
          data: sortedData,
        },
      ],
      options: {
        ...prev.options,
        title: {
          text: `${isExpense ? "Expenses" : "incomes"}`,
          align: "center",
          style: {
            fontSize: "18px",
            color: "#fff",
          },
        },
        colors: [isExpense ? "#eb3434" : "#33cc33"],
      },
    }));
  };

  const [barChartState, setBarChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false, // Hide download/zoom tools
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "70%", // Thicker bars
          borderRadius: 4, // Rounded corners
          dataLabels: {
            position: "center", // Center labels inside bars
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#fff"], // White text for better contrast
        },
        formatter: (val) => `₹${val}`, // Show currency
      },
      xaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: ["#fff"],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: 500,
            colors: ["#fff"],
          },
        },
      },

      grid: {
        borderColor: "#f1f1f100",
      },
    },
  });

  return (
    <div className="col-span-8 w-full  p-4  rounded-2xl bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900">
      <div className="flex flex-row gap-4 text-white">
        <p className="pb-2 cursor-pointer text-xl capitalize  ">top category</p>
      </div>
      <ReactApexChart
        series={barChartState.series}
        options={barChartState.options}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default TCBarChart;
