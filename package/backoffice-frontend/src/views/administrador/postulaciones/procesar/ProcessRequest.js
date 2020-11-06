import React, {useState, useEffect, Fragment} from 'react'
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
import axios from 'axios'
import InlineSpinner from '../../../spinner/InlineSpinner';

const ProcessRequest = () => {

    const [loading, setloading]             = useState(true);
    const [search,  setSearch]              = useState(true);
    const [sending, setsending]             = useState(false);
    const [data,    setData]                = useState([]);
    //const [seeIdDetails, setSeeIdDetails]   = useState(true);
    const [seeItem, setSeeItem]             = useState(null);
    const [errormessage, seterrormessage]   = useState('');
    const [successmessage, setsuccessmessage]   = useState('');

    useEffect(() => {
        let url = '/setting/seller/shoptRequest';
        if(loading){
            if(search){
                setSearch(false);
                axios.get(url)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data.rsShopRequestByStatus);
                    setloading(false);
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    });

    const seeDetails = (item) => {
        //setSeeIdDetails(item.shopRequest.id);
        setSeeItem(item);
    }

    const handlePostulationRequest = (action) => {
        let urlPostulation = '/setting/seller/pre';

        let data = {
            shopRequestId:seeItem.id,
            action
        }

        setsending(true);
        seterrormessage('');
        setsuccessmessage('');

        axios({
            url: urlPostulation,
            method: 'post',
            data: data
        }).then((res) => {
            console.log(res.data);
            setsending(false);

            if(!res.data.data.result){
                console.log(res.data.data.message);
                seterrormessage(res.data.data.message);
            }else{
                setSeeItem(null);
                setsuccessmessage('Solicitud procesada correctamente');
                setloading(true);
                setSearch(true);
            }
        }).catch((err) => {
            console.error(err);
            setsending(false);
        });
    }

    if(!loading){
        if(seeItem === null){
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Procesar postulaciones</h1>
                    {(successmessage !== '') &&
                        <div className="alert alert-success">
                            <p className="mb-0">
                                {successmessage}
                            </p>
                        </div>
                    }
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle><i className="mdi mdi-border-all mr-2"></i>Lista de postulaciones</CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Nombre de la tienda</th>
                                                <th>Empleados</th>
                                                <th>Canales de venta</th>
                                                <th>Fecha de creación</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(data.length > 0 && data.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>
                                                            <span href="#" id={`tooltip-brand-${item.id}`}>
                                                                {item.Account.Person.firstName+' '+item.Account.Person.lastName}
                                                            </span>
                                                            <UncontrolledTooltip placement="top" target={`tooltip-brand-${item.id}`}>
                                                                {item.marca}
                                                            </UncontrolledTooltip>
                                                        </td>
                                                        <td>{item.employees}</td>
                                                        <td>
                                                            {item.salesChannels.length > 0 && item.salesChannels.map((subitem, subkey) => {
                                                                return (
                                                                    <Badge key={subkey} color="primary" className="mx-1">
                                                                        {subitem.name}
                                                                    </Badge>
                                                                )
                                                            })}
                                                        </td>
                                                        <td>
                                                            
                                                        </td>
                                                        <td>
                                                            <button onClick={() => seeDetails(item) } className="border-0 btn-sm btn btn-info">
                                                                Ver detalles
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </Table>
                                    {(data.length === 0) &&
                                        <p colSpan="5">
                                            Sin solicitudes pendientes por aprobar
                                        </p>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }else{
            let item = seeItem;
            return (
                <div>
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Postulaciones</a></BreadcrumbItem>
                        <BreadcrumbItem><button onClick={() => setSeeItem(null)} className="btn-unstyled text-primary">Procesar</button></BreadcrumbItem>
                        <BreadcrumbItem active>Detalles de la postulación</BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="h4 mb-3 font-weight-bold">Detalles de la postulación: {item.marca}</h1>
                    {(errormessage !== '') &&
                        <div className="alert alert-danger">
                            <p className="mb-0">
                                {errormessage}
                            </p>
                        </div>
                    }
                    <Row>
                        <Col md="5">
                            <Card>
                                <div className="p-3">
                                    <CardTitle><i className="mdi mdi-account mr-2"></i>Datos del postulante</CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <h4><span className="font-weight-bold">Nombre</span>: {item.Account.Person.firstName+' '+item.Account.Person.lastName}</h4>
                                    <h6>
                                        <span>Género: {item.Account.Person.gender}</span>
                                    </h6>
                                    <h6>
                                        <span>Nacionalidad: {item.Account.Person.Nationality.name}</span>
                                    </h6>
                                    <hr/>
                                    <h6>
                                        <span>Email: {item.Account.email}</span>
                                    </h6>
                                    <h6>
                                        {typeof item.Account.preference === 'object' &&
                                            <Fragment>
                                                <h6 className="font-weight-bold">
                                                    Preferencia:
                                                </h6>
                                                <Badge color="info" className="mx-r">
                                                    {item.Account.preference.name}
                                                </Badge>
                                            </Fragment>
                                        }

                                        {typeof item.Account.preference === 'array' &&
                                            <Fragment>
                                                <h6 className="font-weight-bold">Preferencias:</h6>
                                                {item.Account.preference.length > 0 && item.Account.preference.map((subitem, subkey) => {
                                                    return (
                                                        <Badge key={subkey} color="info" className="mx-r">
                                                            {subitem.name}
                                                        </Badge>
                                                    )
                                                })}
                                            </Fragment>
                                        }
                                    </h6>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="7">
                            <Card>
                                <div className="p-3">
                                    <CardTitle><i className="mdi mdi-store mr-2"></i>Datos de la tienda</CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <h4><span className="font-weight-bold">Nombre de la tienda</span>: {item.marca}</h4>
                                    <p>
                                        Descripción: {item.descShop}
                                    </p>
                                    <hr/>
                                    {typeof item.affirmations === 'object' &&
                                        <Fragment>
                                            <h6 className="font-weight-bold">
                                                Afirmación:
                                            </h6>
                                            <p>
                                                {item.affirmations.name}
                                            </p>
                                        </Fragment>
                                    }

                                    {typeof item.affirmations === 'array' &&
                                        <Fragment>
                                            <h6 className="font-weight-bold">Afirmaciones:</h6>
                                            {item.affirmations.length > 0 && item.affirmations.map((subitem, subkey) => {
                                                return (
                                                    <p key={subkey} className="mx-1">
                                                        {subitem.name}
                                                    </p>
                                                )
                                            })}
                                        </Fragment>
                                    }

                                    <h6>
                                        ¿Tiene inicio de actividades? - <strong>{item.startActivity ? 'si' : 'no'}</strong>
                                    </h6>
                                    <h6>
                                        ¿Cuenta con tienda física? - <strong>{item.isStore ? 'si' : 'no'}</strong>
                                    </h6>
                                    <hr/>
                                    <h6>
                                        Número de empleados: <strong>{item.employees}</strong>
                                    </h6>
                                    <h6>
                                        Canales de venta: {item.salesChannels.length > 0 && item.salesChannels.map((subitem, subkey) => {
                                                                return (
                                                                    <Badge key={subkey} color="info" className="mx-1">
                                                                        {subitem.name}
                                                                    </Badge>
                                                                )
                                                            })}
                                    </h6>
                                    <hr/>
                                    <h6 className="font-weight-bold">Contacto</h6>
                                        <Fragment>
                                            <h6 className="font-weight-bold">Teléfonos:</h6>
                                            {item.phone.length > 0 && item.phone.map((subitem, subkey) => {
                                                return (
                                                    <p key={subkey} className="mb-0">
                                                        <i className="fa fa-phone mr-2"></i>{subitem.phoneNmber}
                                                    </p>
                                                )
                                            })}
                                        </Fragment>
                                    

                                    {/*typeof shop.phone === 'array' &&
                                        <Fragment>
                                            <h6 className="font-weight-bold">Teléfonos:</h6>
                                            {shop.phone.length > 0 && shop.phone.map((subitem, subkey) => {
                                                return (
                                                    <p key={subkey} className="mx-1">
                                                        {subitem.phoneNmber}
                                                    </p>
                                                )
                                            })}
                                        </Fragment>
                                    */}
                                </CardBody>
                            </Card>
                            <div className="my-2">
                                {(!sending) &&
                                    <Fragment>
                                        <button onClick={() => handlePostulationRequest('pre')} className="btn btn-info">
                                            <i className="fa fa-check mr-2"></i>Aceptar
                                        </button>
                                        <button onClick={() => handlePostulationRequest('deny')} className="btn btn-primary">
                                            <i className="fa fa-times mr-2"></i>Negar
                                        </button>
                                    </Fragment>
                                }
                                {(sending)&&
                                    <InlineSpinner />
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            )
        }
    }else{
        return (
            <div>
                <h1 className="h4 font-weight-bold">Procesar postulaciones</h1>
                <InlineSpinner />
            </div>
        );
    }
}

export default ProcessRequest
