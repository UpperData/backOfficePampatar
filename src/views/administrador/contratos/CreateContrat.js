import React, {useState, useEffect} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    FormGroup,
} from 'reactstrap';
import TagsInput from "react-tagsinput";
import Datetime from "react-datetime";
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import moment from 'moment'

//styles
import "react-datetime/css/react-datetime.css";
import "react-tagsinput/react-tagsinput.css";
import ShopSelect from '../../../components/selects/ShopSelect';
import CustomFileInput from '../../../components/files/CustomFileInput';

//lang
require("moment/locale/es");

/*
var yesterday = Datetime.moment().subtract(1, "day");
var valid = function (current) {
  return current.isAfter(yesterday);
};
*/

function CreateContrat() {

    const [loading, setloading]                     = useState(true);
    const [search, setsearch]                     = useState(true);
    const [sending, setsending]                     = useState(false);
    const [success, setsuccess]                     = useState(false);
    const [errors, seterrors]                       = useState({});
    const [data, setData]                           = useState(null);
    const [errorMessage, seterrorMessage]           = useState('');

    const [shopRequestId, setShopRequestId]         = useState(null);
    const [number, setnumber]                       = useState('');
    const [inicio, setinicio]                       = useState(null);
    const [fin, setfin]                             = useState(null);
    const [comProduct, setcomProduct]               = useState('');
    const [comService, setcomService]               = useState('');
    const [minStock,   setminStock]                 = useState('');
    const [nota, setnota]                           = useState('');
    const [tags, setTags]                           = useState([]);

    const [serPercen, setserPercen]                 = useState('');
    const [proPercen, setproPercen]                 = useState('');

    const [attachment, setattachment]               = useState(null);
    const [binaryData, setBinaryData]               = useState(null);

    let urlGet = '/setting/seller/shoptRequest-pre';

    const newContrat = () => {
        setsending(false);
        setsuccess(false);
        seterrors({});

        seterrorMessage('');

        setShopRequestId(null);
        setnumber('');
        setinicio(null);
        setfin(null);
        setcomProduct('');
        setcomService('');
        setminStock('');
        setnota('');
        setTags([]);

        setattachment(null);
        setBinaryData(null);
    }

    const validate = () => {
        let errorsCount = 0;
        let thiserrors = {};

        /*
            shopRequestId
            inicio
            fin
            attachment
            binaryData

            number
            comProduct
            comService
            minStock
            nota
            tags
            serPercen
            proPercen
        */

        //binaryData
        if(binaryData === null || binaryData === ''){
            thiserrors.binaryData = 'Debe adjuntar un contrato';
            errorsCount++;
        }

        //binaryData
        if(tags === null || tags === '' || (Array.isArray(tags) && tags.length === 0)){
            thiserrors.tags = 'Debe añadir alguna etiqueta';
            errorsCount++;
        }

        //inicio
        if(inicio === null || inicio === ''){
            thiserrors.inicio = 'Indique la fecha de inicio del contrato';
            errorsCount++;
        }

        //fin
        if(fin === null || fin === ''){
            thiserrors.fin = 'Indique la fecha de culminación del contrato';
            errorsCount++;
        }

        //number
        if(number === null || number === ''){
            thiserrors.number = 'Ingrese el número del contrato';
            errorsCount++;
        }

        //comProduct
        if(comProduct === null || comProduct === ''){
            thiserrors.comProduct = 'Ingrese el número de productos';
            errorsCount++;
        }

        //comService
        if(comService === null || comService === ''){
            thiserrors.comService = 'Ingrese el número de servicios';
            errorsCount++;
        }

        //minStock
        if(minStock === null || minStock === ''){
            thiserrors.minStock = 'Ingrese stock mínimo';
            errorsCount++;
        }

        //nota
        if(nota === null || nota === ''){
            thiserrors.nota = 'Ingrese una nota';
            errorsCount++;
        }

        //tags
        if(tags === null || tags === ''){
            thiserrors.tags = 'Es necesario incluir alguna etiqueta';
            errorsCount++;
        }

        //serPercen
        if(serPercen === null || serPercen === ''){
            thiserrors.serPercen = 'Porcentaje por servicio';
            errorsCount++;
        }

        //proPercen
        if(proPercen === null || proPercen === ''){
            thiserrors.proPercen = 'Porcentaje por producto';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    console.log(binaryData);

    const sendData = (e) => {
        e.stopPropagation();
        e.preventDefault();
        seterrorMessage('');

        let urlSend = '/setting/seller/shopContract';
        let validation = validate();
        if(validation){

            setsending(true);
            let realTags = [];
            if(tags.length > 0){
                for (let i = 0; i < tags.length; i++) {
                    const thisTag = tags[i];
                    let thisTagFormatted = {};
                    thisTagFormatted.name = thisTag;
                    realTags.push(thisTagFormatted);
                }
            }

            realTags.push({name: moment(inicio).format('YYYY-MM-DD')});
            realTags.push({name: moment(fin).format('YYYY-MM-DD')});
            console.log(realTags);

            let data = {
                shopRequestId: shopRequestId.value,
                contractDesc: { 
                    number: number.toString(),
                    inicio: moment(inicio).format('YYYY-MM-DD'),
                    fin: moment(fin).format('YYYY-MM-DD'),
                    comProduct,
                    comService,
                    minStock,
                    nota,
                },
                attachment: {
                    data: binaryData,
                    tags: realTags,
                },
                servPercen: serPercen,
                proPercen
            }

            console.log(data);
            console.log('Enviando datos');

            axios({
                url: urlSend,
                method: 'post',
                data
            }).then((res) => {
                if(!res.data.data.result){
                    console.log(res.data.data.message);
                    seterrorMessage(res.data.data.message);
                    setsending(false);
                    window.scrollTo({top: 10, behavior: 'smooth'});
                }else{
                    setsending(false);
                    newContrat();
                    setsuccess(true);
                    window.scrollTo({top: 10, behavior: 'smooth'});
                }
            }).catch((err) => {
                if(err.response.data){
                    console.error(err.response.data);
                    setsending(false);
                }
            });

            
        }
    }

    const getShopsRequests = () => {
        setsearch(false);
        axios.get(urlGet)
        .then((res) => {
            console.log(res.data);
            if(res.data && res.data.hasOwnProperty('data')){
                console.log('error');
                window.scrollTo({top: 10, behavior: 'smooth'});
                seterrorMessage(res.data.data.message);
            }else{
                setData(res.data);
                setloading(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(loading){
            if(search){
                getShopsRequests();
            }
        }
    });

    if(!loading){
        if(!success){
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>

                    {(errorMessage !== '') &&
                        <div className="alert alert-primary">
                            <p className="mb-0">
                                {errorMessage}
                            </p>
                        </div>
                    }

                    <form onSubmit={(e) => sendData(e)} action="">
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Seleccione una tienda
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <Row>
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="">Tienda:</label>
                                                <ShopSelect onChange={setShopRequestId} value={shopRequestId} list={data.rsShopRequestByStatus} />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            {(shopRequestId !== null) &&
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Datos del contrato
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <Row>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Número de contrato:</label>
                                                <input 
                                                    type="number"
                                                    min="0" 
                                                    value={number}
                                                    onChange={(e) => setnumber(e.target.value)}
                                                    placeholder="Número del contrato" 
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
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Inicio del contrato:</label>
                                                <Datetime
                                                    locale="es"
                                                    value={inicio}
                                                    onChange={(date) => setinicio(date)}
                                                    dateFormat="YYYY-MM-DD"
                                                    timeFormat={false}
                                                    inputProps={{ placeholder: "Fecha de inicio del contrato" }}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('inicio')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.inicio}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Fin del contrato:</label>
                                                <Datetime
                                                    locale="es"
                                                    value={fin}
                                                    onChange={(date) => setfin(date)}
                                                    dateFormat="YYYY-MM-DD"
                                                    timeFormat={false}
                                                    inputProps={{ placeholder: "Fecha de fin del contrato" }}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('fin')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.fin}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Número de servicios que proveerá la tienda</label>
                                                <input 
                                                    type="number"
                                                    value={comService}
                                                    onChange={(e) => setcomService(e.target.value)}
                                                    min="0" 
                                                    placeholder="Número de servicios" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('comService') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('comService')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.comService}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Número de productos que proveerá la tienda</label>
                                                <input 
                                                    type="number"
                                                    value={comProduct}
                                                    onChange={(e) => setcomProduct(e.target.value)}
                                                    min="0" 
                                                    placeholder="Número de productos" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('comProduct') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('comProduct')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.comProduct}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Stock mínimo por producto</label>
                                                <input 
                                                    type="number"
                                                    value={minStock}
                                                    onChange={(e) => setminStock(e.target.value)}
                                                    min="0" 
                                                    placeholder="Stock mínimo" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('minStock') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('minStock')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.minStock}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="">Porcentaje por servicio</label>
                                                <input 
                                                    type="number"
                                                    value={serPercen}
                                                    onChange={(e) => setserPercen(e.target.value)}
                                                    min="0" 
                                                    placeholder="Porcentaje 2" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('serPercen') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('serPercen')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.serPercen}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="form-group">
                                                <label htmlFor="">Porcentaje por producto</label>
                                                <input 
                                                    type="number"
                                                    value={proPercen}
                                                    onChange={(e) => setproPercen(e.target.value)}
                                                    min="0" 
                                                    placeholder="Porcentaje 1" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('proPercen') ? 'is-invalid' : '') +' form-control')}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('proPercen')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.proPercen}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            <div className="mb-3">
                                                <FormGroup>
                                                    <label htmlFor="">Adjuntar archivo:</label>
                                                    <CustomFileInput accept='pdf' size={2048} returnFileType='base64complete' value={attachment} setBinary={setBinaryData} onChange={setattachment} />
                                                </FormGroup>  
                                                <p className="text-muted small">
                                                    <strong>Nota:</strong> debe incluir el archivo en formato <strong>PDF</strong>.
                                                </p>
                                                {(typeof errors === 'object' && errors.hasOwnProperty('binaryData')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.binaryData}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="">Etiquetas:</label>
                                                <TagsInput
                                                    className="my-tags-input react-tagsinput"
                                                    value={tags}
                                                    onChange={(tags) => setTags(tags)}
                                                    tagProps={{
                                                        className: "react-tagsinput-tag bg-info text-white rounded",
                                                    }}
                                                    inputProps={{
                                                        className: 'react-tagsinput-input',
                                                        placeholder: 'Añadir etiqueta'
                                                    }}
                                                />
                                                {(typeof errors === 'object' && errors.hasOwnProperty('tags')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.tags}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="">Nota:</label>
                                                <textarea 
                                                    placeholder="Escriba una nota descriptiva" 
                                                    value={nota}
                                                    onChange={(e) => setnota(e.target.value)}
                                                    name="" id="" 
                                                    cols="30" 
                                                    rows="5" 
                                                    className={((typeof errors === 'object' && errors.hasOwnProperty('nota') ? 'is-invalid' : '') +' form-control')}
                                                    maxLength="400"
                                                >
                                                </textarea>
                                                {(typeof errors === 'object' && errors.hasOwnProperty('nota')) &&
                                                    <div className="help-block text-danger font-weight-bold">
                                                        <small>
                                                            {errors.nota}
                                                        </small>
                                                    </div>
                                                }
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            }
                        </Col>
                    </Row>
                    {(shopRequestId !== null) &&
                        <div className="text-right">
                            <button disabled={sending} type="submit" className="btn btn-lg font-weight-bold btn-primary">
                                    {(sending) ? <span>Cargando <i className="fa fa-spin fa-spinner mr-2"></i></span> : <span>Crear contrato <i className="mdi mdi-send mr-2"></i></span> }
                            </button>
                        </div>
                    }
                    </form>
                </div>
            )
        }else{
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>
                    <div className="alert alert-success mb-3">
                        ¡Contrato registrado con exito!
                    </div>
                    <button onClick={() => setsuccess(false)} className="btn btn-primary">
                        Crear nuevo contrato
                    </button>
                </div>
            )
        }
    }else{
        if(errorMessage !== ''){
            return(
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>
                    <div className="alert alert-primary">
                        <p className="mb-0">
                            {errorMessage}
                        </p>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>
                    <InlineSpinner />
                </div>
            )
        }
    }
}

export default CreateContrat
