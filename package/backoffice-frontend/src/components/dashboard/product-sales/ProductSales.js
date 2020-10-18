import React from "react";

import Chart from "react-apexcharts";

import { Card, CardBody } from "reactstrap";

const ProductSales = () => {
  const optionsproduct = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40px",
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#398bf7", "rgba(57, 139, 247, 0.8)", "rgba(57, 139, 247, 0.4)"],
    tooltip: {
      theme: "dark",
    },
  };
  const seriesproduct = [
    {
      name: "Sales A",
      data: [44, 55, 41, 67, 22, 43, 27, 45, 15, 44, 30, 15],
    },
    {
      name: "Sales B",
      data: [13, 23, 20, 8, 13, 27, 23, 20, 8, 13, 27, 50],
    },
    {
      name: "Sales C",
      data: [11, 17, 15, 15, 21, 14, 17, 15, 15, 21, 14, 55],
    },
  ];

  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <CardBody className="pb-0">
        <div className="d-flex">
          <div>
            <h4 className="card-title">Product Sales </h4>
          </div>
          <div className="ml-auto">
            <select className="custom-select">
              <option value="0">January 2017</option>
              <option value="1">February 2017</option>
              <option value="2">March 2017</option>
              <option value="3">April 2017</option>
            </select>
          </div>
        </div>
        <Chart
          options={optionsproduct}
          series={seriesproduct}
          type="bar"
          height="300"
        />
      </CardBody>
      <div className="">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="p-3 w-100 text-truncate">
              <h6 className="">Total Sales</h6>
              <h3 className=" m-b-0">$10,345</h3>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-3 w-100 text-truncate">
              <h6 className="">This Month</h6>
              <h3 className=" m-b-0">$7,589</h3>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-3 w-100 text-truncate">
              <h6 className="">This Week</h6>
              <h3 className=" m-b-0">$1,476</h3>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductSales;
