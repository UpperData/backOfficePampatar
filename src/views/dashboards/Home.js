import React, {useEffect, useState} from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

import axios from 'axios'
import {useSelector} from 'react-redux'
import Chart from 'react-c3-component';
import 'c3/c3.css';

import moment from "moment"
import { moneyFormatter } from "../../utils/helpers";
import DonutInventario from "../../components/dashboard/inventario/Inventario";

const Home = () => {

  const [loading, setloading] = useState(true);
  const [search, setsearch]   = useState(true);

  const [data, setdata]       = useState(null);

  const [datagraphinventory, setdatagraphinventory] = useState(null);
  const [datagraphsalesbymonth, setdatagraphsalesbymonth] = useState(null);

  const getData = () => {
    let url = "";

    if(role === 'Vendedor'){
      url = '/GET/SELLER/dasHBoard/data';
    }else if(role === 'Administrador'){
      url = '/Get/ADmIN/dasHBoard/data';
    }

    axios.get(url).then((res) => {
      let datagraph = res.data.data;
      console.log(datagraph);

      setdatagraphinventory(datagraph.graphs.inventoryValue);
      setdatagraphsalesbymonth(datagraph.graphs.salesByMonth);

      setdata(datagraph);
    });
  }

  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]

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

  let sTotalSales = [];
  let pTotalSales = [];

  console.log(datagraphsalesbymonth);

  if(datagraphsalesbymonth !== null && Array.isArray(datagraphsalesbymonth)){
    for (let i = 0; i < datagraphsalesbymonth.length; i++) {
      const dataMonth = datagraphsalesbymonth[i];
      if(dataMonth !== null){
        sTotalSales.push(dataMonth.sTotalSales);
        pTotalSales.push(dataMonth.pTotalSales);
      }
    }
  }

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

                total={datagraphinventory.totalService + datagraphinventory.totalProduct}
                labels={['Productos', 'Servicios']}
                data={[datagraphinventory.totalProduct, datagraphinventory.totalService]} 
                colors={['rgb(250, 67, 58)', 'rgb(14, 47, 113)']} 

                tablerows={[
                  {title: 'Productos', value: moneyFormatter(datagraphinventory.totalProduct), strong: false, color: 'rgb(250, 67, 58)'},
                  {title: 'Servicios', value: moneyFormatter(datagraphinventory.totalService), strong: false, color: 'rgb(14, 47, 113)'},

                  {title: 'Total',     value: moneyFormatter(datagraphinventory.totalService + datagraphinventory.totalProduct), strong: true}
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
                            {moneyFormatter(datagraphinventory.totalService)}
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
                            {moneyFormatter(datagraphinventory.totalProduct)}
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

    console.log(sTotalSales);
    console.log(pTotalSales);

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

                total={datagraphinventory.totalService + datagraphinventory.totalProduct}
                labels={['Productos', 'Servicios']}
                data={[datagraphinventory.totalProduct, datagraphinventory.totalService]} 
                colors={['rgb(250, 67, 58)', 'rgb(14, 47, 113)']} 

                tablerows={[
                  {title: 'Productos', value: moneyFormatter(datagraphinventory.totalProduct), strong: false, color: 'rgb(250, 67, 58)'},
                  {title: 'Servicios', value: moneyFormatter(datagraphinventory.totalService), strong: false, color: 'rgb(14, 47, 113)'},

                  {title: 'Total',     value: moneyFormatter(datagraphinventory.totalService + datagraphinventory.totalProduct), strong: true}
                ]}

              />
            </Col>
            {(!setdatagraphsalesbymonth !== null) &&
            <Col md="6">
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">
                          Ventas por mes
                        </h4>
                        <Chart
                            config={{
                                data: {
                                    columns: [
                                        ["Servicios"].concat(sTotalSales),
                                        ["Productos"].concat(pTotalSales)
                                    ]
                                },
                                grid: { y: { show: !0, stroke: "#ff0" } },
                                size: { height: 250 },
                                point: { r: 4 },
                                color: { pattern: ["rgb(14, 47, 113)", "rgb(250, 67, 58)"] },
                                axis: {
                                    x:{
                                        tick: {
                                            format: function (x) { return meses[x]; }
                                        }
                                    }
                                },
                                tooltip: {
                                  format: {
                                      title: function (datax) { return meses[datax]; },
                                      value: function (value, ratio, id) {
                                          //var format = id === 'data1' ? d3.format(',') : d3.format('$');
                                          return value;
                                      }
                                  }
                                }
                            }}
                        />
                    </CardBody>
                </Card>
            </Col>
            }
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
                            {moneyFormatter(datagraphinventory.totalService)}
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
                            {moneyFormatter(datagraphinventory.totalProduct)}
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
