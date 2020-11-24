import React from "react";

import Chart from "react-apexcharts";

const SalesSummary = () => {
  const optionssalesummary = {
    chart: {
      id: "basic-bar",
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#06d79c", "#398bf7"],
    legend: {
      show: false,
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriessalessummry = [
    {
      name: "Site A view",
      data: [0, 5, 6, 8, 25, 9, 8, 24],
    },
    {
      name: "Site B view",
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];

  return (
    <Chart
      options={optionssalesummary}
      series={seriessalessummry}
      type="area"
      height="350"
    />
  );
};

export default SalesSummary;
