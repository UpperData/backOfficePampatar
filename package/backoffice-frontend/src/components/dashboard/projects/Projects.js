import React from "react";

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';
import img4 from '../../../assets/images/users/4.jpg';

import {
    Card,
    CardBody,
    Input,
    Table
} from 'reactstrap';

const Projects = () => {

    return (
        <Card>
            <span className="lstick"></span>
            <CardBody>
                <div className="d-md-flex align-items-center">
                    <div>
                        <h4 className="card-title">Projects of the Month</h4>
                    </div>
                    <div className="ml-auto d-flex align-items-center">
                        <div className="dl">
                            <Input type="select" className="custom-select">
                                <option value="0">January 2019</option>
                                <option value="1">Fabruary 2019</option>
                                <option value="2">March 2019</option>
                                <option value="3">April 2019</option>
                            </Input>
                        </div>
                    </div>
                </div>
                <Table className="no-wrap v-middle mt-3 mb-0" responsive>
                    <thead>
                        <tr className="border-0">
                            <th className="border-0 font-16">Assigned</th>
                            <th className="border-0 font-16">Name</th>
                            <th className="border-0 font-16">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img1} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Sunil Joshi</h6><small className="text-muted font-14">Web Designer</small></div>
                                </div>
                            </td>
                            <td>Elite Admin</td>

                            <td>
                                <span className="badge badge-success badge-pill">Low</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img2} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Andrew</h6><small className="text-muted font-14">Project Manager</small></div>
                                </div>
                            </td>
                            <td>Real Homes</td>
                            <td>
                                <span className="badge badge-primary badge-pill">Medium</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img3} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Bhavesh patel</h6><small className="text-muted font-14">Developer</small></div>
                                </div>
                            </td>
                            <td>MedicalPro Theme</td>
                            <td>
                                <span className="badge badge-info badge-pill">High</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img4} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Nirav Joshi</h6><small className="text-muted font-14">Frontend Eng</small></div>
                                </div>
                            </td>
                            <td>Elite Admin</td>
                            <td>
                                <span className="badge badge-danger badge-pill">Low</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img2} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Micheal Doe</h6><small className="text-muted font-14">Content Writer</small></div>
                                </div>
                            </td>
                            <td>Helping Hands</td>
                            <td>
                                <span className="badge badge-primary badge-pill">Medium</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img3} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Johnathan</h6><small className="text-muted font-14">Graphic</small></div>
                                </div>
                            </td>
                            <td>Digital Agency</td>
                            <td>
                                <span className="badge badge-info badge-pill">High</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex no-block align-items-center">
                                    <div className="mr-2"><img src={img1} alt="user" className="rounded-circle" width="45" /></div>
                                    <div className="ml-2">
                                        <h6 className="mb-0 font-medium">Nirav Joshi</h6><small className="text-muted font-14">Frontend Eng</small></div>
                                </div>
                            </td>
                            <td>Elite Admin</td>
                            <td>
                                <span className="badge badge-info badge-pill">High</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default Projects;
