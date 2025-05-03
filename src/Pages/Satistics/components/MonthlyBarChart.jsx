import ReactApexChart from "react-apexcharts";
import { expenseData, incomeData } from "../../../dymmyData";
import React, { useEffect, useState } from "react";

export const MonthlyBarChart = ({ isExpense }) => {
  const type = isExpense ? "Expense" : "Income";

  const processMonthlyData = () => {
    const monthlyData = {};

    const typedData = isExpense ? expenseData : incomeData;

    // Process expenses (negative amounts)
    typedData.forEach((item) => {
      const date = new Date(item.timestamp * 1000);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }

      if (isExpense) {
        monthlyData[monthKey].expense += item.amount;
      } else {
        monthlyData[monthKey].income += item.amount;
      }
    });

    const sortedMonths = Object.keys(monthlyData).sort();

    return {
      categories: sortedMonths.map((month) => {
        const [year, monthNum] = month.split("-");
        return new Date(year, monthNum - 1).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }),
      income: sortedMonths.map((month) => monthlyData[month].income),
      expense: sortedMonths.map((month) => monthlyData[month].expense),
    };
  };

  const [chartData, setChartData] = useState({
    series: [{ name: isExpense ? "Expense" : "Income", data: [] }],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: { show: false },
      }, // Green for income, red for expense
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          borderRadius: 4,
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: 1, colors: ["transparent"] },
      xaxis: {
        categories: [],
        labels: { style: { colors: "#ffffff" } },
        axisBorder: { color: "#ffffff" },
        axisTicks: { color: "#ffffff" },
      },
      yaxis: {
        title: {
          text: "Amount (₹)",
          style: { color: "#ffffff" },
        },
        labels: {
          style: { colors: "#ffffff" },
          formatter: (val) => `₹${val.toLocaleString("en-IN")}`,
        },
      },
      tooltip: {
        y: { formatter: (val) => `₹${val.toLocaleString("en-IN")}` },
      },
      legend: {
        labels: { colors: "#ffffff" },
        position: "top",
      },
      grid: {
        borderColor: "#444",
      },
    },
  });

  useEffect(() => {
    const processed = processMonthlyData();
    console.log(processed);
    setChartData((prev) => ({
      ...prev,
      series: [
        {
          name: isExpense ? "Expense" : "Income",
          data: isExpense ? processed.expense : processed.income,
        },
      ],
      options: {
        ...prev.options,
        colors: isExpense ? ["#F44336"] : ["#4CAF50"],
        xaxis: {
          ...prev.options.xaxis,
          categories: processed.categories,
        },
      },
    }));
  }, [expenseData, incomeData, isExpense]);

  return (
    <div className="col-span-8 w-full  p-4  rounded-2xl bg-gradient-to-r from-black via-gray-800 to-green-800 shadow-2xl shadow-green-900">
      <div className="flex flex-row gap-4 text-white">
        <p className="pb-2 cursor-pointer text-xl capitalize  ">
          Monthly transactions
        </p>
      </div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};
