import React, {useState , useEffect} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CustomInput,
} from 'reactstrap';
import axios from 'axios'
import WarehouseSelect from '../../../components/selects/WarehouseSelect';
import InlineSpinner from '../../spinner/InlineSpinner';
import ProductSelect from '../../../components/selects/ProductSelect';
import CheckColors from '../../../components/helpers/CheckColors';
import SizesCombobox from '../../../components/helpers/SizesCombobox';
import { moneyFormatter } from '../../../utils/helpers';

function AddProductSeller(props) {

    const [loading, setloading] = useState(true);
    const [search,  setsearch]  = useState(true);
    const [sending, setsending] = useState(false);
    const [successmessage, setsuccessmessage] = useState('');
    const [errormessage, seterrormessage] = useState('');

    //const isEdit = (props.Edit !== undefined && props.Edit !== null) ? true : false;

    const [errors, seterrors] = useState({});
    const [variationerrors, setvariationerrors] = useState({});

    const [warehouse,   setwarehouse]   = useState(null);
    const [skuId,       setskuId]       = useState(null);
    const [note,        setnote]        = useState('');
    const [price,       setprice]       = useState('');
    const [quantity,    setquantity]    = useState('');
    //const [inPrice,     setinPrice]     = useState(true);
    const [type,        settype]        = useState('out');

    const [priceMessage,     setpricemessage]        = useState('');
    const [variationList,    setvariationList]        = useState([]);

    const [variation,        setvariation]        = useState([]);
    const [countvariation,   setcountvariation]   = useState(0);
    const maxVariations = 5;

    //Edit

    const reset = () => {
        setwarehouse(null);
        setskuId(null);
        setvariation([]);
        setnote('');
        setprice('');
        setquantity('');
        setcountvariation(0);
    }

    const changeWarehouse = (data) => {
        setwarehouse(data);
    }

    let urlGetVariations = 'https://intimi.vps.co.ve/inner/pampatarStatic/data/variations.json';

    useEffect(() => {
        if(loading){
            const getData = () => {
                if(search){
                    setsearch(false);
        
                    axios.get(urlGetVariations)
                    .then((res) => {
                        //console.log('variations');
                        //console.log(res.data);
                        setvariationList(res.data);
                        setloading(false);
                    }).catch((err) => {
                        console.error(err);
                    });
                }   
            }

            getData();
        }
    }, [loading,search,urlGetVariations]);

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

        if(variation.length > 0){
            let variationList = variation;
            let variationErrorsCount = 0;
            let variationstotalquantity = 0;

            for (let i = 0; i < variationList.length; i++) {
                const variation = variationList[i];

                if(variation.size === null){
                    variationErrorsCount++;
                }

                if(variation.quantity === '' || Number(variation.quantity) === 0){
                    variationErrorsCount++;
                }

                if(variation.quantity === '' || Number(variation.quantity) === 0){
                    variationErrorsCount++;
                }else{
                    variationstotalquantity = Number(variationstotalquantity) + Number(variation.quantity);
                }

                if(variation.color === ''){
                    variationErrorsCount++;
                }
            }

            if(variationErrorsCount > 0){
                errorsCount++;
                thiserrors.variations = 'Revise las variaciones y sus parametros, recuerde que debe completar los datos de la variación en su totalidad.';
            }

            if(variation.length < 2){
                errorsCount++;
                thiserrors.variations = 'Debe registrar un mínimo de 2 variaciones para ingresar un lote con esta caracteristica.';
            }

            if(Number(variationstotalquantity) > Number(quantity)){
                errorsCount++;
                thiserrors.variations = 'Las cantidades sumadas de productos por variación no deben exceder a la cantidad de productos ingresados en el lote';
            }

            if(Number(variationstotalquantity) !== Number(quantity)){
                errorsCount++;
                thiserrors.variations = 'Las cantidades sumadas de productos por variación deben ser iguales a la cantidad total del lote';
            }
        }

        //price
        /*
            if(price === ''){
                thiserrors.price = 'Debe ingresar un precio';
                errorsCount++;
            }
        */

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
        //let newPhonesNumber = [];
        
        let validation = validate();
        
        if(validation){

            setsending(true);
            
            let data = {
                WarehouseId: warehouse.value,
                skuId: skuId.value,
                note,
                //price: Number(price),
                type: 'in',
                quantity:Number(quantity),
                //inPrice
            }

            if(variation.length > 0){
                let variationList = variation;
                let newvariationList = [];

                for (let i = 0; i < variationList.length; i++) {
                    const element = variationList[i];
                    let formatVariation = {};
                    console.log(element.size.value);

                    formatVariation.size        = element.size.value;
                    formatVariation.quantity    = element.quantity;
                    formatVariation.discount    = element.discount;
                    formatVariation.color       = element.color;

                    newvariationList.push(formatVariation);
                }

                console.log(newvariationList);
                data.variation = newvariationList;

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
                    window.scrollTo({top: 10, behavior: 'smooth'});
                    reset();
                    setsuccessmessage('¡Lote creado satisfactoriamente!')
                }else{
                    window.scrollTo({top: 10, behavior: 'smooth'});
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
                color:""
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
                console.log('Cambiando:'+keyName+' a:'+value);
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
        console.log(variationList);

        for (let i = 0; i < variationList.length; i++) {
            let format = variationList[i];
            format.id = i + 1;
            newVariationList.push(format);
        }

        console.log(newVariationList);
        setvariation(newVariationList);
        setcountvariation(countvariation + 5);
    }

    const handleChangeSkuId = (value) => {
        setskuId(value);
        setpricemessage('');
        console.log(value);

        let urlPrice = '/getPriceCurrent/Inventory/sku/'+value.value+'/product';

        axios.get(urlPrice).then((res) => {
            console.log(res.data);
            if(res.data && res.data.hasOwnProperty('price')){
                let money = moneyFormatter(res.data.price);
                setprice(money);
                setsearch(false);
            }else{
                console.log('error');
                setpricemessage(res.data.data.message);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    if(!loading){
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    {props.Edit ? 'Actualizar lote' : 'Nuevo lote'}
                </h1>
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
                                                <i className="mdi mdi-border-all mr-2"></i>Seleccione un lote
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

                    {((!props.Edit) || (props.Edit && warehouse !== null)) &&
                        <form onSubmit={(e) => goToAddProductSeller(e)} action="">
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <div className="p-3">
                                            <CardTitle>
                                                <i className="mdi mdi-border-all mr-2"></i>Datos del lote
                                            </CardTitle>
                                        </div>
                                        <CardBody className="border-top">
                                                <Row>
                                                    <Col md="6">
                                                        <div  className={((typeof errors === 'object' && errors.hasOwnProperty('warehouse') ? 'has-error' : '') +' form-group')}>
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
                                                        <div  className={((typeof errors === 'object' && errors.hasOwnProperty('skuId') ? 'has-error' : '') +' form-group')}>
                                                            <label htmlFor="">Seleccione un producto</label>
                                                            <ProductSelect value={skuId} onChange={handleChangeSkuId} />
                                                            {(typeof errors === 'object' && errors.hasOwnProperty('skuId')) &&
                                                                <div className="help-block text-danger font-weight-bold">
                                                                    <small>
                                                                        {errors.skuId}
                                                                    </small>
                                                                </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                    {(skuId !== null) &&
                                                        <Col md="12">
                                                            <div className="form-group">
                                                                <label htmlFor="">Precio</label>
                                                                {(priceMessage !== '') ?
                                                                    <div className="alert alert-warning">
                                                                        {priceMessage}
                                                                    </div>
                                                                :
                                                                    <input 
                                                                        type="text" 
                                                                        value={price}
                                                                        placeholder="Precio"
                                                                        className="form-control"
                                                                        readOnly
                                                                    />
                                                                }
                                                                {(typeof errors === 'object' && errors.hasOwnProperty('price')) &&
                                                                    <div className="help-block text-danger font-weight-bold">
                                                                        <small>
                                                                            {errors.price}
                                                                        </small>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </Col>
                                                    }
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
                                                    <Col className="d-none" md="6">
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
                                                    <Col md="12">
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
                                    {props.Edit 
                                    ?
                                        <p className="text-right">
                                            <button disabled={sending} type="submit" className="btn btn-lg font-weight-bold btn-warning">
                                                {(!sending) ? 'Actualizar lote' : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                            </button>
                                        </p>
                                    :
                                        <p className="text-right">
                                            <button disabled={sending} type="submit" className="btn btn-lg font-weight-bold btn-primary">
                                                {(!sending) ? <span><i className="fa fa-truck-loading mr-2"></i> Añadir lote</span> : <p className="mb-0"><i className="fa fa-spinner fa-spin"></i></p>}
                                            </button>
                                        </p>
                                    }
                                </Col>
                            </Row>
                        </form>
                    }
            </div>
        )
    }else{
        return (
            <div>
                <h1 className="h4 mb-3 font-weight-bold">
                    {props.Edit ? 'Actualizar lote' : 'Nuevo lote'}
                </h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default AddProductSeller;
