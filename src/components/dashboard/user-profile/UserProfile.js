import React from 'react';
import {
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap';

import img1 from '../../../assets/images/users/1.jpg';

const UserProfile = () => {

    return (
        <Card className="text-center">
            <CardBody>
                <div className="">
                    <img src={img1} alt="user" className="rounded-circle my-4 shadow" width="128" />
                    <h3 className="mb-0">Mark J. Freeman</h3>
                    <h6 className="text-muted">Web Designer</h6>
                    <ul className="list-inline mt-4">
                        <li className="list-inline-item pr-2">
                            <a href="/" className="font-16 text-muted"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li className="list-inline-item px-2">
                            <a href="/" className="font-16 text-muted"><i className="fab fa-facebook-square"></i></a>
                        </li>
                        <li className="list-inline-item px-2">
                            <a href="/" className="font-16 text-muted"><i className="fab fa-google-plus-g"></i></a>
                        </li>
                        <li className="list-inline-item px-2">
                            <a href="/" className="font-16 text-muted"><i className="fab fa-youtube"></i></a>
                        </li>
                        <li className="list-inline-item">
                            <a href="/" className="font-16 text-muted"><i className="fab fa-instagram"></i></a>
                        </li>
                    </ul>
                </div>
            </CardBody>
            <div className="bg-light">
                <Row>
                    <Col className="border-right text-center py-4">
                        <h4 className="font-medium mb-0">35000</h4>
                        <small>Followers</small>
                    </Col>
                    <Col className="text-center py-4">
                        <h4 className="font-medium mb-0">180</h4>
                        <small>Following</small>
                    </Col>
                </Row>
            </div>
            <CardBody>
                <button className="btn btn-success rounded-pill mt-2 mb-3 btn-rounded btn-md">Follow Me</button>
            </CardBody>
        </Card>
    );
}

export default UserProfile;
