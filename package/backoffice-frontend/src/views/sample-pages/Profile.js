import React, { useState, useEffect, Fragment } from "react";
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

    let logoshop = session.storeLogo.reduce(
      function (data, byte) {
          return data + String.fromCharCode(byte);
      },
      ''
  );

    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Mi perfil - {backoffice.role.name}</h1>
        {backoffice.role.name === 'Vendedor' &&
          <Card>
          <CardBody>
          <Row>
          <Col xs="12" md="4" lg="4">
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

                    {Array.isArray(shopData.partner) && shopData.partner.length > 0 &&
                      <Fragment>
                          <h4 className="mt-4"><span className="font-weight-bold">Colaboradores:</span></h4>
                          {(shopData.partner.map((item, key) => {
                            return (
                              <div className="my-1" key={key}>
                                <p className="mb-0">
                                  {item.firstName+' '+item.lastName}
                                </p>
                                <span className="text-muted">
                                  {item.relationship}
                                </span>
                              </div>
                            )
                          }))}
                      </Fragment>
                    }
                  </CardTitle>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="8" lg="8">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col md="4" xs="6" className="border-right">
                              <strong className="text-info">Nombre</strong>
                              <br />
                              <p className="text-muted">{shopData.name}</p>
                            </Col>
                            <Col md="4" xs="6" className="border-right">
                              <strong className="text-info">Teléfono</strong>
                              <br />
                              <p className="text-muted">{shopData.phone[0].number}</p>
                            </Col>
                            <Col md="4" xs="12" className="border-right">
                              <strong className="text-info">Correo electrónico</strong>
                              <br />
                              <p className="text-muted">{data.email}</p>
                            </Col>
                          </Row>
                          <h4 className="font-weight-bold mt-4">Descripción de la tienda</h4>
                          <p className="mt-2">
                            {shopData.shopDescription}
                          </p>

                          <h4 className="mt-4"><span className="font-weight-bold">Número de empleados:</span></h4>
                          <p className="mt-2">{shopData.employees}</p>

                          <h4 className="mt-4"><span className="font-weight-bold">¿Tiene inicio de actividades?:</span></h4>
                          <p className="mt-2">{shopData.startActivity ? 'Si' : 'No'}</p>

                          <h4 className="mt-4"><span className="font-weight-bold">¿Posee tienda física?:</span></h4>
                          <p className="mt-2">{shopData.isLocal ? 'Si' : 'No'}</p>
                    
                          <h4 className="font-weight-bold mt-4">Dirección</h4>
                          <p className="mt-2">
                            {address[0].comuna.name} {address[0].calle} {address[0].numero} {address[0].local}, {address[0].province.name}, {address[0].region.name}
                          </p>

                          <h4 className="font-weight-bold mt-4">Proceso de manufactura</h4>
                          <p className="mt-2">
                            {shopData.processId.name}
                          </p>

                          <hr/>

                          <h4 className="font-weight-bold mt-4">Datos bancarios</h4>
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
