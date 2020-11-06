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
import RegionsSelect from '../../../components/selects/RegionsSelect';
import ProvincesSelect from '../../../components/selects/ProvincesSelect';
import ComunasSelect from '../../../components/selects/ComunasSelect';
import MultipleSelect from '../../../components/selects/MultipleSelect';
import PhoneMultiple from '../../../components/phones/phoneMultiple';
import { send } from 'process';

function AddWarehouseSeller(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const dirType = {id:3, name: "Almacen"};
    const [name,     setname]     = useState('');

    //selects
    const [region,   setregion]   = useState(null);
    const [province, setprovince] = useState(null);
    const [comuna,   setcomuna]   = useState(null);

    const [phonesNumber,   setPhonesNumber]     = useState([]);

    const [street, setstreet] = useState('');
    const [number, setnumber] = useState('');
    const [local,  setlocal ] = useState('');

    const adWarehouse = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setsuccessmessage('');
        seterrormessage('');

        let url = '/warehouse';

        let newPhonesNumber = [];
        for (let i = 0; i < phonesNumber.length; i++) {
            const element = phonesNumber[i];
            let newElement = {};

            newElement.number = new Number(element.number);
            newElement.phoneType = {id:element.phoneType.value, name:element.phoneType.label}

            newPhonesNumber.push(newElement);
        }

        let formatRegion    = {};
        formatRegion.id     = region.value;
        formatRegion.name   = region.label;

        let formatProvince    = {};
        formatProvince.id     = province.value;
        formatProvince.name   = province.label;

        let formatComuna    = {};
        formatComuna.id     = comuna.value;
        formatComuna.name   = comuna.label;

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

        setsending(true);
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

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">crear nuevo almacen</h1>
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

                <form onSubmit={(e) => adWarehouse(e)} action="">
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
                                                        className="form-control"
                                                    />
                                                </div>
                                                <h3 className="h6 text-muted">
                                                    Dirección:
                                                </h3>
                                                <hr/>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group">
                                                    <label htmlFor="warehouseName">Región:</label>
                                                    <RegionsSelect value={region} onChange={setregion} value={region} />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group">
                                                    <label htmlFor="warehouseName">Provincia:</label>
                                                    <ProvincesSelect 
                                                        value={province}
                                                        onChange={setprovince}
                                                        idRegion={(region !== null && typeof region === 'object' && region.hasOwnProperty('value') ? region.value : null)} 
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group">
                                                    <label htmlFor="warehouseName">Comuna:</label>
                                                    <ComunasSelect 
                                                        value={comuna}
                                                        onChange={setcomuna}
                                                        idProvince={(province !== null && typeof province === 'object' && province.hasOwnProperty('value') ? province.value : null)} 
                                                    />
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
                                                        className="form-control"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group">
                                                    <label htmlFor="warehouseNDpto">N# de dpto:</label>
                                                    <input 
                                                        type="text"
                                                        id="warehouseNDpto"
                                                        min="0" 
                                                        value={number}
                                                        onChange={(e) => setnumber(e.target.value)}
                                                        placeholder="Número de departamento" 
                                                        className="form-control"
                                                    />
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
                                                        className="form-control"
                                                    />
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
                                                    <PhoneMultiple value={phonesNumber} onChange={setPhonesNumber} />
                                                </div>
                                            </Col>
                                        </Row>
                                </CardBody>
                            </Card>

                            <p>
                                <button disabled={sending} type="submit" className="btn btn-info">
                                    {(!sending) ? 'Crear almacen' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                </button>
                            </p>
                        </Col>
                    </Row>
                </form>
        </div>
    )
}

export default AddWarehouseSeller
