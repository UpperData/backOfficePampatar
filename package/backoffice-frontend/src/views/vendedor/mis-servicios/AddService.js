import React, {useState, useEffect, useRef, Fragment} from 'react'
import {useSelector} from 'react-redux'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem,
    FormGroup,
    Input
} from 'reactstrap';
import axios from 'axios'
import {Link} from 'react-router-dom'
import InlineSpinner from '../../spinner/InlineSpinner';
import ServicesSelect from '../../../components/selects/servicesSelect';

function AddService(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [name,     setname]     = useState('');
    const [service, setservice] = useState(null);

    const [searchservice, setsearchservice] = useState(false);
    const [loadingservice, setloadingservice] = useState(true);

    const reset = () => {
        setname('');
        setservice(null);
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

    const addWarehouse = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setsuccessmessage('');
        seterrormessage('');

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
                    setsuccessmessage('¡Servicio editado satisfactoriamente!')
                    reset();
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

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                {props.Edit ? 'Editar servicio' : 'crear nuevo servicio'}
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

                {props.Edit &&
                    <div>
                        <Row>
                            <Col md="12">
                                <Card>
                                    <div className="p-3">
                                        <CardTitle>
                                            <i className="mdi mdi-border-all mr-2"></i>Seleccione un servicio.
                                        </CardTitle>
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
                            <Col md="7">
                                <Card>
                                    <div className="p-3">
                                        <CardTitle>
                                            <i className="mdi mdi-border-all mr-2"></i>Datos del servicio
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
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                    </CardBody>
                                </Card>
                                {(props.Edit) 
                                ?
                                <p>
                                    <button type="submit" disabled={sending} className="btn btn-warning">
                                        {(sending) ? <span>Cargando<i className="fa fa-spin fa-spinner ml-2"></i></span> : 'Editar servicio'}
                                    </button>
                                </p>
                                :
                                <p>
                                    <button type="submit" disabled={sending} className="btn btn-primary">
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

export default AddService
