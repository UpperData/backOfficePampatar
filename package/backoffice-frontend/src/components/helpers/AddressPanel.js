import React, {useState, useEffect, Fragment} from 'react'
import {
    Col,
} from 'reactstrap';
import AddressTypesSelect from '../selects/AddressTypesSelect';

import ComunasSelect from '../selects/ComunasSelect';
import ProvincesSelect from '../selects/ProvincesSelect';
import RegionsSelect from '../selects/RegionsSelect';

function AddressPanel(props) {

    const [address,        setaddress]          = useState((props.value !== null && Array.isArray(props.value)) ? props.value : []);
    const [count,          setcount]            = useState(0);
    //const maxAddress = 10;

    const addAddress = () => {
        let list = address;
        list.push({
            id: ( address.length + 1), 
            dirType: null, 
            region: null, 
            province: null, 
            comuna: null, 
            calle: '', 
            numero: '',
            local: ''
        });

        setaddress(list);
        setcount(count + 1);
    }

    const handleChangeText = (key, value, id) => {
        let list = address;
        let element = list[id - 1];
        element[key] = value;
        list[id - 1] = element;
        setaddress(list);
        setcount(count + 1);
    }

    const deleteAdress = (addressId) => {
        let list = address;
        list.splice(addressId - 1, 1);
        let newList = [];

        for (let i = 0; i < list.length; i++) {
            let format = list[i];
            format.id = i + 1
            newList.push(format);
        }

        setaddress(newList);
        setcount(count + 3);
    }


    let iterator = 1;

    useEffect(() => {
        if(address !== props.value){
            //console.log('cambiando data', document);
            props.onChange(address);
        }
    });

    const setSelect = (data, key, id) => {
        let list = address;
        let element = list[id - 1];
        element[key] = data;
        list[id - 1] = element;
        //console.log(data);
        setaddress(list);
        setcount(count + 1);
    }

    return (
        <div>
            {address.length > 0 &&
                <Fragment>
                    {address.map((item, key) => {

                        //let errors = [];
                        let itemKey = iterator;
                        let thisAddress = address.filter(data => data.id === item.id);
                        let exists = thisAddress.length > 0;

                        iterator++;

                        return <div key={key}>
                                    <h5 className="text-muted">Dirección #{itemKey}:</h5>
                                    <div className="row">
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="warehouseName">Tipo de dirección:</label>
                                                <AddressTypesSelect 
                                                    value={(exists) ? thisAddress[0].dirType : null } 
                                                    onChange={(data) => setSelect(data, 'dirType', item.id)} 
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="warehouseName">Región:</label>
                                                <RegionsSelect 
                                                    value={(exists) ? thisAddress[0].region : null } 
                                                    onChange={(data) => setSelect(data, 'region', item.id)} 
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="warehouseName">Provincia:</label>
                                                <ProvincesSelect 
                                                    value={(exists) ? thisAddress[0].province : null } 
                                                    onChange={(data) => setSelect(data, 'province', item.id)} 
                                                    idRegion={(exists && thisAddress[0].region !== null ? thisAddress[0].region.value : null)} 
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="warehouseName">Comuna:</label>
                                                <ComunasSelect 
                                                    value={(exists) ? thisAddress[0].comuna : null } 
                                                    onChange={(data) => setSelect(data, 'comuna', item.id)} 
                                                    idProvince={(exists && thisAddress[0].province !== null ? thisAddress[0].province.value : null)} 
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="">Calle:</label>
                                                <input 
                                                    type="text"
                                                    id=""
                                                    min="0" 
                                                    value={(exists) ? thisAddress[0].calle : '' }
                                                    onChange={(e) => handleChangeText('calle', e.target.value, item.id)} 
                                                    placeholder="Dirección de calle" 
                                                    className="form-control"
                                                />
                                            </div>
                                        </Col>   
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor=""># de dpto:</label>
                                                <input 
                                                    type="text"
                                                    id=""
                                                    min="0" 
                                                    value={(exists) ? thisAddress[0].numero : '' }
                                                    onChange={(e) => handleChangeText('numero', e.target.value, item.id)} 
                                                    placeholder="Número de departamento" 
                                                    className="form-control"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="">Local:</label>
                                                <input 
                                                    type="text"
                                                    min="0" 
                                                    value={(exists) ? thisAddress[0].local : '' }
                                                    onChange={(e) => handleChangeText('local', e.target.value, item.id)} 
                                                    placeholder="Local del almacen" 
                                                    className="form-control"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            <div className="form-group">
                                                <button onClick={() => deleteAdress(item.id)} className="btn btn-primary">Eliminar dirección</button>
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                    })}
                </Fragment>
            }

            {address.length >= 0 &&
                <button type="button" onClick={() => addAddress()} className="btn btn-block rounded shadow font-weight-bold btn-primary">
                    <i className="fa fa-plus mr-2"></i>Añadir dirección
                </button>
            }
        </div>
    )
}

export default AddressPanel
