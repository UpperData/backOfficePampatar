import React, {Fragment, useState, useEffect} from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    UncontrolledTooltip,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button
  } from "reactstrap";
import moment from 'moment'
import InlineSpinner from '../../spinner/InlineSpinner';

function MiTienda(props) {

    const [loading, setloading]                 = useState(true);
    const [search,  setSearch]                  = useState(true);
    const [shop,    setshop]                    = useState({});
    const [status,  setstatus]                  = useState(null);
    const [sending, setsending]                 = useState(false);

    const [successmessage,  setsuccessmessage]  = useState('');
    const [errormessage,    seterrormessage]    = useState('');

    let id = props.match.params.id;

    const [modalChangeStatus, setModalChangeStatus] = useState(false);
    const [changeStatusType, setchangeStatusType] = useState('active');
    const toggle = () => setModalChangeStatus(!modalChangeStatus);

    const OpenModalChangeStatus = (type) => {
        setchangeStatusType(type);
        setModalChangeStatus(true);
    }

    //let dataBank = {};
    //let address  = {};

    /*
        if(id !== null && id !== undefined){
            //shop = data.find(item => Number(item.id) === Number(id));
            //console.log(data);
            //console.log(shop);
        }
        let dataBank = shop.bank;
        let address = shop.address;
    */

    let url = '/setting/seller/shop/general/profile/'+id;
    let urlstatus = '/sETTiNG/SHOp/statUs/SHOP/'+id;

    const getDataStatus = () => {
        axios.get(urlstatus).then((res) => {
            console.log(res.data.data.message);
            setstatus(res.data.data.message);
            setloading(false);
        }).catch((err) => {
            console.error(err);
            setloading(false);
        });
    }

    const GoUpdateStatus = (e) => {
        e.preventDefault();
        let urlChangeStatusToEnable  =  'sEttING/sHOp/statUs/EnaBLe';
        let urlChangeStatusToDisable =  '/sEtting/shOP/stAtus/DISABle';
        setsuccessmessage('');
        seterrormessage('');

        let axiosurl = '';

        if(changeStatusType === 'active'){

            axiosurl = urlChangeStatusToEnable;

        }else if(changeStatusType === 'inactive'){

            axiosurl = urlChangeStatusToDisable;
        }

        setsending(true);
        axios({
            method: 'put',
            data:{
                shopId: id
            },
            url: axiosurl
        }).then((res) => {

            console.log(res.data);
            if(res.data.data.result){

                setsuccessmessage(res.data.data.Message);
                setModalChangeStatus(false);
                setsending(false);
                setloading(true);
                setSearch(true);
                
            }else{
                seterrormessage(res.data.data.message);
                setModalChangeStatus(false);
                setsending(false);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        if(loading){
            if(search){
                setSearch(false);

                axios.get(url).then((res) => {

                    console.log(res.data.data.rsAccount);
                    setshop(res.data.data.rsAccount[0]);
                    getDataStatus();
                    
                }).catch((err) => {
                    console.error(err);
                    setloading(false);
                });
                
            }
        }
    }, [loading,search,url]);

    console.log(shop);

    if(!loading){

        let logoshop = shop.logo;
        let address = shop.address;

        if(shop.logo !== null){
            logoshop = shop.logo.data.reduce(
                function (data, byte) {
                    return data + String.fromCharCode(byte);
                },
                ''
            );
        }

        return (
            <div className="py-3">
                <h5 className="font-weight-bold mb-3">
                    Ver tienda - <Link to="/admin/shop/all" className="btn btn-sm btn-info">Volver a la lista</Link>
                </h5>
                {errormessage !== '' &&
                    <div className="alert alert-warning">
                        <p className="mb-0">{errormessage}</p>
                    </div>
                }
                {successmessage !== '' &&
                    <div className="alert alert-success">
                        <p className="mb-0">{successmessage}</p>
                    </div>
                }
                <Row>
                    <Col xs="12" md="4" lg="4">
                        <Card>
                        <CardBody>
                            <div className="text-center mt-4">
                            {logoshop !== null &&
                                <img
                                    src={`data:image/png;base64,${logoshop}`}
                                    alt="user"
                                    className="rounded-circle shadow"
                                    width="150"
                                />
                            }
                            <CardTitle className="mt-2">
                                <h2>
                                    <strong>
                                        {shop.name}
                                    </strong>
                                </h2>
                                <h5 className="text-muted py-3">
                                    {shop.Status.name}
                                </h5>
                            </CardTitle>
                            <Row className="text-center d-none justify-content-md-center">
                                <Col xs="4">
                                    <UncontrolledTooltip 
                                        className="bg-primary text-white" 
                                        placement="bottom" 
                                        target={`employees-count`}
                                    >
                                        Número de empleados
                                    </UncontrolledTooltip>
                                    <p className="mb-0" id="employees-count">
                                    <i className="mdi mdi-account-hard-hat"></i>
                                    <span className="font-medium ml-2">
                                        {shop.employees}
                                    </span>
                                    </p>
                                </Col>
                            </Row>
                            </div>
                        </CardBody>
                        </Card>
                        
                        <div>
                            <button disabled={true} className="btn btn-block w-100 my-1 btn-info">Ver inventario</button>
                            <button disabled={true} className="btn btn-block w-100 my-1 btn-warning">Ver estadísticas</button>
                        </div>
                    </Col>
                    <Col xs="12" md="8" lg="8">
                    <Row>
                        <Col sm="12">
                        <Card>
                            <CardBody>
                            <Row>
                                <Col md="4" xs="6" className="border-right">
                                <strong className=""><i className="mdi mdi-storefront text-primary mr-2"></i>Nombre</strong>
                                <br />
                                <p className="text-muted">{shop.name}</p>
                                </Col>
                                <Col md="4" xs="6" className="border-right">
                                <strong className=""><i className="mdi mdi-phone text-primary mr-2"></i>Teléfono</strong>
                                <br />
                                <p className="text-muted">{shop.phone[0].number}</p>
                                </Col>
                                <Col md="4" xs="12" className="border-right">
                                <strong className=""><i className="mdi mdi-email text-primary mr-2"></i>Correo electrónico</strong>
                                <br />
                                <p className="text-muted">{shop.shopRequest.Account.email}</p>
                                </Col>
                            </Row>

                            <h6 className="font-medium mt-4">
                                Fecha de creación:
                            </h6>
                            <p>
                                {moment(shop.createdAt).format('YYYY-MM-DD')}
                            </p>

                            {address !== null &&
                                <div>
                                    <h6 className="font-medium pt-4 db"><i className="mdi mdi-map-marker mr-2"></i>Dirección</h6>
                                    <h6>{address[0].calle} {address[0].numero}, {address[0].local}, {address[0].comuna.name} {address[0].province.name} {address[0].region.name}</h6>
                                </div>
                            }
                            
                            <h6 className="font-medium mt-4">
                                Descripción de la tienda:
                            </h6>
                            <p>
                                {(shop.descShop !== null && shop.descShop === '') ? shop.descShop : 'sin descripción.'}
                            </p>
                            

                            {shop.processId !== null &&
                                <div>
                                    <h6 className="font-medium mt-4">
                                        Proceso de manufactura:
                                    </h6>
                                    <p>
                                        "{shop.processId.name}"
                                    </p>
                                </div>
                            }
                            
                            <h6 className="font-medium mt-4">
                                Tipo de tienda:
                            </h6>
                            
                            {
                                shop.storeType !== null 
                                && Array.isArray(shop.storeType) && 
                                shop.storeType.map((item, key) => {
                                    return (
                                    <p key={key} className="mb-0">
                                        "{item.name}"
                                    </p>
                                    )
                                })
                            }
                            

                            </CardBody>
                        </Card>
                        {shop.partner !== null &&
                            <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-credit-card-multiple mr-2"></i>Colaboradores
                                </CardTitle>
                            </div>
                            <CardBody className="">
                                <div>
                                {Array.isArray(shop.partner) && shop.partner.length > 0 &&
                                    <Fragment>
                                        {(shop.partner.map((item, key) => {
                                            return (
                                            <div key={key}>
                                                <h6 className="mb-0">
                                                    {item.firstName+' '+item.lastName} - <span className="text-muted">{item.relationship}</span>
                                                </h6>
                                            </div>
                                            )
                                        }))}
                                        {/* 
                                        <small className="text-muted pt-4 db"><i className="mdi mdi-storefront-outline mr-2"></i>¿Posee tienda física?</small>
                                        <h6>{shop.isLocal ? 'Si' : 'No'}</h6>
                                        
                                        <small className="text-muted pt-4 db"><i className="mdi mdi-map-marker mr-2"></i>Dirección</small>
                                        <h6>{address[0].calle} {address[0].numero}, {address[0].local}, {address[0].comuna.name} {address[0].province.name} {address[0].region.name}</h6>
                                    
                                        <div className="d-none">
                                            <small className="text-muted pt-4 db"><i className="mdi mdi-account-hard-hat mr-2"></i>¿Tiene inicio de actividades?</small>
                                            <h6>{shop.startActivity ? 'Si' : 'No'}</h6>
                                        </div>
                                        */}
                                    
                                    </Fragment>
                                    }
                                </div>
                            </CardBody>
                            </Card>
                        }
                        <div>
                            {status === 'Activa'  &&
                                <button onClick={() => OpenModalChangeStatus('inactive')} className="btn btn-info shadow-sm">
                                    Dar de baja
                                </button>
                            }
                            {status === 'Inactiva'  &&
                                <button onClick={() => OpenModalChangeStatus('active')} className="btn btn-primary shadow-sm">
                                    Activar
                                </button>
                            }
                        </div>

                        <Modal isOpen={modalChangeStatus} toggle={toggle}>
                            <ModalHeader className="h3 font-weight-bold" toggle={toggle}>
                                {(changeStatusType === 'active' ? 'Activar' : 'Dar de baja')}
                            </ModalHeader>
                            <ModalBody>
                                <h6>¿Desea {(changeStatusType === 'active' ? 'Activar' : 'Dar de baja a')} la tienda <strong>{shop.name}</strong>?</h6>
                            </ModalBody>
                            <ModalFooter>
                            <button 
                            disabled={sending}
                            className="btn btn-info"
                            onClick={(e) => GoUpdateStatus(e)}
                            >
                                {(sending) ? <span><i className="fa fa-spin fa-spinner"></i></span> : <span><i className="fa fa-check mr-2"></i>confirmar</span>}
                            </button>
                            <Button color="primary" onClick={toggle}><i className="fa fa-times mr-2"></i>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                        

                        {/* 
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-credit-card-multiple mr-2"></i>Datos bancarios
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h6><span className="font-medium">Número de cuenta:</span></h6>
                                        <p>
                                        {dataBank.number}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h6><span className="font-medium">Tipo de cuenta:</span></h6>
                                        <p>
                                        {dataBank.accountType.name}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h6><span className="font-medium">Banco:</span></h6>
                                        <p>
                                        {dataBank.bank.name}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h6><span className="font-medium">Propietario de la cuenta:</span></h6>
                                        <p>
                                        {dataBank.owner}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <h6><span className="font-medium">Rut:</span></h6>
                                        <p>
                                        {dataBank.rut}
                                        </p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        */}
                        </Col>
                    </Row>
                    </Col>                
                </Row>
            </div>
        )
    }else{
        return (
            <div>
                <h5 className="font-weight-bold">Ver tienda</h5>
                <InlineSpinner />
            </div>
        )
    }
}

export default withRouter(MiTienda);
