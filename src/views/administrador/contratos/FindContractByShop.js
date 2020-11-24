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
                    <h1 className="h4 mb-3 font-weight-bold">Listado de contratos para la tienda: {data[0].shop.name}</h1>
                    <Row>
                        {data.map((item, key) => {
                            let contract = item.contractDesc;
                            let date = item.createdAt.split('T');
                            return (
                                <Col key={key} md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                <i className="mdi mdi-border-all mr-2"></i>Contrato: <strong>{contract.number}</strong>
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <h6><i className="fa d-none fa-calendar-alt mr-3"></i>Creación: {date[0]}</h6>
                                            <hr/>
                                            <h5 className="font-weight-bold">Datos del contrato: </h5>
                                            <h6 className="mt-4">
                                                <i className="fa d-none fa-calendar-alt mr-3"></i>Inicio: {contract.inicio} - fin: {contract.fin}
                                            </h6>
                                            <h6>Número de productos: {contract.comProduct} - Stock mínimo por producto: {contract.minStock}</h6>
                                            <h6>Número de servicios: {contract.comService}</h6>
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
