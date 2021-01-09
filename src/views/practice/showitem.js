import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {data} from './data'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    UncontrolledTooltip
  } from "reactstrap";

function Showitem(props) {

    let id = props.match.params.id;
    let shop = {};

    if(id !== null && id !== undefined){
        shop = data.find(item => Number(item.id) === Number(id));
        console.log(data);
        console.log(shop);
    }

    let dataBank = shop.bank;
    let address = shop.address;

    console.log(dataBank);

    return (
        <div className="py-3 container">
            <h5 className="font-weight-bold">Ver tienda</h5>
            <Row>
                <Col xs="12" md="4" lg="4">
                    <Card>
                    <CardBody>
                        <div className="text-center mt-4">
                        <img
                            src={shop.logo}
                            alt="user"
                            className="rounded-circle shadow"
                            width="150"
                        />
                        <CardTitle className="mt-2">
                            <h2><strong>{shop.name}</strong></h2>
                        </CardTitle>
                        <Row className="text-center justify-content-md-center">
                            <Col xs="4">
                                <UncontrolledTooltip 
                                    className="bg-primary text-white" 
                                    placement="bottom" 
                                    target={`employees-count`}
                                >
                                    Número de empleados
                                </UncontrolledTooltip>
                                <p className="mb-0" id="employees-count">
                                <i className="mdi mdi-account-hard-hat"></i>
                                <span className="font-medium ml-2">
                                    {shop.employees}
                                </span>
                                </p>
                            </Col>
                        </Row>
                        </div>
                    </CardBody>
                    
                    <CardBody className="border-top">
                        <div>
                            {Array.isArray(shop.partner) && shop.partner.length > 0 &&
                            <Fragment>
                                <small className="text-muted"><i className="mdi mdi-account-group mr-2"></i>Colaboradores</small>
                                {(shop.partner.map((item, key) => {
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
                                <h6>{shop.isLocal ? 'Si' : 'No'}</h6>
                                
                                <small className="text-muted pt-4 db"><i className="mdi mdi-map-marker mr-2"></i>Dirección</small>
                                <h6>{address[0].calle} {address[0].numero}, {address[0].local}, {address[0].comuna.name} {address[0].province.name} {address[0].region.name}</h6>
                            
                                <div className="d-none">
                                    <small className="text-muted pt-4 db"><i className="mdi mdi-account-hard-hat mr-2"></i>¿Tiene inicio de actividades?</small>
                                    <h6>{shop.startActivity ? 'Si' : 'No'}</h6>
                                </div>
                            
                            </Fragment>
                            }
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
                              <strong className=""><i className="mdi mdi-storefront text-primary mr-2"></i>Nombre</strong>
                              <br />
                              <p className="text-muted">{shop.name}</p>
                            </Col>
                            <Col md="4" xs="6" className="border-right">
                              <strong className=""><i className="mdi mdi-phone text-primary mr-2"></i>Teléfono</strong>
                              <br />
                              <p className="text-muted">{shop.phone[0].number}</p>
                            </Col>
                            <Col md="4" xs="12" className="border-right">
                              <strong className=""><i className="mdi mdi-email text-primary mr-2"></i>Correo electrónico</strong>
                              <br />
                              <p className="text-muted">{shop.email}</p>
                            </Col>
                          </Row>

                          <h6 className="font-medium mt-4">
                            Descripción de la tienda:
                          </h6>
                          <p>
                            {shop.descShop}
                          </p>
                          
                          <h6 className="font-medium mt-4">
                            Proceso de manufactura:
                          </h6>
                          <p>
                            "{shop.processId.name}"
                          </p>

                            {/* 
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
                          */}

                        </CardBody>
                      </Card>
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
                    </Col>
                  </Row>
                </Col>                
            </Row>
        </div>
    )
}

export default withRouter(Showitem);
