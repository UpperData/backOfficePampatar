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
import {useSelector} from 'react-redux'
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

    const backoffice = useSelector(state => state.backoffice);

    let url = '/setting/seller/shoptRequest';

    const getData = () => {
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

    useEffect(() => {
        if(loading){
            getData();
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
                window.scrollTo({top: 10, behavior: 'smooth'});
                seterrormessage(res.data.data.message);
            }else{
                setSeeItem(null);
                window.scrollTo({top: 10, behavior: 'smooth'});
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
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Postulaciones</a></BreadcrumbItem>
                        <BreadcrumbItem active>Procesar</BreadcrumbItem>
                    </Breadcrumb>
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
                                    <CardTitle>
                                        <i className="fa fa-list-alt mr-2"></i>Lista de postulaciones
                                    </CardTitle>
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
                                                                {item.marca}
                                                            </span>
                                                            <UncontrolledTooltip placement="top" target={`tooltip-brand-${item.id}`}>
                                                                {item.Account.Person.firstName+' '+item.Account.Person.lastName}
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
                                                            {item.createdAt.split('T')[0]}
                                                        </td>
                                                        <td>
                                                            <button 
                                                            onClick={() => seeDetails(item) } 
                                                            className="border-0 btn-sm btn btn-info shadow-sm"
                                                            >
                                                                <i className="fa fa-eye mr-2"></i>
                                                                Ver detalles
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </Table>
                                    {(data.length === 0) &&
                                        <p className="text-center">
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
            let preference = item.Account.preference;
            let affirmations = item.affirmations;
            let gender = backoffice.genders.rows.find(gender => gender.id === item.Account.Person.genderId);

            return (
                <div>
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Postulaciones</a></BreadcrumbItem>
                        <BreadcrumbItem><button onClick={() => setSeeItem(null)} className="btn-unstyled text-primary">Procesar</button></BreadcrumbItem>
                        <BreadcrumbItem active>Detalles de la postulación</BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="h4 mb-3 font-weight-bold">Detalles de la postulación: {item.marca}</h1>
                    {(errormessage !== '') &&
                        <div className="alert alert-warning">
                            <p className="mb-0">
                                {errormessage}
                            </p>
                        </div>
                    }
                    <Row>
                        <Col md="5">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        Datos del postulante
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <h6>
                                        <span className="font-weight-bold">Nombre</span>:
                                    </h6>
                                    <h3 className="font-weight-bold mb-3">
                                        <i className="far fa-user mr-2"></i>
                                        {item.Account.Person.firstName+' '+item.Account.Person.lastName}
                                    </h3>
                                    <h6>
                                        <span className="font-weight-bold">Género:</span> <span className="badge badge-info">{gender.name}</span>
                                    </h6>
                                    <h6>
                                        <span className="font-weight-bold">Nacionalidad:</span> <span className="badge badge-info">{item.Account.Person.Nationality.name}</span>
                                    </h6>
                                    <hr/>
                                    <h6>
                                        <span className="font-weight-bold">Email:</span> {item.Account.email}
                                    </h6>
                                    <div>
                                        {(Array.isArray(preference)) ?
                                            <Fragment>
                                                <h6 className="font-weight-bold">
                                                    Preferencias:
                                                    {preference.length > 0 && preference.map((subitem, subkey) => {
                                                        return (
                                                            <Badge key={subkey} color="info" className="mx-2">
                                                                {subitem.name}
                                                            </Badge>
                                                        )
                                                    })}
                                                    </h6>
                                            </Fragment>
                                            :
                                            <Fragment>
                                                <h6 className="font-weight-bold">
                                                    Preferencia:
                                                </h6>
                                                <Badge color="info" className="mr-3">
                                                    {preference.name}
                                                </Badge>
                                            </Fragment>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="7">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i class="fas fa-store-alt"></i>
                                        Datos de la tienda
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <h6>
                                        <span className="font-weight-bold">
                                            Nombre de la tienda
                                        </span>
                                    </h6>
                                    <h3 className="font-weight-bold text-primary">
                                        {item.marca}
                                    </h3>
                                    <p>
                                        <span className="font-weight-bold">Descripción:</span> {item.descShop}
                                    </p>
                                    <hr/>

                                    {(Array.isArray(affirmations)) ?
                                        <Fragment>
                                            <h6 className="font-weight-bold mb-3">Afirmaciones:</h6>
                                            {affirmations.length > 0 && affirmations.map((subitem, subkey) => {
                                                return (
                                                    <p key={subkey} className="mx-1">
                                                        {subitem.name}
                                                    </p>
                                                )
                                            })}
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <h6 className="mb-3">
                                                <span className="font-weight-bold">Afirmación:</span> {affirmations.name}
                                            </h6>
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
                                        <button onClick={() => handlePostulationRequest('pre')} className="btn btn-info mr-3">
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
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Postulaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Procesar</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 font-weight-bold">Procesar postulaciones</h1>
                <InlineSpinner />
            </div>
        );
    }
}

export default ProcessRequest
