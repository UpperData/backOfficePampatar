import React, {useState, useEffect, useRef, Fragment} from 'react'
import axios from 'axios'
import moment from 'moment'
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
import BankSelect from '../../../components/selects/BankSelect';
import AccountBankSelect from '../../../components/selects/AccountBankSelect';
import { update } from 'lodash';
import PartnerPanel from '../../../components/helpers/PartnerPanel';
import AddressPanel from '../../../components/helpers/AddressPanel';
import CustomFileInput from '../../../components/files/CustomFileInput';
import ProductionTypeSelect from '../../../components/selects/TypeProductionSelect';


function UpdateSeller() {

    let urlUpdate = '/shop/config';
    let urlValidate = '/getValidShopUpdate';

    const session = useSelector(state => state.session);

    const [loading, setloading] = useState(true);
    const [search, setsearch]   = useState(true);
    const [isvald, setisvald]  = useState(false);

    //data
    const requestId = session.userData.shop.postulacionId;
    const [processId, setprocessId]                 = useState(null);

    //user
    const [firstName,      setfirstName]            = useState('');
    const [lastName,       setlastName ]            = useState('');
    const [genderId,       setgenderId]             = useState('');
    const [nationalityId,  setnationalityId ]       = useState('');
    const [birthDate,      setbirthDate ]           = useState('');
    const [phone,          setphone ]               = useState([]);
    const [document,       setdocument ]            = useState(null);
    
    //store
    const [logo, setlogo ]                                          = useState(null);
    const [partner, setpartner]                                     = useState(null);
    const [shopDescription, setshopDescription]                     = useState('');
    const [employees, setemployees ]                                = useState('');
    const [address,    setaddress]                                  = useState(null);
    const [startActivity,           setstartActivity ]              = useState(false);
    const [startActivityAttachment, setstartActivityAttachment ]    = useState(null);
    const [binaryData,              setBinaryData]                  = useState(null);
    const [isLocal,                 setIsLocal ]                    = useState(false);
    
    //payment
    const [bank,        setbank]                     = useState(null);
    const [accountType, setaccountType]              = useState(null);
    const [owner,       setowner]                    = useState('');
    const [rut,         setrut]                      = useState('');
    const [number,      setnumber]                   = useState('');

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                
                    axios.get(urlValidate)
                    .then((res) => {
                        console.log(res.data);
                    }).catch((err) => {
                        console.error(err);
                    });
                
            }
        } 
    });

    const updateAccount = (e) => {
        e.preventDefault();
        e.stopPropagation();

        //Set Format
        
        let newDocuments = [];
        for (let i = 0; i < document.length; i++) {
            const element = document[i];
            let newElement = {};

            newElement.docType       = element.docType;
            newElement.number        = element.docNumber;

            newDocuments.push(newElement);
        }

        let newPhonesNumber = [];
        for (let i = 0; i < phone.length; i++) {
            const element = phone[i];
            
            let newElement = {};
            //newElement.id           = i+1;
            newElement.number       = element.number.toString();
            newElement.phoneType    = {id:element.phoneType.value, name:element.phoneType.label}

            newPhonesNumber.push(newElement);
        }

        let newAddressList = [];
        for (let i = 0; i < address.length; i++) {
            const element = address[i];

            element.dirType     = {id:element.dirType.value, name:element.dirType.label};
            element.region      = {id:element.region.value, name:element.region.label};
            element.province    = {id:element.province.value, name:element.province.label};
            element.comuna      = {id:element.comuna.value, name:element.comuna.label};

            newAddressList.push(element);
        }

        let newBankData             = {};
        newBankData.bank            = {id: bank.value,          name:bank.label};
        newBankData.accountType     = {id: accountType.value,   name:accountType.label};
        newBankData.owner           = owner;
        newBankData.rut             = rut;
        newBankData.number          = number;

        let formatProcessId         = {};
        formatProcessId.id          = processId.value;
        formatProcessId.name        = processId.label;
        
        let data = {
            //user
            requestId,
            firstName,
            lastName,
            birthDate:              moment(birthDate).format('YYYY/MM/DD'),
            genderId:               genderId.value,
            nationalityId:          nationalityId.value,
            phone:                  newPhonesNumber,
            logo,                   //null
            document:               newDocuments,
            partner,                //array
            address:                newAddressList,
            paymentCong:            newBankData,
            startActivityAttachment,
            employees:              Number(employees),
            startActivity,
            isLocal,
            processId:              formatProcessId
        }

        //var binaryDataToArray = Array.from(binaryData);
        if(startActivity){
            data.startActivityAttachment = binaryData;
        }
        
        axios({
            url: urlUpdate,
            method: 'PUT',
            data
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });
        
        console.log(data);
        
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">Actualizar datos de la tienda</h1>
            <form onSubmit={(e) => updateAccount(e)} action="">
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
                                                id="firstname" 
                                                value={firstName}
                                                onChange={(e) => setfirstName(e.target.value)}
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
                                                id="lastname" 
                                                value={lastName}
                                                onChange={(e) => setlastName(e.target.value)}
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
                                                value={birthDate}
                                                onChange={(date) => setbirthDate(date)}
                                                dateFormat="YYYY-MM-DD"
                                                timeFormat={false}
                                                inputProps={{ placeholder: "Fecha de nacimiento" }}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Género</label>
                                            <GenderSelect onChange={setgenderId} value={genderId} />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Nacionalidad</label>
                                            <NationalitySelect onChange={setnationalityId} value={nationalityId} />
                                        </div>
                                    </Col>
                                    <Col md="12">     
                                        <UserIndentityDocument value={document} onChange={setdocument} />
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Teléfonos</label>
                                            <PhoneMultiple value={phone} onChange={setphone} />
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card>
                            <div className="p-3">
                                <CardTitle>
                                    <i className="mdi mdi-border-all mr-2"></i>Datos bancarios
                                </CardTitle>
                            </div>
                            <CardBody className="border-top">
                                <Row>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Banco</label>
                                            <BankSelect value={bank} onChange={setbank} />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="">Tipo de cuenta</label>
                                            <AccountBankSelect value={accountType} onChange={setaccountType} />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="owner">Propietario(a)</label>
                                            <input 
                                                type="text"
                                                id="owner"
                                                min="0" 
                                                value={owner}
                                                onChange={(e) => setowner(e.target.value)}
                                                placeholder="Títular de la cuenta" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="form-group">
                                            <label htmlFor="rut">RUT</label>
                                            <input 
                                                type="text"
                                                id="rut"
                                                value={rut}
                                                onChange={(e) => setrut(e.target.value)}
                                                placeholder="RUT" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="accountNumber">Número de cuenta</label>
                                            <input 
                                                type="text"
                                                id="accountNumber"
                                                value={number}
                                                onChange={(e) => setnumber(e.target.value)}
                                                placeholder="Títular de la cuenta" 
                                                className="form-control"
                                            />
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
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">¿Posee tienda física?</label>
                                            <div>
                                                <CustomInput 
                                                    className="d-inline-flex mr-3" 
                                                    checked={(isLocal === true)} 
                                                    onChange={() => setIsLocal(true)}  
                                                    type="radio" 
                                                    id={`is-local-y`} 
                                                    name={`is-local`}    
                                                    label='Si' 
                                                />
                                                <CustomInput 
                                                    className="d-inline-flex mr-3" 
                                                    checked={(isLocal === false)} 
                                                    onChange={() => setIsLocal(false)}  
                                                    type="radio" 
                                                    id={`is-local-n`} 
                                                    name={`is-local`}    
                                                    label='No' 
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">¿Tiene inicio de actividades?</label>
                                            <div>
                                                <CustomInput 
                                                    className="d-inline-flex mr-3" 
                                                    checked={(startActivity === true)} 
                                                    onChange={() => setstartActivity(true)}  
                                                    type="radio" 
                                                    id={`start-activity-y`} 
                                                    name={`start-activity`}    
                                                    label='Si' 
                                                />
                                                <CustomInput 
                                                    className="d-inline-flex mr-3" 
                                                    checked={(startActivity === false)} 
                                                    onChange={() => setstartActivity(false)}  
                                                    type="radio" 
                                                    id={`start-activity-n`} 
                                                    name={`start-activity`}    
                                                    label='No' 
                                                />
                                            </div>
                                        </div>
                                        {(startActivity === true) &&
                                            <div className="form-group">
                                                <label htmlFor="">Adjuntar documento</label>
                                                <CustomFileInput returnFileType='base64' value={startActivityAttachment} setBinary={setBinaryData} onChange={setstartActivityAttachment} />
                                            </div>
                                        }
                                        <div className="form-group">
                                            <label htmlFor="">Tipo de producción</label>
                                            <ProductionTypeSelect value={processId} onChange={setprocessId} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Colaboradores</label>
                                            <PartnerPanel value={partner} onChange={setpartner} />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Dirección</label>
                                            <AddressPanel value={address} onChange={setaddress} />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="">Número de empleados</label>
                                            <input 
                                                type="number"
                                                id="employees"
                                                min="0" 
                                                value={employees}
                                                onChange={(e) => setemployees(e.target.value)}
                                                placeholder="N° de empleados" 
                                                className="form-control"
                                            />
                                        </div>
                                    </Col>
                                    <Col md="12">
                                        <div className="form-group">
                                            <label htmlFor="description">Descripción</label>
                                            <textarea 
                                            value={shopDescription}
                                            onChange={(e) => setshopDescription(e.target.value)}
                                            placeholder="Ingrese una descripción"
                                            name="" 
                                            id="description"
                                            cols="30" 
                                            rows="4" 
                                            className="form-control"></textarea>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <p className="py-2">
                            <button type="submit" className="btn btn-info d-block w-100">
                                Actualizar datos
                            </button>
                        </p>
                    </Col>
                </Row>
            </form>
        </div>
    )
}

export default UpdateSeller
