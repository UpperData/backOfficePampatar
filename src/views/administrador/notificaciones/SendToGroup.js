import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {CustomInput} from "reactstrap"

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
import UsersSelect from '../../../components/selects/UsersSelect';
import RoleSelect from '../../../components/selects/RoleSelect';

function SendToGroup() {

    const [loading, setloading]                 = useState(true);
    const [search,  setsearch]                  = useState(true);
    
    const [role,        setrole]                = useState(null);

    const [title, settitle]                     = useState("");
    const [text,  settext]                      = useState("");
    const [extra, setextra]                     = useState("");

    const [email, setemail]                     = useState(false);

    const [sending, setsending]                 = useState(false);

    const [successmessage, setsuccessmessage]   = useState(""); 
    const [errormessage,    seterrormessage]    = useState("");       

    const [errors, seterrors]                   = useState({});
    
    const reset = () => {
        setrole(null);

        settitle("");
        settext("");
        setextra("");

        setemail(false);

        //setsuccessmessage("");
        seterrormessage("");

        seterrors({});
        
        setsending(false);
    }

    useEffect(() => {
        if(loading){
            if (search) {
                setsearch(false);
                setloading(false);
            }
        }
    });

    const changeRole = (value) => {
        setrole(value);

        seterrors({});
        setsuccessmessage("");
        seterrormessage("");
    }

    const validate = () => {
        let errorsList  = {};
        let countErrors = 0;

        if(title === "" || title === null){
            errorsList.title = "Debe ingresar un título para la notificación";
            countErrors++;
        }

        if(text === "" || text === null){
            errorsList.text = "El mensaje de la notificación no puede quedar vacío";
            countErrors++;
        }

        if(countErrors > 0){
            seterrors(errorsList);
            return false;
        }else{
            return true;
        }
    }

    const sendNotifications = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let url         = '/send/maSive/NOtiFiCATions/'+role.value;
        let urlEmail    = '/SEND/MAIL/bY/gROUP/';

        seterrors({});
        let isValid = validate();

        if(isValid){

            setsending(true);

            axios({
                method: 'post',
                url,
                data: {
                    title,
                    text,
                    extra,
                    RoleId: Number(role.value)
                }
            }).then((res) => {
                console.log(res.data);
                let result = res.data;

                if(res.data.data.result){
                    if(email){
                        axios({
                            method: 'post',
                            url:    urlEmail,
                            data: {
                                subject: title,
                                html: `<p>${text}</p>`,
                                RoleId: Number(role.value)
                            }
                        }).then((res) => {
        
                            console.log(res.data);
                            setsuccessmessage(result.data.message);
        
                            setTimeout(() => {
                                window.scrollTo({ top: 200, behavior: "smooth" });
                                setsuccessmessage("");
                                reset();
                            }, 8000);
        
                        }).catch((err) => {
                            console.error(err);
                        })
                    }else{
                        console.log(res.data);
                        setsuccessmessage(result.data.message);

                        setTimeout(() => {
                            window.scrollTo({ top: 200, behavior: "smooth" });
                            setsuccessmessage("");
                            reset();
                        }, 8000);
                    }
                }else{
                    seterrormessage(result.data.message);
                }

                setsending(false);
            }).catch((err) => {
                console.error(err);

                setsending(false);
            });
        }
    }

    const changeCheckbox = (e) => {
        setemail(e.target.checked);
    }

    if(!loading){
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Enviar a Grupo</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="h4 mb-3 font-weight-bold">Enviar a Grupo</h1>

                {(successmessage !== '') &&
                    <div className="alert alert-success">
                        <i className="fa fa-exclamation-triangle mr-2"></i>{successmessage}
                    </div>
                }

                <form action="">
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <h6 className="mb-0 font-weight-bold">
                                        Seleccion de rol
                                    </h6>
                                </div>
                                <CardBody className="border-top">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <RoleSelect value={role} onChange={(value) => changeRole(value)} />
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </form>
                
                {(errormessage !== '') &&
                    <div className="alert alert-warning">
                        <i className="fa fa-exclamation-triangle mr-2"></i>{errormessage}
                    </div>
                }

                {(role !== null && successmessage === "") &&
                    <form onSubmit={(e) => sendNotifications(e)} action="">
                        <Row>
                            <Col md="12">
                                <Card>
                                    <div className="p-3">
                                        <h6 className="mb-0 font-weight-bold">
                                            Datos de la notificación
                                        </h6>
                                    </div>
                                    <CardBody className="border-top">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <h3 className="font-weight-bold">
                                                        Título de la notificación
                                                    </h3>
                                                    <input 
                                                        value={title}
                                                        onChange={(e) => settitle(e.target.value)}
                                                        type="text" 
                                                        className={((errors !== null && typeof errors === "object" && errors.hasOwnProperty("title")) ? "is-invalid" : "") +" form-control"}
                                                        placeholder="Título"
                                                    />
                                                </div>
                                                {(errors !== null && typeof errors === "object" && errors.hasOwnProperty("title")) &&
                                                    <div className="small font-weight-bold text-danger mb-3">
                                                        {errors.title}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea 
                                                        value={text}
                                                        onChange={(e) => settext(e.target.value)}
                                                        placeholder="Mensaje"
                                                        name="" 
                                                        id="" 
                                                        cols="30" 
                                                        rows="4" 
                                                        className={((errors !== null && typeof errors === "object" && errors.hasOwnProperty("text")) ? "is-invalid" : "") +" form-control"}
                                                    ></textarea>
                                                </div>
                                                {(errors !== null && typeof errors === "object" && errors.hasOwnProperty("text")) &&
                                                    <div className="small font-weight-bold text-danger mb-3">
                                                        {errors.text}
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-12">
                                                <hr />
                                                <div className="form-group">
                                                    <label htmlFor="">
                                                        Nota adicional <strong>(opcional)</strong>
                                                    </label>
                                                    <input 
                                                        value={extra}
                                                        onChange={(e) => setextra(e.target.value)}
                                                        type="text" 
                                                        className="form-control"
                                                        placeholder="...."
                                                    />
                                                    <p className="small">
                                                        Ideal para agregar links, referencias o algun comentario fuera del mensaje principal.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-12 py-3">
                                                <CustomInput
                                                    checked={email}
                                                    //defaultChecked={email}
                                                    onChange={(e) => changeCheckbox(e)}
                                                    type="checkbox"
                                                    id="email"
                                                    label="Enviar correo electrónico"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="text-right">
                                    <button disabled={sending} type="submit" className="btn btn-lg btn-primary font-weight-bold">
                                        {(!sending) ? "Enviar notificación" : <span><i className="fa fa-spin fa-spinner"></i></span>}
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                }
            </div>
        )
    }else{
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Enviar a Usuario</BreadcrumbItem>
                </Breadcrumb>
                <h1 className="h4 mb-3 font-weight-bold">Enviar a Usuario</h1>
                <div className="py-5">
                    <InlineSpinner />
                </div>
            </div>
        )
    }
}

export default SendToGroup
