import React, {useState, useEffect} from 'react'
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
    CustomInput,
} from 'reactstrap';
import GenderSelect from '../../../components/selects/GenderSelect';
import NationalitySelect from '../../../components/selects/NationalitySelect';

//styles
import "react-datetime/css/react-datetime.css";
import PhoneMultiple from '../../../components/phones/phoneMultiple';
import UserIndentityDocument from '../../../components/helpers/userIndentityDocument'
import BankSelect from '../../../components/selects/BankSelect';
import AccountBankSelect from '../../../components/selects/AccountBankSelect';
import PartnerPanel from '../../../components/helpers/PartnerPanel';
import AddressPanel from '../../../components/helpers/AddressPanel';
import CustomFileInput from '../../../components/files/CustomFileInput';
import ProductionTypeSelect from '../../../components/selects/TypeProductionSelect';
import InlineSpinner from '../../spinner/InlineSpinner';


function UpdateSeller() {

    let urlUpdate = '/shop/config';
    //let urlValidate = '/getValidShopUpdate';

    const session = useSelector(state => state.session);

    const [loading, setloading]     = useState(true);
    const [search, setsearch]       = useState(true);
    const [data,    setdata]        = useState(null);
    const [sending, setsending]     = useState(false);
    //const [isvald, setisvald]       = useState(false);
    const [errors, seterrors]       = useState({});

    //data
    const requestId = session.userData.shop.postulacionId;
    const [processId, setprocessId]                 = useState(null);

    //user
    const [firstName,      setfirstName]            = useState('');
    const [lastName,       setlastName ]            = useState('');
    const [genderId,       setgenderId]             = useState(null);
    const [nationalityId,  setnationalityId ]       = useState(null);
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

    const [defaultPhone, setdefaultPhone]            = useState(null);

    const [personType,   setpersonType ]             = useState(null);

    let urlget = '/seller/profile';

    useEffect(() => {
        if(loading){
            if(search){
                setsearch(false);
                axios.get(urlget)
                .then((res) => {
                    let data = res.data.data.rsAccount[0];
                    let shops = res.data.data.rsAccount[0].shopRequests;
                    let idshop = session.userData.shop.postulacionId;

                    console.log(session);
                    console.log(idshop);
                    console.log(data);

                    let thisShop = shops.filter(shop => shop.id === idshop);
                    if(thisShop && thisShop.length > 0){
                        let shop = thisShop[0].shop;
                        let person = data.Person;
                        let resbankdata = shop.paymentCong;

                        console.log(resbankdata);
                        console.log(shop);
                        console.log(person);

                        let birth = person.birthDate.split('T');
                        //console.log(birth);

                        //set
                        setfirstName(person.firstName);
                        setlastName(person.lastName);
                        setbirthDate(moment(birth[0], 'YYYY-MM-DD'));
                        setgenderId({label: person.Gender.name, value: person.genderId });
                        setnationalityId({label: person.Nationality.name, value: person.nationalityId });

                        setprocessId({label: shop.processId.name, value: shop.processId.id});
                        setpartner(shop.partner);

                        let newPhonesNumber = [];
                        for (let i = 0; i < shop.phone.length; i++) {
                            const element = shop.phone[i];
                            
                            let newElement = {};
                            newElement.id           = i+1;
                            newElement.number       = element.number.toString();
                            newElement.phoneType    = {value:element.phoneType.id, label:element.phoneType.name}
            
                            newPhonesNumber.push(newElement);
                        }
                        
                        let newAddressList = [];
                        for (let i = 0; i < shop.address.length; i++) {
                            const element = shop.address[i];

                            element.dirType     = {value:element.dirType.id,    label:element.dirType.name};
                            element.region      = {value:element.region.id,     label:element.region.name};
                            element.province    = {value:element.province.id,   label:element.province.name};
                            element.comuna      = {value:element.comuna.id,     label:element.comuna.name};

                            newAddressList.push(element);
                        }

                        let newDocuments = [];
                        let ptype = null;
                        for (let i = 0; i < person.document.length; i++) {

                            const element = person.document[i];
                            let newElement = {};
                            //newElement.id          = i+1;
                            newElement.docType       = {name: element.docType.name, id: element.docType.id};
                            newElement.docNumber     = element.number;

                            if(ptype === null){
                                if(element.docType.name === 'DNI' || element.docType.name === 'PASAPORTE' || element.docType.name === 'RUN'){
                                    ptype = 1;
                                }else{
                                    ptype = 2;
                                }
                            }

                            newDocuments.push(newElement);
                        }

                        console.log(person.document);
                        //SET DOCUMENTS______________________________________________________________________
                        setdocument(newDocuments);
                        setpersonType(ptype);
                        
                        setdefaultPhone(newPhonesNumber);
                        setaddress(newPhonesNumber);
                        setaddress(newAddressList);
                        setshopDescription(shop.shopDescription);
                        setemployees(shop.employees);
                        setIsLocal(shop.isLocal);
                        setstartActivity(shop.startActivity);

                        //bankdata
                        setbank({label: resbankdata.bank.name,value:resbankdata.bank.id});
                        setaccountType({label: resbankdata.accountType.name,value:resbankdata.accountType.id});
                        setowner(resbankdata.owner);
                        setnumber(resbankdata.number);
                        setrut(resbankdata.rut);

                        setdata(data);
                        setloading(false);
                    }
                }).catch((err) => {
                    console.error(err);
                });    
            }
        } 
    });

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //firstName
        if(firstName.trim() === ''){
            thiserrors.firstName = 'Debe ingresar un nombre';
            errorsCount++;
        }else if(firstName.trim().length < 6){
            thiserrors.firstName = 'El nombre ingresado es demasiado corto';
            errorsCount++;
        }else if(firstName.trim().length > 40){
            thiserrors.firstName = 'El nombre ingresado es demasiado largo';
            errorsCount++;
        }

        //lastName
        if(lastName.trim() === ''){
            thiserrors.lastName = 'Debe ingresar un apellido';
            errorsCount++;
        }else if(lastName.trim().length < 6){
            thiserrors.lastName = 'El apellido ingresado es demasiado corto';
            errorsCount++;
        }else if(lastName.trim().length > 40){
            thiserrors.lastName = 'El apellido ingresado es demasiado largo';
            errorsCount++;
        }

        //birthDate
        if(birthDate === ''){
            thiserrors.birthDate = 'Ingrese su fecha de nacimiento';
            errorsCount++;
        }

        //genderId
        if(genderId === null){
            thiserrors.genderId = 'Seleccione un género';
            errorsCount++;
        }

        //nationalityId
        if(nationalityId === null){
            thiserrors.nationalityId = 'Seleccione el tipo de nacionalidad';
            errorsCount++;
        }

        //owner
        if(owner.trim() === ''){
            thiserrors.owner = 'Debe indicar el nombre del propietario';
            errorsCount++;
        }

        //rut
        if(rut.trim() === ''){
            thiserrors.rut = 'Ingrese el RUT del propietario';
            errorsCount++;
        }

        //number
        if(number.trim() === ''){
            thiserrors.number = 'Ingrese el número de cuenta';
            errorsCount++;
        }

        //employees
        if(employees.trim() === ''){
            thiserrors.employees = 'Ingrese número de empleados';
            errorsCount++;
        }

        //shopDescription
        if(shopDescription.trim() === ''){
            thiserrors.shopDescription = 'Ingrese una descripción para su tienda';
            errorsCount++;
        }

        //bank
        if(bank === null){
            thiserrors.bank = 'Debe seleccionar un banco';
            errorsCount++;
        }

        //accountType
        if(accountType === null){
            thiserrors.accountType = 'Seleccione un tipo de cuenta bancaria';
            errorsCount++;
        }

        //processId
        if(processId === null){
            thiserrors.processId = 'Seleccione un tipo de producción';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const updateAccount = (e) => {

        e.preventDefault();
        e.stopPropagation();
        seterrors({});

        let validation = validate();
        
        if(validation){
            //Set Format
            setsending(true);

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
                setsending(false);
            }).catch((err) => {
                console.error(err);
                setsending(false);
            });
            
            console.log(data);
        }
        
    }

    if(!loading){
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('firstName') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('firstName')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.firstName}
                                                        </small>
                                                    </div>
                                                }
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('lastName') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('lastName')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.lastName}
                                                        </small>
                                                    </div>
                                                }
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
                                                    inputProps={{ placeholder: "Fecha de nacimiento", className: ((typeof errors === 'object' && errors.hasOwnProperty('lastName') ? 'is-invalid' : '') +' form-control') }}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('birthDate')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.birthDate}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className={((typeof errors === 'object' && errors.hasOwnProperty('genderId') ? 'has-error' : '') +' form-group')}>
                                                <label htmlFor="">Género</label>
                                                <GenderSelect onChange={setgenderId} value={genderId} />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('genderId')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.genderId}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className={((typeof errors === 'object' && errors.hasOwnProperty('nationalityId') ? 'has-error' : '') +' form-group')}>
                                                <label htmlFor="">Nacionalidad</label>
                                                <NationalitySelect onChange={setnationalityId} value={nationalityId} />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('nationalityId')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.nationalityId}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="12">     
                                            <UserIndentityDocument personType={personType} value={document} onChange={setdocument} />
                                        </Col>
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="">Teléfonos</label>
                                                <PhoneMultiple value={phone} onChange={setphone} loadValue={defaultPhone} />
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
                                            <div  className={((typeof errors === 'object' && errors.hasOwnProperty('bank') ? 'has-error' : '') +' form-group')}>
                                                <label htmlFor="">Banco</label>
                                                <BankSelect value={bank} onChange={setbank} />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('bank')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.bank}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div  className={((typeof errors === 'object' && errors.hasOwnProperty('accountType') ? 'has-error' : '') +' form-group')}>
                                                <label htmlFor="">Tipo de cuenta</label>
                                                <AccountBankSelect value={accountType} onChange={setaccountType} />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('accountType')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.accountType}
                                                        </small>
                                                    </div>
                                                }
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('owner') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('owner')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.owner}
                                                        </small>
                                                    </div>
                                                }
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('rut') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('rut')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.rut}
                                                        </small>
                                                    </div>
                                                }
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('number') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('number')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.number}
                                                        </small>
                                                    </div>
                                                }
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
                                            <div className={((typeof errors === 'object' && errors.hasOwnProperty('processId') ? 'has-error' : '') +' form-group')}>
                                                <label htmlFor="">Tipo de producción</label>
                                                <ProductionTypeSelect value={processId} onChange={setprocessId} />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('processId')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.processId}
                                                        </small>
                                                    </div>
                                                }
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
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('employees') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('employees')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.employees}
                                                        </small>
                                                    </div>
                                                }
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
                                                className={((typeof errors === 'object' && errors.hasOwnProperty('shopDescription') ? 'is-invalid' : '') +' form-control')}></textarea>
                                                {(typeof errors === 'object' && errors.hasOwnProperty('shopDescription')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.shopDescription}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            <p className="py-2">
                                <button disabled={sending} type="submit" className="btn btn-info d-block w-100">
                                    {(!sending) ? 'Actualizar datos' : <p className="mb-0"><i className="fa fa-spin fa-spinner"></i></p>}
                                </button>
                            </p>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Actualizar datos de la tienda</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default UpdateSeller
