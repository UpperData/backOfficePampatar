import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  SalesSummary,
  Stats,
  Stats2,
  TaskList,
  RecentComment,
  Chat,
  UserProfile,
  BlogPost,
  Feeds,
  Projects,
  Activity,
  SalesOverview,
  Visits,
  CardContact,
} from "../../components/dashboard";

import img1 from "../../assets/images/users/1.jpg";
import img4 from "../../assets/images/users/4.jpg";
import img5 from "../../assets/images/users/5.jpg";

const Analytical = () => {
  return (
    <div>
      <Stats2 />
      <Row>
        <Col sm={12} lg={9}>
          <SalesOverview />
        </Col>
        <Col sm={12} lg={3}>
          <Visits />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          <Projects />
        </Col>
        <Col sm={12} lg={6}>
          <Activity />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <BlogPost />
        </Col>
        <Col md="8">
          <Card>
            <span className="lstick"></span>
            <CardBody>
              <div className="d-md-flex align-items-center">
                <div>
                  <h4 className="card-title">Website Visit</h4>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  <ul className="list-inline mb-0 ml-auto">
                    <li className="list-inline-item mr-3">
                      <h6 className="text-success">
                        <i className="fa fa-circle font-10 mr-2 "></i>Site A
                        view
                      </h6>{" "}
                    </li>
                    <li className="list-inline-item">
                      <h6 className="text-info">
                        <i className="fa fa-circle font-10 mr-2"></i>Site B view
                      </h6>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-4">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary shadow-sm"
                  >
                    PAGEVIEWS
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary shadow-sm"
                  >
                    REFERRALS
                  </button>
                </div>
              </div>
              <div className="campaign ct-charts mt-5">
                <div
                  className="chart-wrapper"
                  style={{ width: "100%", margin: "0 auto", height: 330 }}
                >
                  <SalesSummary />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Stats />
      <Row>
        <Col lg={6}>
          <TaskList />
        </Col>
        <Col lg={6}>
          <UserProfile />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <CardContact />
        </Col>
        <Col lg={6}>
          <Feeds />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card>
            <span className="lstick"></span>
            <CardBody>
              <h4 className="card-title">Recent Comments</h4>
            </CardBody>
            <div
              className="comment-widgets scrollable"
              style={{ height: "550px" }}
            >
              <PerfectScrollbar>
                <RecentComment
                  image={img1}
                  badge="Pending"
                  badgeColor="primary"
                  name="James Anderson"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img4}
                  badge="Approved"
                  badgeColor="success"
                  name="Michael Jorden"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img5}
                  badge="Rejected"
                  badgeColor="danger"
                  name="Johnathan Doeting"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img1}
                  badge="Pending"
                  badgeColor="primary"
                  name="James Anderson"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img4}
                  badge="Approved"
                  badgeColor="success"
                  name="Michael Jorden"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
              </PerfectScrollbar>
            </div>
          </Card>
        </Col>
        <Col lg={6}>
          <Chat />
        </Col>
      </Row>
    </div>
  );
};

export default Analytical;
