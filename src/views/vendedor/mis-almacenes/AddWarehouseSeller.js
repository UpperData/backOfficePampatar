import React, {useState} from 'react'
//import {useSelector} from 'react-redux'
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
import RegionsSelect from '../../../components/selects/RegionsSelect';
import ProvincesSelect from '../../../components/selects/ProvincesSelect';
import ComunasSelect from '../../../components/selects/ComunasSelect';
import PhoneMultiple from '../../../components/phones/phoneMultiple';
import WarehouseSelect from '../../../components/selects/WarehouseSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import {Link} from "react-router-dom"

function AddWarehouseSeller(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [errors, seterrors] = useState({});

    const dirType = {id:3, name: "Almacen"};
    const [name,     setname]     = useState('');

    //selects
    const [region,   setregion]   = useState(null);
    const [province, setprovince] = useState(null);
    const [comuna,   setcomuna]   = useState(null);

    const [phonesNumber,        setPhonesNumber]             = useState([]);
    const [editphonesNumber,    setEditPhonesNumber]        = useState([]);

    const [street, setstreet] = useState('');
    const [number, setnumber] = useState('');
    const [local,  setlocal ] = useState('');
    //const [cleanPhones, setCleanPhones] = useState(true);

    //Edit

    const [warehouse, setwarehouse] = useState(null);
    const [searchwarehouse, setsearchwarehouse] = useState(false);
    const [loadingwarehouse, setloadingwarehouse] = useState(true);

    const reset = () => {
        setloading(false);
        setwarehouse(null);
        setsearchwarehouse(false);
        setloadingwarehouse(true);

        setregion(null);
        setprovince(null);
        setcomuna(null);
        setPhonesNumber([]);
        setEditPhonesNumber([]);

        setname('');
        setstreet('');
        setnumber('');
        setlocal('');
    }

    const changeWarehouse = (data) => {
        setsearchwarehouse(true);
        setloadingwarehouse(true);
        setwarehouse(data);
        let url = '/warehouse/'+data.value;
        console.log(url);

        axios.get(url).then((res) => {
            console.log(res.data.data);
            if(res.data.data.result){
                let data = res.data.data.values[0];
                console.log(data);

                setname(data.name);
                
                console.log(data.address.region);

                let address = ((Array.isArray(data.address)) ? data.address[0] : data.address);
                
                let formatRegion        = {};
                formatRegion.value      = address.region.id;
                formatRegion.label      = address.region.name;

                let formatProvince      = {};
                formatProvince.value    = address.province.id;
                formatProvince.label    = address.province.name;

                let formatComuna        = {};
                formatComuna.value      = address.comuna.id;
                formatComuna.label      = address.comuna.name;

                setregion(formatRegion);
                setprovince(formatProvince);
                setcomuna(formatComuna);
                setlocal(address.local);
                setnumber(address.number);
                setstreet(address.street);

                let newPhonesNumber = [];
                for (let i = 0; i < data.phone.length; i++) {
                    console.log(data.phone[i]);
                    const element = data.phone[i];
                    let newElement = {};

                    newElement.id           = i+1;
                    newElement.number       = element.number.toString();
                    newElement.phoneType    = {value:element.phoneType.id, label:element.phoneType.name}

                    newPhonesNumber.push(newElement);
                }

                /*
                    console.log(data.phone);
                    console.log(newPhonesNumber);
                */

                setEditPhonesNumber(newPhonesNumber);

                setsearchwarehouse(false);
                setloadingwarehouse(false);
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
            thiserrors.name = 'Debe ingresar un nombre para el almacén';
            errorsCount++;
        }else if(name.trim().length < 6){
            thiserrors.name = 'El nombre del almacén ingresado es demasiado corto';
            errorsCount++;
        }else if(name.trim().length > 40){
            thiserrors.name = 'El nombre del almacén ingresado es demasiado largo';
            errorsCount++;
        }

        //region
        if(region === null){
            thiserrors.region = 'Debe seleccionar una región';
            errorsCount++;
        }

        //province
        if(province === null){
            thiserrors.province = 'Debe seleccionar una provincia';
            errorsCount++;
        }

        //comuna
        if(comuna === null){
            thiserrors.comuna = 'Debe seleccionar una comuna';
            errorsCount++;
        }

        //street
        if(street.trim() === ''){
            thiserrors.street = 'Debe ingresar una dirección de calle';
            errorsCount++;
        }

        //number
        if(number.trim() === ''){
            thiserrors.number = 'Debe ingresar un número de dirección';
            errorsCount++;
        }

        //local
        if(local.trim() === ''){
            thiserrors.local = 'Debe ingresar una dirección de local';
            errorsCount++;
        }

        //phones
        if(phonesNumber.length === 0){
            thiserrors.phone = 'Debe ingresar como mínimo un número de teléfono';
            errorsCount++;
        }else{
            let reg = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;

            for (let i = 0; i < phonesNumber.length; i++) {

                const phone = phonesNumber[i];
                let thisNumberValidate = reg.test(phone.number);
                let thisTypeNumberValidate = phone.phoneType !== null && phone.phoneType.hasOwnProperty('value');
                
                if(!thisNumberValidate || !thisTypeNumberValidate){
                    thiserrors.phone = 'Alguno de los números telefónicos ingresados no cumplen un formato aceptado.';
                    errorsCount++;
                }
            }
    
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

        let url = '/warehouse';
        let newPhonesNumber = [];
        
        let validation = validate();
        
        if(validation){

            setsending(true);

            for (let i = 0; i < phonesNumber.length; i++) {
                const element = phonesNumber[i];
                let newElement = {};
    
                newElement.number = Number(element.number);
                newElement.phoneType = {id:element.phoneType.value, name:element.phoneType.label}
    
                newPhonesNumber.push(newElement);
            }
    
            let formatRegion            = {};
                formatRegion.id         = region.value;
                formatRegion.name       = region.label;
            let formatProvince          = {};
                formatProvince.id       = province.value;
                formatProvince.name     = province.label;
            let formatComuna            = {};
                formatComuna.id         = comuna.value;
                formatComuna.name       = comuna.label;

            if(props.Edit){

                let data = {
                    id: warehouse.value,
                    name,
                    phone: newPhonesNumber,
                    address: [{
                        dirType,
                        region: formatRegion,
                        province: formatProvince,
                        comuna: formatComuna,
                        street,
                        number,
                        local
                    }]
                }

                axios({
                    url,
                    method: 'put',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Almacen actualizado satisfactoriamente!')
                        setloading(true);
                        reset();
                        window.scrollTo({top: 10, behavior: 'smooth'});
                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 1000);
                    }else{
                        seterrormessage(res.data.data.message);
                        window.scrollTo({top: 10, behavior: 'smooth'});
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }else{

                let data = {
                    name,
                    phone: newPhonesNumber,
                    address: [{
                        dirType,
                        region: formatRegion,
                        province: formatProvince,
                        comuna: formatComuna,
                        street,
                        number,
                        local
                    }]
                }

                axios({
                    url,
                    method: 'post',
                    data
                }).then((res) => {
                    console.log(res);
                    setsending(false);
                    if(res.data.data.result){
                        setsuccessmessage('¡Almacen creado satisfactoriamente!');
                        reset();
                        setTimeout(() => {
                            setsuccessmessage("");
                        }, 1000);
                        window.scrollTo({top: 10, behavior: 'smooth'});
                    }else{
                        seterrormessage(res.data.data.message);
                        window.scrollTo({top: 10, behavior: 'smooth'});
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
                        <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                        <BreadcrumbItem active>Actualizar almacén</BreadcrumbItem>
                    </Breadcrumb>
                :
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                        <BreadcrumbItem active>Nuevo almacén</BreadcrumbItem>
                    </Breadcrumb>
                }

                <div className="row align-items-center justify-content-between mb-3">
                    <div className="col col-lg-auto">
                        <h1 className="h4 mb-0 font-weight-bold">
                            {props.Edit ? 'Actualizar almacén' : 'Nuevo almacén'}
                        </h1>
                    </div>
                    {!props.Edit &&
                        <div className="col col-lg-auto">
                            <Link to="/viewWarehouseSeller" className="btn btn-info">
                                Listado de almacenes
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
            </div>
        )
    }else{
        return (
            <div>
                {props.Edit
                ?
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                        <BreadcrumbItem active>Actualizar almacén</BreadcrumbItem>
                    </Breadcrumb>
                :
                    <Breadcrumb listClassName="px-0">
                        <BreadcrumbItem><a href="##">Mis almacenes</a></BreadcrumbItem>
                        <BreadcrumbItem active>Nuevo almacén</BreadcrumbItem>
                    </Breadcrumb>
                }

                <div className="row align-items-center justify-content-between mb-3">
                    <div className="col col-lg-auto">
                        <h1 className="h4 mb-0 font-weight-bold">
                            {props.Edit ? 'Actualizar almacén' : 'Nuevo almacén'}
                        </h1>
                    </div>
                    {!props.Edit &&
                        <div className="col col-lg-auto">
                            <Link to="/viewWarehouseSeller" className="btn btn-info">
                                Listado de almacenes
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
                                            <CardTitle>
                                                Seleccione un almacén
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                            <WarehouseSelect value={warehouse} onChange={changeWarehouse} />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    }

                    {((!props.Edit) || (props.Edit && warehouse !== null && !loadingwarehouse)) &&
                        <form onSubmit={(e) => addWarehouse(e)} action="">
                            <Row>
                                <Col md="7">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                Datos del almacén
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                                <Row>
                                                    <Col xs="12">
                                                        <div className="form-group">
                                                            <label htmlFor="warehouseName">Nombre del almacén:</label>
                                                            <input 
                                                                type="text"
                                                                id="warehouseName"
                                                                min="0" 
                                                                value={name}
                                                                onChange={(e) => setname(e.target.value)}
                                                                placeholder="Ingrese el nombre del almacén" 
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
                                                        <h3 className="h6 text-muted">
                                                            Dirección:
                                                        </h3>
                                                        <hr/>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className={((typeof errors === 'object' && errors.hasOwnProperty('region') ? 'has-error' : '') +' form-group')}>
                                                            <label htmlFor="warehouseName">Región:</label>
                                                            <RegionsSelect value={region} onChange={setregion} />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('region')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.region}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className={((typeof errors === 'object' && errors.hasOwnProperty('province') ? 'has-error' : '') +' form-group')}>
                                                            <label htmlFor="warehouseName">Provincia:</label>
                                                            <ProvincesSelect 
                                                                value={province}
                                                                onChange={setprovince}
                                                                idRegion={(region !== null && typeof region === 'object' && region.hasOwnProperty('value') ? region.value : null)} 
                                                            />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('province')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.province}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className={((typeof errors === 'object' && errors.hasOwnProperty('comuna') ? 'has-error' : '') +' form-group')}>
                                                            <label htmlFor="warehouseName">Comuna:</label>
                                                            <ComunasSelect 
                                                                value={comuna}
                                                                onChange={setcomuna}
                                                                idProvince={(province !== null && typeof province === 'object' && province.hasOwnProperty('value') ? province.value : null)} 
                                                            />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('comuna')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.comuna}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="form-group">
                                                            <label htmlFor="warehouseStreet">Calle:</label>
                                                            <input 
                                                                type="text"
                                                                id="warehouseStreet"
                                                                min="0" 
                                                                value={street}
                                                                onChange={(e) => setstreet(e.target.value)}
                                                                placeholder="Dirección de calle" 
                                                                className={((typeof errors === 'object' && errors.hasOwnProperty('street') ? 'is-invalid' : '') +' form-control')}
                                                            />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('street')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.street}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="form-group">
                                                            <label htmlFor="warehouseNDpto">Número:</label>
                                                            <input 
                                                                type="text"
                                                                id="warehouseNDpto"
                                                                min="0" 
                                                                value={number}
                                                                onChange={(e) => setnumber(e.target.value)}
                                                                placeholder="Número de departamento" 
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
                                                    <Col md="6">
                                                        <div className="form-group">
                                                            <label htmlFor="warehouseLocal">Local:</label>
                                                            <input 
                                                                type="text"
                                                                id="warehouseLocal"
                                                                min="0" 
                                                                value={local}
                                                                onChange={(e) => setlocal(e.target.value)}
                                                                placeholder="Local del almacén" 
                                                                className={((typeof errors === 'object' && errors.hasOwnProperty('local') ? 'is-invalid' : '') +' form-control')}
                                                            />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('local')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.local}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="5">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                Datos de contacto
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                                <Row>
                                                    <Col xs="12">
                                                        <div className="form-group">
                                                            <label htmlFor="warehouseName">Teléfono:</label>
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('phone')) &&
                                                                <div className="alert alert-danger mt-3 font-weight-bold">
                                                                    <p className="mb-0 small">
                                                                        {errors.phone}
                                                                    </p>
                                                                </div>
                                                            }
                                                            <PhoneMultiple 
                                                                //clean={cleanPhones} 
                                                                loadValue={editphonesNumber} 
                                                                value={phonesNumber} 
                                                                onChange={setPhonesNumber} 
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                        </CardBody>
                                    </Card>
                                    {props.Edit 
                                    ?
                                        <p className="text-right">
                                            <button disabled={sending} type="submit" className="btn btn-lg font-weight-bold btn-warning">
                                                {(!sending) ? 'Actualizar almacén' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                            </button>
                                        </p>
                                    :
                                        <p className="text-right">
                                            <button disabled={sending} type="submit" className="btn btn-lg font-weight-bold btn-info">
                                                {(!sending) ? 'Crear almacén' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                            </button>
                                        </p>
                                    }
                                </Col>
                            </Row>
                        </form>
                    }

                    {(props.Edit && searchwarehouse) &&
                        <InlineSpinner />
                    }
            </div>
        )
    }
}

export default AddWarehouseSeller
