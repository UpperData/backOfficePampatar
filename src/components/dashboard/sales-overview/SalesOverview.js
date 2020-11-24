import React from "react";

import Chart from "react-apexcharts";

import { Card, CardBody } from "reactstrap";

const SalesOverview = () => {
  const optionscampaign = {
    chart: {
      id: "basic-bar",
      animations: {
        easing: "easeinout",
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
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    colors: ["#398bf7"],
    stroke: {
      curve: "straight",
      width: "3",
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriescampaign = [
    {
      name: "Sales Overview",
      data: [0, 150, 110, 240, 200, 200, 300, 200, 380, 300, 400, 380],
    },
  ];

  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <h4 className="card-title">Sales Overview </h4>
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
      </CardBody>
      <div className="bg-info stats-bar">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="p-3 active w-100 text-truncate">
              <h6 className="text-white">Total Sales</h6>
              <h3 className="text-white m-b-0">$10,345</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white">This Month</h6>
              <h3 className="text-white m-b-0">$7,589</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white">This Week</h6>
              <h3 className="text-white m-b-0">$1,476</h3>
            </div>
          </div>
        </div>
      </div>
      <CardBody>
        <div className="mt-4">
          <div className="">
            <Chart
              options={optionscampaign}
              series={seriescampaign}
              type="line"
              height="250"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesOverview;
