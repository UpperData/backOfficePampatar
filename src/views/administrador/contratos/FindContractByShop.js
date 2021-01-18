import React, {useEffect, useState} from 'react'
import {
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Badge,
    Breadcrumb, 
    BreadcrumbItem, 
    UncontrolledTooltip  
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

function FindContractByShop(props) {
    let id = props.match.params.id;

    const [loading, setloading]             = useState(true);
    const [search,  setSearch]              = useState(true);
    const [sending, setsending]             = useState(false);
    const [data,    setData]                = useState([]);

    useEffect(() => {
        let url = '/setting/seller/contract/shop/'+id;
        if(loading){
            if(search){
                setSearch(false);
                axios.get(url)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data.data.rsShopContract);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    });

    if(!loading) {
        if(data.length > 0){
            return (
                <div>
                    <h1 className="h4 mb-4">
                        Listado de contratos para la tienda: <span className="font-weight-bold">{data[0].shop.name}</span> - <Link to="/findContract" className="btn btn-sm btn-info">Volver a la lista</Link>
                    </h1>
                    <Row>
                        {data.map((item, key) => {
                            let shop = item;
                            let contract = item.contractDesc;
                            let date = item.createdAt.split('T');
                            return (
                                <Col key={key} md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                <i className="mdi mdi-border-all mr-2"></i>Contrato: 
                                                <strong className="text-primary ml-2">{contract.number}</strong>
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <h6><i className="fa d-none fa-calendar-alt mr-3"></i>Creación: {date[0]}</h6>
                                            <hr/>
                                            <h5 className="font-weight-bold">Datos del contrato: </h5>
                                            <h6 className="mt-4">
                                                <i className="fa d-none fa-calendar-alt mr-3"></i>
                                                Inicio: <strong>{contract.inicio}</strong> - fin: <strong>{contract.fin}</strong>
                                            </h6>

                                            <h6>Número de productos: <span className="font-weight-bold">{contract.comProduct}</span></h6>
                                            <h6>Stock mínimo por producto: <span className="font-weight-bold">{contract.minStock}</span></h6>
                                            <h6>Porcentaje por producto: <span className="font-weight-bold">{shop.proPercen}</span></h6>
                                            
                                            <hr/>
                                            
                                            <h6>Número de servicios: <span className="font-weight-bold">{contract.comService}</span></h6>
                                            <h6>Porcentaje por servicios: <span className="font-weight-bold">{shop.servPercen}</span></h6>
                                            
                                            <hr/>
                                            <h6 className="font-weight-bold">Nota:</h6>
                                            <h6>
                                                {contract.nota}
                                            </h6>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            )
        }else{
            return (
                <h1 className="h4 mb-3 font-weight-bold">Sin contratos efectuados.</h1>
            )
        }
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Cargando ..</h1>
            </div>
        )
    }
}

export default withRouter(FindContractByShop);
