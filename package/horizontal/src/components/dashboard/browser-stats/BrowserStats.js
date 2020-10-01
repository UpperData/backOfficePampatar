import React from "react";
import { Card, CardBody } from "reactstrap";

import chrome from "../../../assets/images/browser/chrome-logo.png";
import firefox from "../../../assets/images/browser/firefox-logo.png";
import safari from "../../../assets/images/browser/safari-logo.png";
import ie from "../../../assets/images/browser/internet-logo.png";
import opera from "../../../assets/images/browser/opera-logo.png";
import edge from "../../../assets/images/browser/internet-logo.png";

import BrowseData from "./BrowseData";

const BrowserStats = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 and Widget Page                                            */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <CardBody>
        <h4 className="mb-4">Browser Stats</h4>
        <BrowseData image={chrome} content="Google Chrome" badge="23%" />
        <BrowseData image={firefox} content="Mozila Firefox" badge="12%" />
        <BrowseData image={safari} content="Apple Safari" badge="25%" />
        <BrowseData image={ie} content="Internet Explorer" badge="13%" />
        <BrowseData image={opera} content="Opera mini" badge="03%" />
        <BrowseData image={edge} content="Microsoft edge" badge="73%" />
      </CardBody>
    </Card>
  );
};

export default BrowserStats;
