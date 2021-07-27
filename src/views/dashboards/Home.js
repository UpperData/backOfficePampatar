import React, {useEffect, useState} from "react";
import { Card, CardBody, Row, Col } from "reactstrap";

import axios from 'axios'
import {useSelector} from 'react-redux'
import { moneyFormatter } from "../../utils/helpers";
import DonutInventario from "../../components/dashboard/inventario/Inventario";

const Home = () => {

  const [loading, setloading] = useState(true);
  const [search, setsearch]   = useState(true);

  const [data, setdata]       = useState(null);

  const getData = () => {
    let url = "";

    if(role === 'Vendedor'){
      url = '/GET/SELLER/dasHBoard/data';
    }else if(role === 'Administrador'){
      url = '/Get/ADmIN/dasHBoard/data';
    }

    axios.get(url).then((res) => {
      console.log(res);
      setdata(res.data.data);
    });
  }

  useEffect(() => {
    if(loading){
      if(search){
        setsearch(false);
        getData();
      }
    }
  });

  const session     = useSelector(state => state.session);
  const backoffice  = useSelector((state) => state.backoffice);

  let role = backoffice.role.name;
  let account = session.userData.account;

  if(role === 'Vendedor'){
    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Dashboard</h1>
        <Row>
          {(role === 'Vendedor') &&
            <Col xs={12}>
              <Card>
                  <span className="lstick"></span>
                  <CardBody>
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="h5 mb-0 font-weight-normal card-title">
                        <i className="mdi mdi-store-outline d-none mr-2"></i>  
                        Nombre de la tienda
                      </h4>
                      <button className="btn btn-info">
                        <i className="icon-pencil mr-2"></i>Editar tienda
                      </button>
                    </div>
                    <div className="my-3">
                      <h1 className="text-info font-weight-normal h1">
                        {session.userData.shop.name}</h1>
                    </div>
                  </CardBody>
              </Card>
            </Col>
          }
        </Row>
        {data !== null &&
          <Row>
            <Col xs={12} md={8} lg={12}>
              <DonutInventario 

                total={data.totalService + data.totalProduct}
                labels={['Productos', 'Servicios']}
                data={[data.totalProduct, data.totalService]} 
                colors={['rgb(250, 67, 58)', 'rgb(14, 47, 113)']} 

                tablerows={[
                  {title: 'Productos', value: moneyFormatter(data.totalProduct), strong: false, color: 'rgb(250, 67, 58)'},
                  {title: 'Servicios', value: moneyFormatter(data.totalService), strong: false, color: 'rgb(14, 47, 113)'},

                  {title: 'Total',     value: moneyFormatter(data.totalService + data.totalProduct), strong: true}
                ]}

              />
            </Col>
            <Col className="d-none" xs={12} md={6} lg={4}>
              <div className="card">
                <span className="lstick widget-card"></span>
                <div className="card-body">
                    <div className="d-flex">
                        <div className="mr-4 align-self-center">
                          <div className="icon-chart-data">
                            <i style={{fontSize: "25px"}} className="icon-earphones-alt text-info"></i>
                          </div>
                        </div>
                        <div className="align-self-center">
                          <h6 className="text-muted font-weight-normal mt-2 mb-0">
                            Inventario de servicios
                          </h6>
                          <h2 className="mt-0">
                            {moneyFormatter(data.totalService)}
                          </h2>
                        </div>
                    </div>
                  </div>
              </div>
            </Col>
            <Col className="d-none" xs={12} md={6} lg={4}>
              <div className="card">
                <span className="lstick widget-card"></span>
                <div className="card-body">
                    <div className="d-flex">
                        <div className="mr-4 align-self-center">
                          <div className="icon-chart-data">
                            <i 
                              style={{fontSize: "25px"}} 
                              className="icon-handbag text-info"
                            ></i>
                          </div>
                        </div>
                        <div className="align-self-center">
                          <h6 className="text-muted font-weight-normal mt-2 mb-0">
                            Inventario de productos
                          </h6>
                          <h2 className="mt-0">
                            {moneyFormatter(data.totalProduct)}
                          </h2>
                        </div>
                    </div>
                  </div>
              </div>
            </Col>
          </Row>
        }
      </div>
    );
  }else if(role === 'Administrador'){
    return (
      <div>
        <h1 className="h4 mb-3 font-weight-bold">Dashboard</h1>
        <Row>
          {(role === 'Administrador') &&
            <Col xs={12}>
              <Card>
                  <span className="lstick"></span>
                  <CardBody>
                    <h4 className="h5 mb-0 font-weight-normal card-title">
                      <i className="mdi mdi-store-outline d-none mr-2"></i>  
                      Administrador
                    </h4>
                    <div className="my-3">
                      <h1 className="text-info h2">
                        <i className="far d-none fa-user mr-2"></i>
                        {account.email}
                      </h1>
                    </div>
                  </CardBody>
              </Card>
            </Col>
          }
        </Row>
        {data !== null &&
          <Row>
            <Col xs={12} md={8} lg={12}>
              <DonutInventario 

                total={data.totalService + data.totalProduct}
                labels={['Productos', 'Servicios']}
                data={[data.totalProduct, data.totalService]} 
                colors={['rgb(250, 67, 58)', 'rgb(14, 47, 113)']} 

                tablerows={[
                  {title: 'Productos', value: moneyFormatter(data.totalProduct), strong: false, color: 'rgb(250, 67, 58)'},
                  {title: 'Servicios', value: moneyFormatter(data.totalService), strong: false, color: 'rgb(14, 47, 113)'},

                  {title: 'Total',     value: moneyFormatter(data.totalService + data.totalProduct), strong: true}
                ]}

              />
            </Col>
            <Col className="d-none" xs={12} md={6} lg={4}>
              <div className="card">
                <span className="lstick widget-card"></span>
                <div className="card-body">
                    <div className="d-flex">
                        <div className="mr-4 align-self-center">
                          <div className="icon-chart-data">
                            <i style={{fontSize: "25px"}} className="icon-earphones-alt text-info"></i>
                          </div>
                        </div>
                        <div className="align-self-center">
                          <h6 className="text-muted font-weight-normal mt-2 mb-0">
                            Inventario de servicios
                          </h6>
                          <h2 className="mt-0">
                            {moneyFormatter(data.totalService)}
                          </h2>
                        </div>
                    </div>
                  </div>
              </div>
            </Col>
            <Col className="d-none" xs={12} md={6} lg={4}>
              <div className="card">
                <span className="lstick widget-card"></span>
                <div className="card-body">
                    <div className="d-flex">
                        <div className="mr-4 align-self-center">
                          <div className="icon-chart-data">
                            <i 
                              style={{fontSize: "25px"}} 
                              className="icon-handbag text-info"
                            ></i>
                          </div>
                        </div>
                        <div className="align-self-center">
                          <h6 className="text-muted font-weight-normal mt-2 mb-0">
                            Inventario de productos
                          </h6>
                          <h2 className="mt-0">
                            {moneyFormatter(data.totalProduct)}
                          </h2>
                        </div>
                    </div>
                  </div>
              </div>
            </Col>
          </Row>
        }
      </div>
    );
  }
};

export default Home;
