import React, { useEffect, useState } from "react";
import { expenseData, incomeData } from "../../../dymmyData";
import ReactApexChart from "react-apexcharts";

const LineAreaChart = ({ isExpense }) => {
  useEffect(() => {
    setAreaChartData();
  }, [incomeData, expenseData, isExpense]);

  const setAreaChartData = () => {
    const sourceData = isExpense ? expenseData : incomeData;

    // 1. Create paired data points with proper timestamps
    const seriesData = sourceData
      .map((item) => ({
        x: new Date(item.timestamp * 1000), // Convert to milliseconds
        y: item.amount,
      }))
      .sort((a, b) => a.x - b.x); // Sort chronologically

    setAreaState({
      series: [
        {
          name: isExpense ? "Expense" : "Income",
          data: seriesData,
        },
      ],
      options: {
        ...areaState.options,
        colors: [isExpense ? "#eb3434" : "#33cc33"],
        xaxis: {
          ...areaState.options.xaxis,
          type: "date", // Crucial for time series
          labels: {
            ...areaState.options.xaxis.labels,
            datetimeUTC: false, // Important for local time display
            formatter: function (value) {
              return new Date(value).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: isExpense ? undefined : "2-digit",
              });
            },
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy", // Improved tooltip format
          },
        },
      },
    });
  };

  const [areaState, setAreaState] = useState({
    series: [],
    options: {
      chart: {
        height: 150,
        type: "area",
      },
      colors: [],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "date",
        categories: [],
        labels: {
          style: {
            colors: "#ffffff", // White color for all labels
            // OR for multiple colors:
            // colors: ["#ff0000", "#00ff00", ...]
          },
        },
        axisBorder: {
          color: "#ffffff", // Optional: Changes the axis line color
        },
        axisTicks: {
          color: "#ffffff", // Optional: Changes the tick marks color
        },
      },
      yaxis: {
        title: {
          text: "₹ (in rupees)",
          style: {
            color: "#ffffff",
          },
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "10px",
          },
        },
        axisBorder: {
          color: "#ffffff", // Optional: Changes the axis line color
        },
        axisTicks: {
          color: "#ffffff", // Optional: Changes the tick marks color
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  return (
    <div className="w-full col-span-8 bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900 rounded-2xl p-4">
      <div className="flex flex-row gap-4 text-white">
        <div className="pb-2 cursor-pointer text-xl capitalize  ">
          {isExpense ? "expense chart" : "income chart"}
        </div>
      </div>
      <ReactApexChart
        series={areaState.series}
        options={areaState.options}
        type="area"
        height={300}
      />
    </div>
  );
};

export default LineAreaChart;
