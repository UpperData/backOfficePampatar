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

        //number
        if(number === null){
            thiserrors.number = 'Ingrese el número del contrato';
            errorsCount++;
        }

        if(errorsCount > 0){
            seterrors(thiserrors);
            return false;
        }

        return true;
    }

    const sendData = (e) => {
        e.stopPropagation();
        e.preventDefault();
        seterrorMessage('');

        let urlSend = '/setting/seller/shopContract';
        setsending(true);

        let validation = validate();
        if(validation){
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
                }
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
                }else{
                    setsending(false);
                    newContrat();
                    setsuccess(true);
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
                                        <Col md="12">
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
                                        <Col md="6">
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
                                            </div>
                                        </Col>
                                        <Col md="6">
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
                                                    className="form-control"
                                                />
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
                                                    className="form-control"
                                                />
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
                                                    className="form-control"
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup className="mb-1">
                                                <label htmlFor="">Adjuntar archivo:</label>
                                                <CustomFileInput value={attachment} setBinary={setBinaryData} onChange={setattachment} />
                                            </FormGroup>  
                                        </Col>
                                        <Col md="6">
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
                                                    className="form-control"
                                                    maxLength="400"
                                                >
                                                </textarea>
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
                            <button disabled={sending} type="submit" className="btn btn-primary">
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
