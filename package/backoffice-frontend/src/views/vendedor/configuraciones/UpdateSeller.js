import React, {useState, useEffect, useRef, Fragment} from 'react'
import {useSelector} from 'react-redux'
import Datetime from "react-datetime";
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem,
    FormGroup,
    CustomInput,
    Input
} from 'reactstrap';
import GenderSelect from '../../../components/selects/GenderSelect';
import NationalitySelect from '../../../components/selects/NationalitySelect';

//styles
import "react-datetime/css/react-datetime.css";
import PhoneMultiple from '../../../components/phones/phoneMultiple';
import UserIndentityDocument from '../../../components/helpers/userIndentityDocument'


function UpdateSeller() {

    let urlUpdate = '/shop/config';
    const backoffice = useSelector(state => state.backoffice);

    //data
    const requestId = '';

    //user
    const [firstName,      setfirstName]            = useState('');
    const [lastName,       setlastName ]            = useState('');
    const [genderId,       setgenderId]             = useState('');
    const [nationalityId,  setnationalityId ]       = useState('');
    const [birthDate,      setbirthDate ]           = useState('');
    const [phone,          setphone ]               = useState(null);
    const [document,       setdocument ]            = useState(null);
    
    //store
    const [logo, setlogo ]                                          = useState(null);
    const [shopDescription, setshopDescription]                     = useState('');
    const [startActivityAttachment, setstartActivityAttachment ]    = useState(null);
    const [employees, setemployees ]                                = useState('');
    
    //payment
    const [bank,        setbank]                     = useState(null);
    const [accountType, setaccountType]              = useState(null);
    const [owner,       setowner]                    = useState('');
    const [rut,         setrut]                      = useState('');
    const [number,      setnumber]                   = useState('');

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">Actualizar datos de la tienda</h1>
            <form action="">
                <Row>
                    <Col md="6">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos del usuario
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Nombre</label>
                                            <input 
                                                type="text"
                                                //id="warehouseName" 
                                                //value={name}
                                                //onChange={(e) => setname(e.target.value)}
                                                placeholder="Nombre" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Apellido</label>
                                            <input 
                                                type="text"
                                                //id="warehouseName" 
                                                //value={name}
                                                //onChange={(e) => setname(e.target.value)}
                                                placeholder="Apellido" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Fecha de nacimiento</label>
                                            <Datetime
                                                locale="es"
                                                //value={inicio}
                                                //onChange={(date) => setinicio(date)}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat={false}
                                                inputProps={{ placeholder: "Fecha de nacimiento" }}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Género</label>
                                            <GenderSelect />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Nacionalidad</label>
                                            <NationalitySelect />
                                        </div>
                                    </Col>
                                    <Col md="12">     
                                        <UserIndentityDocument />
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Teléfonos</label>
                                            <PhoneMultiple />
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos de la tienda
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <label htmlFor="">¿Tiene inicio de actividades?</label>
                                            <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="Si" />
                                            <CustomInput type="radio" id="exampleCustomRadio4" name="customRadio" label="No" />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Número de empleados</label>
                                            <input 
                                                type="number"
                                                //id="warehouseName"
                                                min="0" 
                                                //value={name}
                                                //onChange={(e) => setname(e.target.value)}
                                                placeholder="N° de empleados" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Descripción</label>
                                            <textarea 
                                            placeholder="Ingrese una descripción"
                                            name="" 
                                            id=""
                                            cols="30" 
                                            rows="4" 
                                            className="form-control"></textarea>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default UpdateSeller
