import React, {useState} from 'react'
import axios from 'axios'
import Datetime from 'react-datetime';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CustomInput,
} from 'reactstrap';
import ServicesSelect from '../../../components/selects/servicesSelect';

//styles
import "react-datetime/css/react-datetime.css";

function InventoryService() {

    const [sending,             setsending]         = useState(false);
    const [errors,              seterrors]          = useState({});
    const [successmessage,      setsuccessmessage]  = useState('');
    const [errormessage,        seterrormessage]    = useState('');

    const [serviceId,           setserviceId]       = useState(null);
    const [serviceTypeId,       setserviceTypeId]   = useState(null);
    const [dateStart,           setdateStart]       = useState(null);
    const [dateEnd,             setdateEnd]         = useState(null);
    const [note,                setnote]            = useState('');
    const [price,               setprice]           = useState('');
    const [quantity,            setquantity]        = useState('');
    const type                  = 'in';

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //serviceId
        if(serviceId === null){
            thiserrors.serviceId = 'Seleccione un servicio';
            errorsCount++;
        }

        //serviceId
        if(dateStart === null){
            thiserrors.dateStart = 'Indique la fecha de inicio';
            errorsCount++;
        }

        //serviceId
        if(dateEnd === null){
            thiserrors.dateEnd = 'Indique la fecha de culminación';
            errorsCount++;
        }

        //note
        if(note.trim() === ''){
            thiserrors.note = 'Añada una nota';
            errorsCount++;
        }

        //quantity
        if(quantity === ''){
            thiserrors.quantity = 'Ingrese una cantidad';
            errorsCount++;
        }

        //price
        if(price === ''){
            thiserrors.price = 'Debe ingresar un precio';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const send = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let validation = validate();
        
        if(validation){
            setsending(true);
            let urlsend = '/seller/inventory/serviceProcess/';

            let data = {
                serviceId: serviceId.value,
                note,
                price: Number(price),
                type,
                timetable: {
                    dateStart,
                    dateEnd
                },
                quantity:Number(quantity)
            }

            console.log(data);
        }
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                Icorporar servicios
            </h1>

            {(errormessage !== '') &&
                <div className="alert alert-danger">
                    {errormessage}
                </div>
            }

            {(successmessage !== '') &&
                <div className="alert alert-success">
                    {successmessage}
                </div>
            }

            <form onSubmit={(e) => send(e)} action="">
                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos del servicio
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                        <div className={((typeof errors === 'object' && errors.hasOwnProperty('dateStart') ? 'has-error' : '') +' form-group')}>
                                            <label htmlFor="">Seleccionar servicio</label>
                                            <ServicesSelect value={serviceId} onChange={setserviceId} />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('serviceId')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.serviceId}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Fecha de inicio</label>
                                            <Datetime
                                                locale="es"
                                                value={dateStart}
                                                onChange={(date) => setdateStart(date)}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat={false}
                                                inputProps={{ 
                                                    placeholder: "Fecha de inicio", 
                                                    className: ((typeof errors === 'object' && errors.hasOwnProperty('dateStart') ? 'is-invalid' : '') +' form-control') 
                                                }}
                                            />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('dateStart')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.dateStart}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Fecha de culminación</label>
                                            <Datetime
                                                locale="es"
                                                value={dateEnd}
                                                onChange={(date) => setdateEnd(date)}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat={false}
                                                inputProps={{ 
                                                    placeholder: "Fecha de culminación", 
                                                    className: ((typeof errors === 'object' && errors.hasOwnProperty('dateEnd') ? 'is-invalid' : '') +' form-control') 
                                                }}
                                            />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('dateEnd')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.dateEnd}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Cantidad:</label>
                                            <input 
                                                type="number" 
                                                value={quantity}
                                                onChange={(e) => setquantity(e.target.value)}
                                                placeholder="Cantidad"
                                                className={((typeof errors === 'object' && errors.hasOwnProperty('quantity') ? 'is-invalid' : '') +' form-control')}
                                                min="0"
                                            />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('quantity')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.quantity}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Precio:</label>
                                            <input 
                                                type="number" 
                                                value={price}
                                                onChange={(e) => setprice(e.target.value)}
                                                placeholder="Precio"
                                                className={((typeof errors === 'object' && errors.hasOwnProperty('price') ? 'is-invalid' : '') +' form-control')}
                                                min="0"
                                            />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('price')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.price}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Nota:</label>
                                            <textarea
                                            placeholder="Escriba una nota" 
                                            value={note}
                                            onChange={(e) => setnote(e.target.value)}
                                            name="" 
                                            id="" 
                                            cols="30" 
                                            rows="5" 
                                            className={((typeof errors === 'object' && errors.hasOwnProperty('note') ? 'is-invalid' : '') +' form-control')}
                                            ></textarea>
                                            {(typeof errors === 'object' && errors.hasOwnProperty('note')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.note}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <p className="my-2 text-right">
                            <button type="submit" className="btn btn-primary">
                                Incorporar inventario
                            </button>
                        </p>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default InventoryService
