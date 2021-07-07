import React, {useState} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import ServicesSelect from '../../../components/selects/servicesSelect';
import {Link} from "react-router-dom"

function AddService(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [errors, seterrors] = useState({});

    const [name,     setname]     = useState('');
    const [service, setservice] = useState(null);

    const [searchservice, setsearchservice] = useState(false);
    const [loadingservice, setloadingservice] = useState(true);

    const reset = () => {
        setname('');
        setloading(false);
        setservice(null);
        window.scrollTo({top: 10, behavior: 'smooth'});
    }

    const changeService = (data) => {
        setsearchservice(true);
        setloadingservice(true);
        setsuccessmessage('');
        seterrormessage('');
        
        setservice(data);
        let url = '/services/'+data.value;
        console.log(url);
        axios.get(url).then((res) => {
            console.log(res.data);
            if(res.data.count > 0){
                let data = res.data.rows[0];
                setname(data.name);

                setsearchservice(false);
                setloadingservice(false);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //name
        if(name.trim() === ''){
            thiserrors.name = 'Debe ingresar un nombre para el servicio';
            errorsCount++;
        }else if(name.trim().length < 6){
            thiserrors.name = 'El nombre del servicio ingresado es demasiado corto';
            errorsCount++;
        }else if(name.trim().length > 40){
            thiserrors.name = 'El nombre del servicio ingresado es demasiado largo';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const addWarehouse = (e) => {
        e.preventDefault();
        e.stopPropagation();

        seterrors({});
        setsuccessmessage('');
        seterrormessage('');

        let validation = validate();

        if(validation){
        setsending(true);
            if(props.Edit){

                let url = '/services/edit';
                let data = {
                    id: service.value,
                    name,
                }

                axios({
                    url,
                    method: 'put',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Servicio actualizado satisfactoriamente!')
                        setloading(true);
                        reset();
                        window.scrollTo({top: 10, behavior: 'smooth'});
                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 5000);
                    }else{
                        seterrormessage(res.data.data.message);
                        reset();
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }else{
                
                let url = '/service/add';
                let data = {
                    name
                }

                axios({
                    url,
                    method: 'post',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Servicio creado satisfactoriamente!');
                        reset();
                        window.scrollTo({top: 10, behavior: 'smooth'});
                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 5000);
                    }else{
                        seterrormessage(res.data.data.message);
                        reset();
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }
        }
    }

    if(loading){
        return (
            <div>
                {props.Edit
                ?
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis Servicios</a></BreadcrumbItem>
                        <BreadcrumbItem active>Actualizar servicio</BreadcrumbItem>
                    </Breadcrumb>
                :
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis Servicios</a></BreadcrumbItem>
                        <BreadcrumbItem active>Nuevo servicio</BreadcrumbItem>
                    </Breadcrumb>
                }
                <h1 className="h4 mb-3 font-weight-bold">
                    {props.Edit ? 'Actualizar servicio' : 'Nuevo servicio'}
                </h1>
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
                <InlineSpinner />
            </div>
        )
    }else{
        return (
            <div>
                    {props.Edit
                    ?
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Mis Talleres</a></BreadcrumbItem>
                            <BreadcrumbItem active>Actualizar Taller</BreadcrumbItem>
                        </Breadcrumb>
                    :
                        <Breadcrumb listClassName="px-0">
                            <BreadcrumbItem><a href="##">Mis Talleres</a></BreadcrumbItem>
                            <BreadcrumbItem active>Nuevo Taller</BreadcrumbItem>
                        </Breadcrumb>
                    }

                    <div className="row align-items-center justify-content-between mb-3">
                        <div className="col col-lg-auto">
                            <h1 className="h4 mb-0 font-weight-bold">
                                {props.Edit ? 'Actualizar taller' : 'Nuevo taller'}
                            </h1>
                        </div>
                        {!props.Edit &&
                            <div className="col col-lg-auto">
                                <Link to="/viewServices" className="btn btn-info">
                                    Listado de talleres
                                </Link>
                            </div>
                        }
                    </div>
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

                    {props.Edit &&
                        <div>
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <div className="p-3">
                                            Seleccione un taller.
                                        </div>
                                        <CardBody className="border-top">
                                            <ServicesSelect 
                                                value={service} 
                                                onChange={changeService} 
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    }

                    {((!props.Edit) || (props.Edit && service !== null && !loadingservice)) &&
                        <form onSubmit={(e) => addWarehouse(e)} action="">
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                Datos del servicio
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                                <Row>
                                                    <Col xs="12">
                                                        <div className="form-group">
                                                            <label htmlFor="service-name">Nombre del servicio:</label>
                                                            <input 
                                                                type="text"
                                                                id="service-name"
                                                                min="0" 
                                                                value={name}
                                                                onChange={(e) => setname(e.target.value)}
                                                                placeholder="Ingrese el nombre del servicio" 
                                                                className={((typeof errors === 'object' && errors.hasOwnProperty('name') ? 'is-invalid' : '') +' form-control')}
                                                            />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('name')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.name}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                        </CardBody>
                                    </Card>
                                    {(props.Edit) 
                                    ?
                                    <p className="text-right">
                                        <button type="submit" disabled={sending} className="btn btn-lg font-weight-bold btn-warning">
                                            {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Actualizar servicio'}
                                        </button>
                                    </p>
                                    :
                                    <p className="text-right">
                                        <button type="submit" disabled={sending} className="btn btn-lg font-weight-bold btn-primary">
                                            {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Añadir servicio'}
                                        </button>
                                    </p>
                                    }
                                </Col>
                            </Row>
                        </form>
                    }

                    {(props.Edit && searchservice) &&
                        <InlineSpinner />
                    }
            </div>
        )
    }
}

export default AddService
