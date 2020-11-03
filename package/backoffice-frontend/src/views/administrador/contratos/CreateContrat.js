import React, {useState, useEffect} from 'react'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem
} from 'reactstrap';
import TagsInput from "react-tagsinput";
import Datetime from "react-datetime";
import axios from 'axios'
import InlineSpinner from '../../spinner/InlineSpinner';
import Select from 'react-select'
import moment from 'moment'

//styles
import "react-datetime/css/react-datetime.css";
import "react-tagsinput/react-tagsinput.css";
import ShopSelect from '../../../components/selects/ShopSelect';

//lang
require("moment/locale/es");

var yesterday = Datetime.moment().subtract(1, "day");
var valid = function (current) {
  return current.isAfter(yesterday);
};

function CreateContrat() {

    const [loading, setloading]                     = useState(true);
    const [sending, setsending]                     = useState(false);
    const [errors, seterrors]                       = useState([]);
    const [data, setData]                           = useState(null);
    const [errorMessage, seterrorMessage]           = useState('');

    const [shopRequestId, setShopRequestId]         = useState(null);
    const [number, setnumber]                       = useState(null);
    const [inicio, setinicio]                       = useState(null);
    const [fin, setfin]                             = useState(null);
    const [comProduct, setcomProduct]               = useState(null);
    const [comService, setcomService]               = useState(null);
    const [minStock,   setminStock]                 = useState(null);
    const [nota, setnota]                           = useState('');
    const [tags, setTags]                           = useState([]);

    let urlGet = '/setting/seller/shoptRequest-pre';

    const sendData = (e) => {
        e.stopPropagation();
        e.preventDefault();

        let urlSend = '/setting/seller/shopContract';

        //setsending(true);

        let realTags = [];

        if(tags.length > 0){
            for (let i = 0; i < tags.length; i++) {
                const thisTag = tags[i];
                let thisTagFormatted = {};
                thisTagFormatted.name = thisTag;

                realTags.push(thisTagFormatted);
            }
        }

        let data = {
            shopRequestId,
            contractDesc: { 
                number,
                inicio: moment(inicio).format('YYYY-MM-DD'),
                fin: moment(fin).format('YYYY-MM-DD'),
                comProduct,
                comService,
                minStock,
                nota,
                tags: realTags
            }
        }

        console.log(data);
    }

    useEffect(() => {
        const getShopsRequests = () => {
            axios.get(urlGet)
            .then((res) => {
                console.log(res.data);
                if(res.data && res.data.hasOwnProperty('message')){
                    seterrorMessage(res.data.data.message);
                    setloading(false);
                }else{
                    setData(res.data);
                    setloading(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        }

        if(loading){
            getShopsRequests();
        }
    }, []);

    if(!loading){
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
            return (
                <div>
                    <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>
                    <Row>
                        <Col md="12">
                            <Card>
                                <div className="p-3">
                                    <CardTitle>
                                        <i className="mdi mdi-border-all mr-2"></i>Datos del contrato
                                    </CardTitle>
                                </div>
                                <CardBody className="border-top">
                                    <form onSubmit={(e) => sendData(e)} action="">
                                    <Row>
                                        <Col md="12">
                                            <div className="form-group">
                                                <label htmlFor="">Tienda:</label>
                                                <ShopSelect onChange={setShopRequestId} value={shopRequestId} list={data.rsShopRequestByStatus} />
                                            </div>
                                        </Col>
                                        <Col md="4">
                                            <div className="form-group">
                                                <label htmlFor="">Número de contrato:</label>
                                                <input 
                                                    type="number"
                                                    min="0" 
                                                    value={number}
                                                    onChange={(e) => setnumber(e.target.value)}
                                                    placeholder="Número del contrato" 
                                                    className="form-control"
                                                />
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
                                            <div className="form-group">
                                                <label htmlFor="">Nota:</label>
                                                <textarea 
                                                    placeholder="Escriba una nota descriptiva" 
                                                    value={nota}
                                                    onChange={(e) => setnota(e.target.value)}
                                                    name="" id="" 
                                                    cols="30" 
                                                    rows="1" 
                                                    className="form-control"
                                                    maxLength="40"
                                                >
                                                </textarea>
                                            </div>
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
                                    </Row>
                                    <div className="py-2">
                                        <button type="submit" className="btn btn-info">
                                            Crear contrato
                                        </button>
                                    </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    }else{
        return(
            <div>
                <h1 className="h4 mb-3 font-weight-bold">Crear contrato</h1>
                <InlineSpinner />
            </div>
        )
    }
}

export default CreateContrat
