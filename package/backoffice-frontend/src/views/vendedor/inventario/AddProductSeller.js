import React, {useState, useEffect, useRef, Fragment} from 'react'
import {useSelector} from 'react-redux'
import { SketchPicker } from 'react-color';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    CustomInput,
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
import WarehouseSelect from '../../../components/selects/WarehouseSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import ProductSelect from '../../../components/selects/ProductSelect';
import ColorPicker from '../../../components/pickers/ColorPicker';
import SizesSelect from '../../../components/selects/SizesSelect';

function AddProductSeller(props) {

    const [loading, setloading] = useState(false);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    const [errors, seterrors] = useState({});

    const [warehouse,   setwarehouse]   = useState(null);
    const [skuId,       setskuId]       = useState(null);
    const [note,        setnote]        = useState('');
    const [price,       setprice]       = useState('');
    const [quantity,    setquantity]    = useState('');
    const [inPrice,     setinPrice]     = useState(true);
    const [type,        settype]        = useState('out');

    const [variation,        setvariation]        = useState([]);
    const [countvariation,   setcountvariation]   = useState(0);
    const maxVariations = 5;

    //Edit
    const [searchwarehouse, setsearchwarehouse] = useState(false);
    const [loadingwarehouse, setloadingwarehouse] = useState(true);

    const changeWarehouse = (data) => {
        setwarehouse(data);
    }

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        //note
        if(note.trim() === ''){
            thiserrors.note = 'Añada una nota';
            errorsCount++;
        }

        //warehouse
        if(warehouse === null){
            thiserrors.warehouse = 'Debe seleccionar un almacen';
            errorsCount++;
        }

        //skuId
        if(skuId === null){
            thiserrors.skuId = 'Debe seleccionar un producto';
            errorsCount++;
        }

        //quantity
        if(quantity === ''){
            thiserrors.quantity = 'Ingrese una cantidad';
            errorsCount++;
        }

        //price
        if(price === ''){
            thiserrors.price = 'Debe ingresar un precio';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const goToAddProductSeller = (e) => {
        e.preventDefault();
        e.stopPropagation();

        seterrors({});
        setsuccessmessage('');
        seterrormessage('');

        let urlset = '/inventory/product/all';
        let newPhonesNumber = [];
        
        let validation = validate();
        
        if(validation){

            setsending(true);
            
            let data = {
                WarehouseId: warehouse.value,
                skuId: skuId.value,
                note,
                price: Number(price),
                type: 'in',
                quantity:Number(quantity),
                inPrice
            }

            if(variation.length > 0){
                let variationList = variation;
                for (let i = 0; i < variationList.length; i++) {
                    const element = variationList[i];
                    let formatVariation = {};
                    formatVariation.size        = element.size;
                    formatVariation.quantity    = element.quantity;
                    formatVariation.discount    = element.discount;
                    formatVariation.color       = element.color;
                }
                data.variation = variationList;
            }else{
                data.variation = null;
            }

            axios({
                url: urlset,
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

    const addVariation = () => {
        console.log('Añadiendo variacion');
        let id = variation.length + 1;
        let variationList = variation;
        let newVariation = 
        {
                id,
                size: null,
                quantity:"",
                discount:'',
                color:"#fff"
        };

        variationList.push(newVariation);
        console.log(variationList);

        setvariation(variationList);
        setcountvariation(countvariation + 5);
    }

    //console.log(variation);
    //console.log(variation.length);

    const changeVariationData = (id, keyName, value) => {
        let variationList = variation;
        for (let i = 0; i < variationList.length; i++) {
            const element = variationList[i];
            if(element.id === id){
                //console.log('Cambiando:'+keyName+' a:'+value);
                element[keyName] = value;
            }
        }

        setvariation(variationList);
        setcountvariation(countvariation + 5);
    }

    const deleteVariation = (id) => {
        //alert(phoneNumber);
        let variationList = variation;
        variationList.splice(id - 1, 1);
        let newVariationList = [];
        //console.log(variationList);

        for (let i = 0; i < variationList.length; i++) {
            let format = variationList[i];
            format.id = i + 1;
            newVariationList.push(format);
        }

        console.log(newVariationList);
        setvariation(newVariationList);
        setcountvariation(countvariation + 5);
    }

    return (
        <div>
            <h1 className="h4 mb-3 font-weight-bold">
                {props.Edit ? 'Actualizar lote' : 'Icorporar lote'}
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
                    <form onSubmit={(e) => goToAddProductSeller(e)} action="">
                        <Row>
                            <Col md="7">
                                <Card>
                                    <div className="p-3">
                                        <CardTitle>
                                            <i className="mdi mdi-border-all mr-2"></i>Datos del lote
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                            <Row>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Seleccione un almacen</label>
                                                        <WarehouseSelect value={warehouse} onChange={changeWarehouse} />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('warehouse')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.warehouse}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="">Seleccione un producto</label>
                                                        <ProductSelect value={skuId} onChange={setskuId} />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('skuId')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.skuId}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="12">
                                                    <div className="form-group">
                                                        <label htmlFor="">¿Incluir en el precio promedio?</label>
                                                        <div className="my-2">
                                                            <CustomInput 
                                                                className="d-inline-flex mr-3" 
                                                                checked={(inPrice === true)} 
                                                                onChange={() => setinPrice(true)}  
                                                                type="radio" 
                                                                id={`inPrice-y`} 
                                                                name={`inPrice`}    
                                                                label='Si' 
                                                            />
                                                            <CustomInput 
                                                                className="d-inline-flex mr-3" 
                                                                checked={(inPrice === false)} 
                                                                onChange={() => setinPrice(false)}  
                                                                type="radio" 
                                                                id={`inPrice-n`} 
                                                                name={`inPrice`}    
                                                                label='No' 
                                                            />
                                                        </div>
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('inPrice')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.inPrice}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col className="d-none" md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="">¿Tipo de lote?</label>
                                                        <div>
                                                            <CustomInput 
                                                                className="d-inline-flex mr-3" 
                                                                checked={(type === 'in')} 
                                                                onChange={() => settype('in')}  
                                                                type="radio" 
                                                                id={`in-out-in`} 
                                                                name={`in-out`}    
                                                                label='Entrada' 
                                                            />
                                                            <CustomInput 
                                                                className="d-inline-flex mr-3" 
                                                                checked={(type === 'out')} 
                                                                onChange={() => settype('out')}  
                                                                type="radio" 
                                                                id={`in-out-out`} 
                                                                name={`in-out`}    
                                                                label='Salida' 
                                                            />
                                                        </div>
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('type')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.type}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="price">Precio:</label>
                                                        <input 
                                                            type="number"
                                                            id="price"
                                                            min="0" 
                                                            value={price}
                                                            onChange={(e) => setprice(e.target.value)}
                                                            placeholder="Precio del lote" 
                                                            className={((typeof errors === 'object' && errors.hasOwnProperty('price') ? 'is-invalid' : '') +' form-control')}
                                                        />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('price')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.price}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="form-group">
                                                        <label htmlFor="quantity">Cantidad:</label>
                                                        <input 
                                                            type="number"
                                                            id="quantity"
                                                            min="0" 
                                                            value={quantity}
                                                            onChange={(e) => setquantity(e.target.value)}
                                                            placeholder="Cantidad" 
                                                            className={((typeof errors === 'object' && errors.hasOwnProperty('quantity') ? 'is-invalid' : '') +' form-control')}
                                                        />
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('quantity')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.quantity}
                                                                </small>
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col md="12">
                                                    <div className="form-group">
                                                        <label htmlFor="note">Nota:</label>
                                                        <textarea 
                                                        value={note}
                                                        onChange={(e) => setnote(e.target.value)}
                                                        name="" 
                                                        id="note" 
                                                        cols="30" 
                                                        rows="5" 
                                                        placeholder="Escriba una nota"
                                                        className={((typeof errors === 'object' && errors.hasOwnProperty('note') ? 'is-invalid' : '') +' form-control')}></textarea>
                                                        {(typeof errors === 'object' && errors.hasOwnProperty('note')) &&
                                                            <div className="help-block text-danger font-weight-bold">
                                                                <small>
                                                                    {errors.note}
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
                                            <i className="mdi mdi-border-all mr-2"></i>Variaciones: {variation.length}
                                        </CardTitle>
                                    </div>
                                    <CardBody className="border-top">
                                        {variation.length > 0 && variation.length && variation.map((item, key) => {
                                            let search = variation.filter(data => data.id === item.id);
                                            let activeForm = search.length > 0;
                                            //console.log(isActive[0]);
                                            //console.log(document);
                                            
                                            return (
                                                <div className="content-variation" key={key}>
                                                    <h6 className="font-weight-bold">Variación #{item.id}: <button type="button" onClick={() => deleteVariation(item.id)} className="btn btn-primary btn-sm">Eliminar</button></h6>
                                                    <hr/>
                                                    <Row>
                                                        <Col md="6">
                                                            <label htmlFor="">Tamaño:</label>
                                                            <SizesSelect onChange={(data) => changeVariationData(item.id, 'size', data)} value={(activeForm) ? search[0].size : '' } />
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="form-group">
                                                                <label htmlFor="">Cantidad:</label>
                                                                <input 
                                                                    type="number" 
                                                                    placeholder="Cantidad"
                                                                    min="0"
                                                                    onChange={(e) => changeVariationData(item.id, 'quantity', e.target.value)}
                                                                    value={(activeForm) ? search[0].quantity : '' }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="form-group">
                                                                <label htmlFor="">Descuento:</label>
                                                                <input 
                                                                    type="number"
                                                                    placeholder="Descuento"
                                                                    min="0" 
                                                                    onChange={(e) => changeVariationData(item.id, 'discount', e.target.value)}
                                                                    value={(activeForm) ? search[0].discount : '' }
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs="6">
                                                            <div className="form-group">
                                                                <label htmlFor="">Color:</label>
                                                                <ColorPicker onChange={(data) => changeVariationData(item.id, 'color', data)} value={(activeForm) ? search[0].color : '' } />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            )
                                        })}

                                        {(variation.length < maxVariations) &&
                                            <button 
                                                type="button" 
                                                onClick={() => addVariation()} 
                                                className="btn btn-info"
                                            >
                                                Añadir variación
                                            </button>
                                        }
                                    </CardBody>
                                </Card>
                                {props.Edit 
                                ?
                                    <p className="text-right">
                                        <button disabled={sending} type="submit" className="btn btn-warning">
                                            {(!sending) ? 'Editar lote' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                        </button>
                                    </p>
                                :
                                    <p className="text-right">
                                        <button disabled={sending} type="submit" className="btn btn-primary">
                                            {(!sending) ? 'Ingresar lote' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
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

export default AddProductSeller;
