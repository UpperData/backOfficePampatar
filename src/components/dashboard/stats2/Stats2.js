import React from "react";

import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';

import img1 from '../../../assets/images/icons/income.png';
import img2 from '../../../assets/images/icons/expense.png';
import img3 from '../../../assets/images/icons/assets.png';
import img4 from '../../../assets/images/icons/staff.png';

const Stats2 = () => {
    return (
        <Row>
            <Col sm={12} md={6} lg={3}>
                <Card>
                    <span className="lstick widget-card bg-info"></span>
                    <CardBody>
                        <div className="d-flex">
                            <div className="mr-3 align-self-center"><img src={img1} alt="income" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">Total Income</h6>
                                <h2 className="mt-0 ">953,000</h2>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12} md={6} lg={3}>
                <Card>
                    <span className="lstick widget-card bg-info"></span>
                    <CardBody>
                        <div className="d-flex">
                            <div className="mr-3 align-self-center"><img src={img2} alt="expense" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">Total Expense</h6>
                                <h2 className="mt-0 ">236,000</h2>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12} md={6} lg={3}>
                <Card>
                    <span className="lstick widget-card bg-info"></span>
                    <CardBody>
                        <div className="d-flex">
                            <div className="mr-3 align-self-center"><img src={img3} alt="assets" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">Total Assets</h6>
                                <h2 className="mt-0 ">987,563</h2>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col sm={12} md={6} lg={3}>
                <Card>
                    <span className="lstick widget-card bg-info"></span>
                    <CardBody>
                        <div className="d-flex">
                            <div className="mr-3 align-self-center"><img src={img4} alt="staff" /></div>
                            <div className="align-self-center">
                                <h6 className="text-muted mt-2 mb-0">Total Staff</h6>
                                <h2 className="mt-0 ">987,563</h2>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default Stats2;
