import React from 'react';
import { Row, Col } from 'reactstrap';
import {
    Projects, SalesOverview2, Stats2, Activity, BrowserStats, ProductSales, TotalVisits
} from '../../components/dashboard';

const Modern = () => {
    return (
        <div>
            <Stats2 />
            <Row>
                <Col md="6">
                    <SalesOverview2 />
                </Col>
                <Col md="6">
                    <ProductSales />
                </Col>
            </Row>
            <Row>
                <Col sm={12} lg={8}>
                    <TotalVisits />
                </Col>
                <Col sm={12} lg={4}>
                    <BrowserStats />
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
        </div>
    );
}

export default Modern;
