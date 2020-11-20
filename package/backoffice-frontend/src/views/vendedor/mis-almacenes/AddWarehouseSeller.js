import React, {useState} from 'react'
//import {useSelector} from 'react-redux'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import axios from 'axios'
import RegionsSelect from '../../../components/selects/RegionsSelect';
import ProvincesSelect from '../../../components/selects/ProvincesSelect';
import ComunasSelect from '../../../components/selects/ComunasSelect';
import PhoneMultiple from '../../../components/phones/phoneMultiple';
import WarehouseSelect from '../../../components/selects/WarehouseSelect';
import InlineSpinner from '../../spinner/InlineSpinner';

function AddWarehouseSeller(props) {

    //const [loading, setloading] = useState(false);
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

    //Edit

    const [warehouse, setwarehouse] = useState(null);
    const [searchwarehouse, setsearchwarehouse] = useState(false);
    const [loadingwarehouse, setloadingwarehouse] = useState(true);

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
                setname(data.name);

                let formatRegion        = {};
                formatRegion.value      = data.address[0].region.id;
                formatRegion.label      = data.address[0].region.name;

                let formatProvince      = {};
                formatProvince.value    = data.address[0].province.id;
                formatProvince.label    = data.address[0].province.name;

                let formatComuna        = {};
                formatComuna.value      = data.address[0].comuna.id;
                formatComuna.label      = data.address[0].comuna.name;

                setregion(formatRegion);
                setprovince(formatProvince);
                setcomuna(formatComuna);
                setlocal(data.address[0].local);
                setnumber(data.address[0].number);
                setstreet(data.address[0].street);

                let newPhonesNumber = [];
                for (let i = 0; i < data.phone.length; i++) {
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
            thiserrors.name = 'Debe ingresar un nombre para el almacen';
            errorsCount++;
        }else if(name.trim().length < 6){
            thiserrors.name = 'El nombre del almacen ingresado es demasiado corto';
            errorsCount++;
        }else if(name.trim().length > 40){
            thiserrors.name = 'El nombre del almacen ingresado es demasiado largo';
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
                        setsuccessmessage('¡Almacen Editado satisfactoriamente!')
                    }else{
                        seterrormessage(res.data.data.message);
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
                        setsuccessmessage('¡Almacen creado satisfactoriamente!')
                    }else{
                        seterrormessage(res.data.data.message);
                    }
                }).catch((err) => {
                    console.error(err);
                    setsending(false);
                })
            }
        }
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                {props.Edit ? 'Editar almacen' : 'crear nuevo almacen'}
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
                                            <i className="mdi mdi-border-all mr-2"></i>Seleccione un almacen
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
                                            <i className="mdi mdi-border-all mr-2"></i>Datos del almacen
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                            <Row>
                                                <Col xs="12">
                                                    <div className="form-group">
                                                        <label htmlFor="warehouseName">Nombre del almacen:</label>
                                                        <input 
                                                            type="text"
                                                            id="warehouseName"
                                                            min="0" 
                                                            value={name}
                                                            onChange={(e) => setname(e.target.value)}
                                                            placeholder="Ingrese el nombre del almacen" 
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
                                                    <div className={((typeof errors === 'object' && errors.hasOwnProperty('name') ? 'has-error' : '') +' form-group')}>
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
                                                    <div className={((typeof errors === 'object' && errors.hasOwnProperty('name') ? 'has-error' : '') +' form-group')}>
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
                                                    <div className={((typeof errors === 'object' && errors.hasOwnProperty('name') ? 'has-error' : '') +' form-group')}>
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
                                                        <label htmlFor="warehouseNDpto"># de dpto:</label>
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
                                                            placeholder="Local del almacen" 
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
                                            <i className="mdi mdi-border-all mr-2"></i>Datos de contacto
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                            <Row>
                                                <Col xs="12">
                                                    <div className="form-group">
                                                        <label htmlFor="warehouseName">Teléfono:</label>
                                                        <PhoneMultiple loadValue={editphonesNumber} value={phonesNumber} onChange={setPhonesNumber} />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('phone')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.phone}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                    </CardBody>
                                </Card>
                                {props.Edit 
                                ?
                                    <p>
                                        <button disabled={sending} type="submit" className="btn btn-warning">
                                            {(!sending) ? 'Editar almacen' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                        </button>
                                    </p>
                                :
                                    <p>
                                        <button disabled={sending} type="submit" className="btn btn-info">
                                            {(!sending) ? 'Crear almacen' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
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

export default AddWarehouseSeller
