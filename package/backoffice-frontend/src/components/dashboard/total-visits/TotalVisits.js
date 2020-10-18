import React from "react";
import { VectorMap } from "react-jvectormap";
import { Card, CardBody } from "reactstrap";

import "../../../views/maps/VectorMap.css";

var mapData = {
  FR: 540,
  AU: 360,
  GB: 690,
  GE: 200,
  IN: 400,
  RO: 600,
  RU: 300,
  US: 2920,
};

const TotalVisits = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <CardBody>
        <h4 className="mb-4">Total Visits</h4>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "360px",
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "transparent",
              "fill-opacity": 0.9,
              stroke: "#67757c",
              "stroke-width": 1,
              "stroke-opacity": 0.5,
            },
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ["#f6f6f6", "#fafafa"],
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
};

export default TotalVisits;
