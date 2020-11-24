import React from "react";
import { Card, CardBody } from "reactstrap";

import img1 from "../../../assets/images/users/1.jpg";
import img2 from "../../../assets/images/users/2.jpg";
import img3 from "../../../assets/images/users/3.jpg";
import img4 from "../../../assets/images/big/img1.jpg";
import img5 from "../../../assets/images/big/img2.jpg";
import icon from "../../../assets/images/icons/zip.png";

const Activity = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <span className="lstick"></span>
      <div className="activity-box">
        <CardBody>
          <h4 className="card-title">Activity</h4>
          <div className="activity-item mt-5">
            <div className="round mr-3">
              <img src={img1} alt="user" width="50" />
            </div>
            <div className="mt-2">
              <h5 className="mb-0 font-medium">
                Mark Freeman{" "}
                <span className="text-muted font-14 ml-2">
                  | &nbsp; 6:30 PM
                </span>
              </h5>
              <h6 className="text-muted">uploaded this file </h6>
              <table className="table vm border-0 mb-0">
                <tbody>
                  <tr>
                    <td className="mr-2 border-0">
                      <img src={icon} alt="user" />
                    </td>
                    <td className="border-0">
                      <h5 className="mb-0 font-medium ">Homepage.zip</h5>
                      <h6>54 MB</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="activity-item">
            <div className="round mr-3">
              <img src={img2} alt="user" width="50" />
            </div>
            <div className="mt-2">
              <h5 className="mb-1 font-medium">
                Emma Smith{" "}
                <span className="text-muted font-14 ml-2">
                  | &nbsp; 6:30 PM
                </span>
              </h5>
              <h6 className="text-muted">
                joined projectname, and invited{" "}
                <a href="/">
                  @maxcage, @maxcage, @maxcage, @maxcage,
                  <br /> @maxcage,+3
                </a>
              </h6>
              <span className="image-list mt-3">
                <a href="/">
                  <img
                    src={img1}
                    className="rounded-circle"
                    alt="user"
                    width="50"
                  />
                </a>
                <a href="/">
                  <img
                    src={img2}
                    className="rounded-circle"
                    alt="user"
                    width="50"
                  />
                </a>
                <a href="/">
                  <span className="round round-warning">C</span>
                </a>
                <a href="/">
                  <span className="round round-danger">D</span>
                </a>
                <a href="/">+3</a>
              </span>
            </div>
          </div>
          <div className="activity-item">
            <div className="round mr-3">
              <img src={img3} alt="user" width="50" />
            </div>
            <div className="mt-2">
              <h5 className="mb-0 font-medium">
                David R. Jones{" "}
                <span className="text-muted font-14 ml-2">
                  | &nbsp; 9:30 PM, July 13th
                </span>
              </h5>
              <h6 className="text-muted">uploaded this file </h6>
              <span>
                <a href="/" className="mr-2">
                  <img src={img4} alt="user" width="60" />
                </a>
                <a href="/" className="mr-2">
                  <img src={img5} alt="user" width="60" />
                </a>
              </span>
            </div>
          </div>
          <div className="activity-item mb-3">
            <div className="round mr-3">
              <img src={img1} alt="user" width="50" />
            </div>
            <div className="mt-2">
              <h5 className="font-medium">
                David R. Jones{" "}
                <span className="text-muted font-14 ml-2">
                  | &nbsp; 6:30 PM
                </span>
              </h5>
              <h6 className="text-muted">
                Commented on<a href="/">Test Project</a>
              </h6>
              <p className="mb-0">
                It has survived not only five centuries, but also the leap into
                electrotypesetting, remaining unchanged.
              </p>
            </div>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default Activity;
