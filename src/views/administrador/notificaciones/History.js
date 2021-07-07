import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import moment from "moment"
import InlineSpinner from '../../spinner/InlineSpinner';

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

function History() {

    const [loading, setloading]   = useState(true);
    const [search,  setsearch]    = useState(true);
    const [role,    setrole]      = useState(null);

    const [data,    setdata]      = useState(null);

    const [showItem, setshowItem] = useState(null);
    const [showModalItem, setshowModalItem] = useState(false);

    const handleClose = () => {
        setshowModalItem(!showModalItem);
        setshowItem(null);
    }

    const showNotification = (item) => {
        setshowModalItem(true);
        setshowItem(item);
    }

    useEffect(() => {
        if(loading){
            if (search) {
                setsearch(false);
            
                let urlRole = '/GEt/AcTIvE/roLe/';
                let url     = '/GEt/NoTifiCATION/useRS/ROLE/';

                let urlget  = '/gEt/admin/nOtIfIcAtIoNs/HISTORY';

                /*
                    axios.get(urlRole).then((res) => {
                        //console.log(res.data);
                        let roles = res.data;
                        let thisRole = roles.find(item => item.name === 'Administrador');

                        setrole(thisRole);
                        url     = url+thisRole.id;
                    }).catch((err) => {
                        console.error(err);
                    });
                */
               
                axios.get(urlget).then((res) => {
                    console.log(res.data);
                    setdata(res.data);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    });

    console.log(showItem);

    if(!loading){
        return (
            <div>

                <Modal isOpen={showModalItem} toggle={handleClose}>
                    <ModalHeader toggle={handleClose}>
                        <span className="font-weight-bold">
                            Datos de la notificación
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        {showItem !== null &&
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <h6 className="mb-1">
                                            Título
                                        </h6>
                                        <h3 className="font-weight-bold mb-0">
                                            {showItem.body.title}
                                        </h3>
                                    </div>
                                </div>
                                <hr />
                                <h6 className="small">
                                    Emitido por: 
                                    <span className="badge mx-2 badge-sm badge-info font-weight-bold">
                                        {showItem.from}
                                    </span> 
                                    - 
                                    <span className="badge mx-2 badge-sm badge-light font-weight-bold">
                                        {moment(showItem.createdAt).format("DD-MM-YYYY")}
                                    </span>
                                </h6>
                                <hr />
                                <h6 className="mb-1">
                                    Mensaje:
                                </h6>
                                <p>
                                    {showItem.body.text}.
                                </p>
                                <h6 className="mb-1">
                                    Nota adicional:
                                </h6>
                                <p>
                                    {showItem.body.extra}.
                                </p>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </Modal>

                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Historial de envios</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">Historial de envios</h1>

                <Row>
                    {(data !== null) &&
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="mb-0">
                                            Notificaciones enviadas
                                        </h6>
                                        <Link to="/notificationsSend" className="btn btn-sm btn-info">
                                            Enviar notificación
                                        </Link>
                                    </div>
                                </div>
                                <CardBody className="border-top">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Título</th>
                                                <th>Fecha de envío</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (Array.isArray(data) && data.length > 0)
                                                ?
                                                    <Fragment>
                                                        {data.map((item, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td>
                                                                        {item.NotificationType}
                                                                    </td>
                                                                    <td>
                                                                        <p style={{width: "180px"}} className="mb-0">
                                                                            {item.body.title}
                                                                        </p>
                                                                    </td>
                                                                    <td>
                                                                        {moment(item.createdAt).format("DD-MM-YYYY")}
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => showNotification(item)} className="btn px-4 btn-primary btn-sm">
                                                                            <i className="fa fa-eye"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </Fragment>
                                                :
                                                    <tr>
                                                        <td className="text-center" colSpan="20">
                                                            Sin notificaciones
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    }
                </Row>
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Historial de envios</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">Historial de envios</h1>
                <div className="py-5">
                    <InlineSpinner />
                </div>
            </div>
        )
    }
}

export default History
