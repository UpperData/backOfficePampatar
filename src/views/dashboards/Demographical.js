import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Visits,
  SalesOverview,
  Projects,
  Activity,
  RecentComment,
  Chat,
  StatsVertical,
  SalesSummary,
  BlogPost,
} from "../../components/dashboard";

import { Card, CardBody, Col, Row } from "reactstrap";

import img1 from "../../assets/images/icons/income-w.png";
import img2 from "../../assets/images/icons/expense-w.png";
import img3 from "../../assets/images/icons/assets-w.png";
import img4 from "../../assets/images/icons/staff-w.png";
import img5 from "../../assets/images/users/1.jpg";
import img6 from "../../assets/images/users/4.jpg";
import img7 from "../../assets/images/users/5.jpg";

const Demographical = () => {
  return (
    <div>
      <Row>
        <Col sm={12} md={6} lg={3}>
          <Card className="bg-info">
            <CardBody>
              <div className="d-flex">
                <div className="mr-3 align-self-center">
                  <img src={img1} alt="income" />
                </div>
                <div className="align-self-center">
                  <h6 className="text-white mt-2 mb-0">Total Income</h6>
                  <h2 className="mt-0 text-white">953,000</h2>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Card className="bg-success">
            <CardBody>
              <div className="d-flex">
                <div className="mr-3 align-self-center">
                  <img src={img2} alt="expense" />
                </div>
                <div className="align-self-center">
                  <h6 className="text-white mt-2 mb-0">Total Expense</h6>
                  <h2 className="mt-0 text-white">953,000</h2>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Card className="bg-primary">
            <CardBody>
              <div className="d-flex">
                <div className="mr-3 align-self-center">
                  <img src={img3} alt="assets" />
                </div>
                <div className="align-self-center">
                  <h6 className="text-white mt-2 mb-0">Total Assets</h6>
                  <h2 className="mt-0 text-white">953,000</h2>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={3}>
          <Card className="bg-danger">
            <CardBody>
              <div className="d-flex">
                <div className="mr-3 align-self-center">
                  <img src={img4} alt="staff" />
                </div>
                <div className="align-self-center">
                  <h6 className="text-white mt-2 mb-0">Total Staff</h6>
                  <h2 className="mt-0 text-white">953,000</h2>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          <SalesOverview />
        </Col>
        <Col sm={12} lg={3}>
          <BlogPost />
        </Col>
        <Col sm={12} lg={3}>
          <Visits />
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={4}>
          <StatsVertical />
        </Col>
        <Col sm={12} lg={8}>
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
                  style={{ width: "100%", margin: "0 auto", height: 390 }}
                >
                  <SalesSummary />
                </div>
              </div>
            </CardBody>
          </Card>
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
                  image={img5}
                  badge="Pending"
                  badgeColor="primary"
                  name="James Anderson"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img6}
                  badge="Approved"
                  badgeColor="success"
                  name="Michael Jorden"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img7}
                  badge="Rejected"
                  badgeColor="danger"
                  name="Johnathan Doeting"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img5}
                  badge="Pending"
                  badgeColor="primary"
                  name="James Anderson"
                  comment="Lorem Ipsum is simply dummy text of the printing and type setting industry."
                  date="April 14, 2016"
                />
                <RecentComment
                  image={img6}
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

export default Demographical;
