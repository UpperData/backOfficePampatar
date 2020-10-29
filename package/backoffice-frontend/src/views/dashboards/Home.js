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

const Home = () => {
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

export default Home;
