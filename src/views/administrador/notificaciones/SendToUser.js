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

function SendToUser() {

    const [loading, setloading]                 = useState(true);
    const [search,  setsearch]                  = useState(true);

    const [usersRole,    setusersRole]          = useState(null);
    const [role,        setrole]                = useState(null);
    const [user,        setuser]                = useState(null);

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
        setuser(null);

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
        setuser(null);
        setrole(value);

        seterrors({});
        setsuccessmessage("");
        seterrormessage("");
    }

    const changeCheckbox = (e) => {
        setemail(e.target.checked);
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


        let url = '/seNd/NoTIFICATION/useRS';
        let urlEmail    = '/SnED/MAIL/';

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
                    AccountId: Number(user.value),
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
                                accountId: Number(user.value),
                                subject: title,
                                html: `<p>${text}</p>`,
                            }
                        }).then((res) => {

                            console.log(res.data);

                            setsending(false);
                            setsuccessmessage(result.data.message);
                            reset();

                            setTimeout(() => {
                                window.scrollTo({ top: 200, behavior: "smooth" });
                                setsuccessmessage("");
                            }, 6000);

                        }).catch((err) => {
                            console.error(err);
                        })
                    }else{
                        setsending(false);
                        setsuccessmessage(result.data.message);
                        reset();

                        setTimeout(() => {
                            window.scrollTo({ top: 200, behavior: "smooth" });
                            setsuccessmessage("");
                        }, 6000);
                    }
                }else{
                    setsending(false);
                    seterrormessage(res.data.data.message);
                }
                
            }).catch((err) => {
                console.error(err);

                setsending(false);
            });
        }
    }

    if(!loading){
        return (
            <div>
                <Breadcrumb listClassName="px-0">
                    <BreadcrumbItem><a href="##">Notificaciones</a></BreadcrumbItem>
                    <BreadcrumbItem active>Enviar a Usuario</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="h4 mb-3 font-weight-bold">Enviar a Usuario</h1>

                {(successmessage !== '') &&
                    <div className="alert alert-success">
                        <i className="fa fa-check-circle mr-2"></i>{successmessage}
                    </div>
                }

                {(role === null) &&
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
                }

                {(role !== null) &&
                    <form action="">
                        <Row>
                            <Col md="12">
                                <Card>
                                    <div className="p-3 d-flex align-items-center justify-content-between flex-wrap">
                                        <h6 className="mb-0 font-weight-bold">
                                            Seleccion de usuario - <strong className="text-info">{role.label}</strong>
                                        </h6>
                                        <button onClick={() => changeRole(null)} className="btn btn-info btn-sm">
                                            Cambiar de rol
                                        </button>
                                    </div>
                                    <CardBody className="border-top">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <UsersSelect value={user} onChange={(value) => setuser(value)} roleId={role.value} />
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </form>
                }

                {(errormessage !== '') &&
                    <div className="alert alert-warning">
                        <i className="fa fa-exclamation-triangle mr-2"></i>{errormessage}
                    </div>
                }

                {(user !== null && successmessage === "") &&
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

export default SendToUser
