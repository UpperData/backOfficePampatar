import React from "react";

import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';

const StatsVertical = () => {
    return (
        <Row>
            <Col sm={12}>
                <Card className="bg-success text-white">
                    <CardBody>
                        <div className="d-flex">
                            <div className="stats">
                                <h1 className="text-white">9062+</h1>
                                <h6 className="text-white">Subscribe</h6>
                                <button className="btn btn-rounded btn-outline-light mt-3 font-14">Check list</button>
                            </div>
                            <div className="stats-icon text-right ml-auto"><i className="fa fa-envelope display-5 op-3 text-dark"></i></div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-primary text-white">
                    <CardBody>
                        <div className="d-flex">
                            <div className="stats">
                                <h1 className="text-white">6509+</h1>
                                <h6 className="text-white">Facebook Likes</h6>
                                <button className="btn btn-rounded btn-outline-light mt-3 font-14">Check list</button>
                            </div>
                            <div className="stats-icon text-right ml-auto"><i className="fab fa-facebook-f display-5 op-3 text-dark"></i></div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-info text-white">
                    <CardBody>
                        <div className="d-flex">
                            <div className="stats">
                                <h1 className="text-white">3257+</h1>
                                <h6 className="text-white">Twitter Followers</h6>
                                <button className="btn btn-rounded btn-outline-light mt-3 font-14">Check list</button>
                            </div>
                            <div className="stats-icon text-right ml-auto"><i className="fab fa-twitter display-5 op-3 text-dark"></i></div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default StatsVertical;
