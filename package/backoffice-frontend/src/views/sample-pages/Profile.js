import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import Iframe from "react-iframe";
import axios from 'axios'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import classnames from "classnames";

import img1 from "../../assets/images/users/7.jpg";
import img2 from "../../assets/images/users/3.jpg";
import img3 from "../../assets/images/users/4.jpg";
import img4 from "../../assets/images/users/5.jpg";

import time1 from "../../assets/images/big/img1.jpg";
import time2 from "../../assets/images/big/img2.jpg";
import time3 from "../../assets/images/big/img3.jpg";
import time4 from "../../assets/images/big/img4.jpg";
import InlineSpinner from "../spinner/InlineSpinner";

const Profile = () => {
  let url = '/seller/profile';
  const [activeTab, setActiveTab] = useState("2");
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState(true);
  const [data, setdata] = useState(null);

  const backoffice = useSelector(state => state.backoffice);
  const session = useSelector(state => state.session);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getDataSeller = () => {
    if(search){
      setsearch(false);
      axios.get(url).then((res) => {
        console.log(res.data);
        if(res.data.data.result){
          console.log(res.data.data.rsAccount[0]);
          setdata(res.data.data.rsAccount[0]);
        }
        setloading(false);
      }).catch((err) => {
        console.error(err);
        setloading(false);
      })
    }
  }

  useEffect(() => {
    if(loading){
      if(backoffice.role.name === 'Vendedor'){
        getDataSeller();
      }
    }
  }, []);

  if(!loading){
    let shopData = data.shopRequests[0].shop;
    let address = shopData.address;
    let dataBank = shopData.paymentCong;

    console.log(shopData);
    console.log(session);
    console.log(data);

    let logoshop = '';

    if(backoffice.role.name === 'Vendedor' && session.storeLogo !== null){
      logoshop = String.fromCharCode.apply(null, session.storeLogo);
    }

    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Mi perfil - {backoffice.role.name}</h1>
        {backoffice.role.name === 'Vendedor' &&
          <Card>
          <CardBody>
          <Row>
          <Col xs="12" md="12" lg="12">
            <Card>
              <CardBody>
                <div className="text-center mt-4">
                  <img
                      src={`data:image/png;base64,${logoshop}`}
                      alt="user"
                      className="rounded-circle"
                      width="150"
                  />
                  <CardTitle className="mt-2">
                    <h2><strong>{shopData.name}</strong></h2>
                    <h5 className="text-muted">{data.name}</h5>
                  </CardTitle>
                  <div className="d-none">
                    <CardSubtitle>Tienda operativa</CardSubtitle>
                  </div>
                  <Row className="text-center d-none justify-content-md-center">
                    <Col xs="4">
                      <span className="font-weight-bold text-primary">
                        <i className="icon-people"></i>
                          <span className="font-medium ml-2">{shopData.employees}</span>
                      </span>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="12" lg="12">
            <Card>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Datos de la tienda
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Actualizar datos de la tienda
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col md="3" xs="6" className="border-right">
                              <strong>Nombre</strong>
                              <br />
                              <p className="text-muted">{shopData.name}</p>
                            </Col>
                            <Col md="3" xs="6" className="border-right">
                              <strong>Teléfono</strong>
                              <br />
                              <p className="text-muted">{shopData.phone[0].number}</p>
                            </Col>
                            <Col md="3" xs="6" className="border-right">
                              <strong>Correo electrónico</strong>
                              <br />
                              <p className="text-muted">{data.email}</p>
                            </Col>
                            <Col md="3" xs="6" className="border-right">
                              <strong>Dirección</strong>
                              <br />
                              <p className="text-muted">{address[0].comuna.name} {address[0].calle} {address[0].numero} {address[0].local}, {address[0].province.name}, {address[0].region.name}</p>
                            </Col>
                          </Row>
                          <h4 className="mt-4"><span className="font-medium">Número de empleados:</span> {shopData.employees}</h4>
                          <h4 className="font-medium mt-4">Descripción de la tienda</h4>
                          <p className="mt-2">
                            {shopData.shopDescription}
                          </p>
                          <hr/>
                          <h4 className="font-medium mt-4">Datos bancarios</h4>
                          <div className="row mt-4">
                            <div className="col-md-12">
                                <h6><span className="font-medium">Número de cuenta:</span> {dataBank.number}</h6>
                            </div>
                            <div className="col-md-12">
                                <h6><span className="font-medium">Tipo de cuenta:</span> {dataBank.accountType.name}</h6>
                            </div>
                            <div className="col-md-12">
                                <h6><span className="font-medium">Banco:</span> {dataBank.bank.name}</h6>
                            </div>
                            <div className="col-md-12">
                                <h6><span className="font-medium">Propietario de la cuenta:</span> {dataBank.owner}</h6>
                            </div>
                            <div className="col-md-12">
                                <h6><span className="font-medium">Rut:</span> {dataBank.rut}</h6>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Form>
                            <FormGroup>
                              <Label>Full Name</Label>
                              <Input type="text" placeholder="Shaina Agrawal" />
                            </FormGroup>
                            <FormGroup>
                              <Label>Email</Label>
                              <Input
                                type="email"
                                placeholder="Jognsmith@cool.com"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label>Password</Label>
                              <Input type="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                              <Label>Phone No</Label>
                              <Input type="text" placeholder="123 456 1020" />
                            </FormGroup>
                            <FormGroup>
                              <Label>Message</Label>
                              <Input type="textarea" />
                            </FormGroup>
                            <FormGroup>
                              <Label>Select Country</Label>
                              <Input type="select">
                                <option>USA</option>
                                <option>India</option>
                                <option>America</option>
                              </Input>
                            </FormGroup>
                            <Button color="primary">Update Profile</Button>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
        
          </CardBody>
          </Card>
        }
      </div>
    );
  }else{
    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Mi perfil</h1>
        <InlineSpinner />
      </div>
    )
  }
};

export default Profile;
