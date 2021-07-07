import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    UncontrolledTooltip,
    Badge,
    Breadcrumb, 
    BreadcrumbItem, 
} from 'reactstrap';

import {useSelector, useDispatch} from 'react-redux'
import InlineSpinner from '../spinner/InlineSpinner' 

function ShowNotification(props) {

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);

    const [data, setdata]       = useState(null);

    const backoffice  = useSelector((state) => state.backoffice);

    let notificationid = props.match.params.id;
    let role      = backoffice.role.name;
    let roleId    = backoffice.role.id;

    const getData = () => {
        console.log("Buscando notificaciones");
        let url     = `/ReAD/notiFiCATions/${roleId}/${notificationid}`;
        let urlget = `Get/NoTifiCATion/OnE/${roleId}/${notificationid}`;
        
        axios.get(url).then((res) => {
            //console.log(res.data);
            axios.get(urlget).then((res) => {
                console.log(res.data);
                setdata(res.data.rows[0]);
                setloading(false);
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            console.error(err);
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

    if(loading){
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><Link to="/notifications/list">Notificaciones</Link></BreadcrumbItem>
                    <BreadcrumbItem><a href="##">Ver notificación</a></BreadcrumbItem>
                    <BreadcrumbItem active>{notificationid}</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Ver notificación
                </h1>
                <InlineSpinner />
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><Link to="/notifications/list">Notificaciones</Link></BreadcrumbItem>
                    <BreadcrumbItem><a href="##">Ver notificación</a></BreadcrumbItem>
                    <BreadcrumbItem active>{notificationid}</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">
                    Ver notificación
                </h1>

                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3 d-none">
                                <CardTitle>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="mb-0">
                                            Datos de la notificación
                                        </h6>
                                    </div>
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <h6>Título:</h6>
                                <h3 className="h1 font-weight-bold">
                                    <i className="fa fa-bell mr-3"></i>{data.body.title}
                                </h3>
                                <hr />
                                <h6>
                                    Mensaje:
                                </h6>
                                <p>
                                    {data.body.text}
                                </p>
                                <hr />
                                <h6 className="d-none">
                                    Extra
                                </h6>
                                <p className="text-muted">
                                    - {data.body.extra}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ShowNotification);
