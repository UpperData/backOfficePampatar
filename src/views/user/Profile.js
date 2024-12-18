import React, { useState, useEffect, Fragment } from "react";
import {useSelector} from 'react-redux'
import axios from 'axios'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";

import InlineSpinner from "../spinner/InlineSpinner";

const Profile = () => {
  //const [activeTab, setActiveTab] = useState("2");
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState(true);
  const [data, setdata] = useState(null);

  const backoffice = useSelector(state => state.backoffice);
  const session = useSelector(state => state.session);


  useEffect(() => {
    if(loading){
      if(backoffice.role.name === 'Vendedor'){
        const getDataSeller = () => {
          let url = '/seller/profile';
          if(search){
            setsearch(false);
            axios.get(url).then((res) => {
              console.log(res.data);
              if(res.data.data.result){
                //console.log(res.data.data.rsAccount[0]);
                setdata(res.data.data.rsAccount[0]);
              }
              setloading(false);
            }).catch((err) => {
              console.error(err);
              setloading(false);
            })
          }
        }

        getDataSeller();
      }
    }
  }, [loading, backoffice.role.name, search]);

  if(!loading){
    let shopData = data.shopRequests[0].shop;
    let address = shopData.address;
    let dataBank = shopData.paymentCong;

    let logoshop = "";

    if(session.storeLogo && session.storeLogo !== null && session.storeLogo !== undefined){

      logoshop = session.storeLogo.reduce(
        function (data, byte) {
            return data + String.fromCharCode(byte);
        },
        ''
      );
    }

    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Mi perfil - {backoffice.role.name}</h1>
        {backoffice.role.name === 'Vendedor' &&
          <Row>
          <Col xs="12" md="4" lg="4">
            <Card>
              <CardBody>
                <div className="text-center mt-4">

                  <div className="img-circle mx-auto" style={{width: '150px',height: '150px',backgroundImage: 'url("data:image/png;base64,'+((logoshop !== null) ? logoshop : '')+'")'}}></div>
                  <CardTitle className="mt-2">
                    <h2><strong>{shopData.name}</strong></h2>
                    <h5 className="text-muted">{data.name}</h5>
                  </CardTitle>
                  <Row className="text-center justify-content-md-center">
                    <Col xs="4">
                        <UncontrolledTooltip 
                          className="bg-primary text-white" 
                          placement="right" 
                          target={`employees-count`}
                        >
                          Número de empleados
                        </UncontrolledTooltip>
                        <p className="mb-0" id="employees-count">
                          <i className="mdi mdi-account-hard-hat"></i>
                          <span className="font-medium ml-2">
                            {shopData.employees}
                          </span>
                        </p>
                    </Col>
                  </Row>
                </div>
              </CardBody>
              {Array.isArray(shopData.partner) && shopData.partner.length > 0 &&
                <CardBody className="border-top">
                  <div>
                      {Array.isArray(shopData.partner) && shopData.partner.length > 0 &&
                        <Fragment>
                            <small className="text-muted"><i className="mdi mdi-account-group mr-2"></i>Colaboradores</small>
                            {(shopData.partner.map((item, key) => {
                              return (
                                <div className="my-1" key={key}>
                                  <h6 className="mb-0">
                                    {item.firstName+' '+item.lastName}
                                  </h6>
                                  <small className="text-primary">
                                    {item.relationship}
                                  </small>
                                </div>
                              )
                            }))}
                            <hr/>

                            <small className="text-muted pt-4 db"><i className="mdi mdi-storefront-outline mr-2"></i>¿Posee tienda física?</small>
                            <h6>{shopData.isLocal ? 'Si' : 'No'}</h6>

                            <small className="text-muted pt-4 db"><i className="mdi mdi-map-marker mr-2"></i>Dirección</small>
                            <h6>{address[0].calle} {address[0].numero}, {address[0].local}, {address[0].comuna.name}, {address[0].province.name}, {address[0].region.name}</h6>
                            
                            <div className="d-none">
                              <small className="text-muted pt-4 db"><i className="mdi mdi-account-hard-hat mr-2"></i>¿Tiene inicio de actividades?</small>
                              <h6>{shopData.startActivity ? 'Si' : 'No'}</h6>
                            </div>
                        
                        </Fragment>
                      }
                  </div>
                </CardBody>
              }
            </Card>
          </Col>
          <Col xs="12" md="8" lg="8">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col md="4" xs="6" className="border-right">
                              <strong className=""><i className="mdi mdi-storefront text-primary mr-2"></i>Nombre</strong>
                              <br />
                              <p className="text-muted">{shopData.name}</p>
                            </Col>
                            <Col md="4" xs="6" className="border-right">
                              <strong className=""><i className="mdi mdi-phone text-primary mr-2"></i>Teléfono</strong>
                              <br />
                              <p className="text-muted">
                                {(shopData.phone[0] !== null && shopData.phone[0].hasOwnProperty("phoneNmber") ? shopData.phone[0].phoneNmber : shopData.phone[0].number)}
                              </p>
                            </Col>
                            <Col md="4" xs="12" className="border-right">
                              <strong className=""><i className="mdi mdi-email text-primary mr-2"></i>Correo electrónico</strong>
                              <br />
                              <p className="text-muted">{data.email}</p>
                            </Col>
                          </Row>

                          <h6 className="font-medium mt-4">
                            Descripción de la tienda:
                          </h6>
                          <p>
                            {shopData.shopDescription}
                          </p>

                          {(shopData.processId !== undefined && shopData.processId !== null) &&
                            <div>
                              <h6 className="font-medium mt-4">
                                Proceso de manufactura:
                              </h6>
                              <p>
                                "{shopData.processId.name}"
                              </p>
                            </div>
                          }

                          <h6 className="font-medium mt-4">
                            Tipo de tienda:
                          </h6>
                          
                          {
                          shopData.storeType !== null 
                          && Array.isArray(shopData.storeType) && 
                          shopData.storeType.map((item, key) => {
                            return (
                              <p key={key} className="mb-0">
                                "{item.name}"
                              </p>
                            )
                          })}
                          

                        </CardBody>
                      </Card>
                      {(dataBank !== null) && 
                        <Card>
                          <div className="p-3">
                              <CardTitle>
                                  <i className="mdi mdi-credit-card-multiple mr-2"></i>Datos bancarios
                              </CardTitle>
                          </div>
                          <CardBody className="border-top">
                              <div className="row">
                                  <div className="col-md-12">
                                      <h6><span className="font-medium">Número de cuenta:</span></h6>
                                      <p>
                                        {dataBank.number}
                                      </p>
                                  </div>
                                  <div className="col-md-12">
                                      <h6><span className="font-medium">Tipo de cuenta:</span></h6>
                                      <p>
                                        {dataBank.accountType.name}
                                      </p>
                                  </div>
                                  <div className="col-md-12">
                                      <h6><span className="font-medium">Banco:</span></h6>
                                      <p>
                                        {dataBank.bank.name}
                                      </p>
                                  </div>
                                  <div className="col-md-12">
                                      <h6><span className="font-medium">Propietario de la cuenta:</span></h6>
                                      <p>
                                        {dataBank.owner}
                                      </p>
                                  </div>
                                  <div className="col-md-12">
                                      <h6><span className="font-medium">Rut:</span></h6>
                                      <p>
                                        {dataBank.rut}
                                      </p>
                                  </div>
                              </div>
                          </CardBody>
                        </Card>
                      }
                    </Col>
                  </Row>
          </Col>
        </Row>
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
