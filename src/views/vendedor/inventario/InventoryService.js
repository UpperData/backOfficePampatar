import React, {useState} from 'react'
import axios from 'axios'
import Datetime from 'react-datetime';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Breadcrumb, 
    BreadcrumbItem
    //CustomInput,
} from 'reactstrap';
import {Link} from "react-router-dom"
import ServicesSelect from '../../../components/selects/servicesSelect';
import moment from 'moment'

//styles
import "react-datetime/css/react-datetime.css";
import ServiceTypesSelect from '../../../components/selects/ServiceTypesSelect';
import TimePanel from '../../../components/time/TimePanel';
import InlineSpinner from '../../spinner/InlineSpinner';

//lang
require("moment/locale/es");

function InventoryService(props) {

    const [sending,             setsending]         = useState(false);
    const [sended,              setsended]          = useState(false);
    const [errors,              seterrors]          = useState({});
    const [successmessage,      setsuccessmessage]  = useState('');
    const [errormessage,        seterrormessage]    = useState('');

    const [searchList,          setsearchList]      = useState(false);

    const [service,             setservice]         = useState(null);
    const [serviceData,         setserviceData]     = useState(null);
    const [servicesList,        setservicesList]    = useState(null);

    const [days,                setdays]            = useState(null);
    const [serviceId,           setserviceId]       = useState(null);
    const [serviceTypeId,       setserviceTypeId]   = useState(null);
    const [dateStart,           setdateStart]       = useState(moment(new Date(), "YYYY-MM-DD"));
    const [dateEnd,             setdateEnd]         = useState(null);
    const [note,                setnote]            = useState('');
    const [price,               setprice]           = useState('');
    const [quantity,            setquantity]        = useState('');
    const type                  = 'in';

    const reset = () => {
        if(props.edit){
            setservice(null);
            setserviceData(null);
            setservicesList(null);
        }
        setsuccessmessage('');
        seterrormessage('');

        setsending(false);
        seterrors({});
        setdays(null);
        setserviceId(null);
        setserviceTypeId(null);
        setdateStart(moment(new Date(), "YYYY-MM-DD"));
        setdateEnd(null);
        setnote('');
        setprice('');
        setquantity('');
        setsearchList(false);

        setTimeout(() => {
            setsuccessmessage("");
        }, 5000);
    }

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //serviceId
        if(!props.edit){
            if(serviceId === null){
                thiserrors.serviceId = 'Seleccione un servicio';
                errorsCount++;
            }
        }

        //serviceType
        if(serviceTypeId === null){
            thiserrors.serviceTypeId = 'Seleccione un tipo servicio';
            errorsCount++;
        }

        //console.log(moment().isAfter(moment(dateStart)));

        //serviceId
        if(dateStart === null || dateStart === ''){
            thiserrors.dateStart = 'Indique la fecha de inicio';
            errorsCount++;
        }

        //serviceId
        if(dateEnd === null || dateEnd === ''){
            thiserrors.dateEnd = 'Indique la fecha de culminación';
            errorsCount++;
        }

        if(!props.edit){
            let newDate = new Date();

            if(dateStart !== null && moment(dateStart, "YYYY-MM-DD").isBefore(moment(newDate, "YYYY-MM-DD").subtract(1, "days"))){
                thiserrors.dateStart = 'La fecha de inicio debe ser igual ó superior a la fecha de hoy';
                errorsCount++;
            }

            if(dateEnd !== null && moment(dateStart).isAfter(moment(dateEnd)) ){
                thiserrors.dateStart = 'Esta fecha debe ser menor a la culminación';
                thiserrors.dateEnd   = 'Esta fecha debe ser posterior al inicio.';
                errorsCount++;
            }
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
        /*
            if(price === ''){
                thiserrors.price = 'Debe ingresar un precio';
                errorsCount++;
            }
        */

        console.log(days);

        if(days === null || (Array.isArray(days) && days.length === 0)){
            thiserrors.hours = 'Debe ingresar un horario para su servicio.';
            errorsCount++;
        }else{
            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                let start   = moment(element.hours.start, 'HH:mm');
                let end     = moment(element.hours.end, 'HH:mm');

                console.log(start);
                console.log(end);
                console.log(start.isAfter(end));
                
                if(element.day === null){
                    thiserrors.hours = 'Recuerde que para asignar un horario es necesario seleccionar un dia de la semana.';
                    errorsCount++;
                }else if((element.hours.start === "" || element.hours.start === null) || (element.hours.end === "" || element.hours.end === null)){
                    thiserrors.hours = 'Recuerde todo horario ingresado debe incluir una hora de comienzo y una de culminacion.';
                    errorsCount++;
                }else if(start.isAfter(end)){
                    thiserrors.hours = 'la hora de culminación debe ser posterior a la hora de inicio.';
                    errorsCount++;
                }
            }
        }

        if(errorsCount > 0){
            console.log(thiserrors);
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

            let formatDays = [];

            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                let formatElement = {};
                formatElement.id        = element.day.value;
                formatElement.name      = element.day.label;
                formatElement.hours     = {};

                formatElement.hours.start   = moment(element.hours.start).format('HH:mm');
                formatElement.hours.end     = moment(element.hours.end).format('HH:mm');

                formatDays.push(formatElement);
            }

            let data = {
                //statusId: 1,
                serviceTypeId: serviceTypeId.value,
                serviceId: serviceId.value,
                note,
                //price: Number(price),
                type,
                timetable: {
                    days: formatDays,
                    dateStart: moment(dateStart).format('DD/MM/YYYY'),
                    dateEnd: moment(dateEnd).format('DD/MM/YYYY')
                },
                quantity:Number(quantity)
            }

            console.log(data);

            axios({
                method: 'post',
                url:urlsend,
                data
            }).then((res) => {
                console.log(res.data);
                setsending(false);
                if(res.data.data.result){
                    reset();
                    setsended(true);
                    window.scrollTo({top: 10, behavior: 'smooth'});
                    setsuccessmessage(res.data.data.message);
                }else{
                    window.scrollTo({top: 10, behavior: 'smooth'});
                    seterrormessage(res.data.data.message);
                }
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }
    }

    const edit = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let validation = validate();
        
        if(validation){
            setsending(true);
            let urlsend = '/seller/serVice/inVEntory/UPDaTe/';

            let formatDays = [];

            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                let formatElement = {};
                formatElement.id        = element.day.value;
                formatElement.name      = element.day.label;
                formatElement.hours     = {};

                formatElement.hours.start   = moment(element.hours.start).format('HH:mm');
                formatElement.hours.end     = moment(element.hours.end).format('HH:mm');

                formatDays.push(formatElement);
            }

            let data = {
                inventoryServiceId: serviceData.id,
                serviceTypeId: serviceTypeId.value,
                note,
                price: Number(price),
                type: 'out',
                timetable: {
                    days: formatDays,
                    dateStart: moment(dateStart).format('DD/MM/YYYY'),
                    dateEnd: moment(dateEnd).format('DD/MM/YYYY')
                },
                quantity:Number(quantity)
            }

            console.log(data);

            axios({
                method: 'put',
                url:urlsend,
                data
            }).then((res) => {
                console.log(res.data);
                setsending(false);
                if(res.data.data.result){
                    reset();
                    setsended(true);
                    window.scrollTo({top: 10, behavior: 'smooth'});
                    setsuccessmessage('¡Servicio editado satisfactoriamente!')
                }else{
                    window.scrollTo({top: 10, behavior: 'smooth'});
                    seterrormessage(res.data.data.message);
                }
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
        }
    }

    const changeService = (service) => {
        setservice(service);
        setserviceData(null);
        setsearchList(true);

        let url = '/seller/seRvice/invenTory/GETALL/'+service.value;

        axios.get(url).then((res) => {
            console.log(res.data);
            setsended(false);
            setservicesList(res.data.data.rsInventoryServiceList);
            setsearchList(false);
        }).catch((err) => {
            console.error(err);
        })
    }

    const setserviceDataToEdit = (service) => {
        setserviceData(service);
        setquantity(service.quantity);
        setserviceTypeId({ value: service.serviceTypeId });
        setprice(service.price);
        setnote(service.note);
        setdateStart(service.timetable.dateStart);
        setdateEnd(service.timetable.dateEnd);
        let formatDays = [];

        for (let i = 0; i < service.timetable.days.length; i++) {
            const element = service.timetable.days[i];
            let formatElement = {};

            formatElement.id            = i+1;
            formatElement.day           = { value: element.id, label: element.name };
            formatElement.value         = element.id;
            formatElement.label         = element.name;
            formatElement.hours         = {};

            formatElement.hours.start   = moment(element.hours.start, 'HH:mm').format('HH:mm');
            formatElement.hours.end     = moment(element.hours.end, 'HH:mm').format('HH:mm');

            formatDays.push(formatElement);
        }

        setdays(formatDays);
    }

    const addNewService = () => {
        setsended(false);
        setsuccessmessage("");
        seterrormessage("");
    }

    return (
        <div>
            {!props.edit
            ?
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Inventario</a></BreadcrumbItem>
                    <BreadcrumbItem active>Inventario de Servicios</BreadcrumbItem>
                </Breadcrumb>
            :
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Inventario</a></BreadcrumbItem>
                    <BreadcrumbItem active>Actualizar servicio</BreadcrumbItem>
                </Breadcrumb>
            }

            {!props.edit 
            ? 
                <h1 className="h4 mb-3 font-weight-bold">
                    Inventario de Servicios
                </h1>
            :
                <h1 className="h4 mb-3 font-weight-bold">
                    Actualizar servicio
                </h1>
            }

            {!props.edit 
            ? 
                <p className="mb-3">
                    En esta sección puede ingresar la información detallada de los cursos y talleres que desee impartir dentro de Pampatar.
                </p>
            :
                <p className="mb-3">
                    Modifica y actualiza la información de tus talleres y servicios en esta sección.
                </p>
            }

            {(errormessage !== '') &&
                <div className="alert alert-warning">
                    {errormessage}
                </div>
            }

            {(successmessage !== '') &&
                <div className="alert alert-success">
                    {successmessage}
                </div>
            }

            {(sended && !props.edit) &&
                <button onClick={() => addNewService()} className="btn mt-2 btn-primary">
                    Agregar nuevo servicio
                </button>
            }

            {props.edit &&
                <Card>
                    <div className="p-3">
                        <CardTitle>
                            Seleccione un servicio
                        </CardTitle>
                    </div>
                    <CardBody className="border-top">
                        <ServicesSelect value={service} onChange={changeService} />
                    </CardBody>
                </Card>
            }

            {searchList &&
                <div className="py-5 mt-5">
                    <InlineSpinner />
                </div>
            }

            {(!searchList && !sended && props.edit && service !== null && servicesList !== null && serviceData === null) &&
            <Card>
                <div className="p-3">
                    Servicios de este tipo en el <strong>inventario</strong>
                </div>
                <CardBody className="border-top">
                    <Row>
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Precio
                                        </th>
                                        <th>
                                            Cantidad
                                        </th>
                                        <th>
                                            Fecha de inicio
                                        </th>
                                        <th>
                                            
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicesList !== null && servicesList.length > 0 &&
                                        servicesList.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.id}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.timetable.dateStart}</td>
                                                    <td className="text-right">
                                                        <button onClick={() => setserviceDataToEdit(item)} className="btn btn-warning font-weight-bold">
                                                            <i className="fa fa-edit mr-2"></i>Seleccionar
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    {servicesList !== null && servicesList.length === 0 &&
                                        <tr>
                                            <td colSpan="20" className="text-center">
                                                Ningun servicio de este tipo encontrado en el inventario, intente agregar uno en la sección <Link className="font-weight-bold" to="/service/inventory">inventario de servicios.</Link>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            }

            {((!sended && !props.edit) || (!sended && props.edit && service !== null && serviceData !== null)) &&
            <form onSubmit={(e) => !props.edit ? send(e) : edit(e)} action="">
                <Row>
                    <Col md="12">
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    {props.edit &&
                                        <button className="mr-3 btn" onClick={() => setserviceData(null)}>
                                            <i className="fa fa-angle-left"></i>
                                        </button>
                                    }

                                    Datos del inventario 
                                    
                                    {props.edit &&
                                        <>
                                            <span className="ml-2">Nro</span> {serviceData !== null ? <span className="font-weight-bold text-primary ml-2">{+serviceData.id}</span> : ''}
                                        </>
                                    }
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    {!props.edit &&
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
                                    }
                                    <Col md={props.edit ? "12" : "6"}>
                                        <div className={((typeof errors === 'object' && errors.hasOwnProperty('serviceTypeId') ? 'has-error' : '') +' form-group')}>
                                            <label htmlFor="">Tipo de servicio</label>
                                            <ServiceTypesSelect value={serviceTypeId} onChange={setserviceTypeId} />
                                            {(typeof errors === 'object' && errors.hasOwnProperty('serviceTypeId')) &&
                                                <div className="help-block text-danger font-weight-bold">
                                                    <small>
                                                        {errors.serviceTypeId}
                                                    </small>
                                                </div>
                                            }
                                        </div>
                                    </Col>
                                    <Col md="4">
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
                                    <Col md="4">
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
                                    <Col md="4">
                                        <div className="form-group">
                                            <label htmlFor="">Número de personas:</label>
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
                                    {/* 
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Precio del servicio:</label>
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
                                    */}
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
                                    <Col md="12">
                                        {(typeof errors === 'object' && errors.hasOwnProperty('hours')) &&
                                            <div className="alert alert-danger font-weight-bold">
                                                <p className="mb-0 small">
                                                    {errors.hours}
                                                </p>
                                            </div>
                                        }
                                        <div className="form-group">
                                            <label htmlFor="">Horario:</label>
                                            <TimePanel value={days} onChange={setdays} />
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        {props.edit &&
                            <p className="my-2 text-right">
                                <button disabled={sending} type="submit" className="btn font-weight-bold btn-lg btn-warning">
                                    {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : 'Editar servicio'}
                                </button>
                            </p>
                        }
                        {!props.edit &&
                            <p className="my-2 text-right">
                                <button disabled={sending} type="submit" className="btn font-weight-bold btn-lg btn-primary">
                                    {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : 'Añadir servicio'}
                                </button>
                            </p>
                        }
                    </Col>
                </Row>
            </form>
            }

        </div>
    )
}

export default InventoryService
